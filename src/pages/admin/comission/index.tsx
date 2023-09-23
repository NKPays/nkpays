/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Button } from '@/components/ui/button';
import { convertNullToUndefined } from '@/lib/utils';
import { CreateFileInput, FileUploadOutput, UpdateCommisionChartInput } from '@/schema/uploadFile';
import { api } from '@/utils/api';
import { supabaseRemove, supabaseUpload } from '@/utils/fileUpload';
import { getSupabseUploadUrl } from '@/utils/supabase';
import { UploadFile } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Skeleton } from "@/components/ui/skeleton"
import DataTable from '@/components/ui/DataTable';


export const ComissionChartCard = ({
    data
}: {
    data?: FileUploadOutput
}) => {
    const [previewImage, setPreviewImage] = useState<string | undefined>(data?.publicUrl);
    const [uploading, setUploading] = useState<boolean>();
    const createMutation = api.uploadFile.create.useMutation()
    const deleteMutation = api.uploadFile.delete.useMutation()
    const updateMutation = api.uploadFile.update.useMutation()
    const ctx = api.useContext().uploadFile;
    const id = `${nanoid()}`


    const save = async (value: CreateFileInput) => {
        return await createMutation.mutateAsync({ ...value })
    }

    const change = async (prevAPath: string, data: UpdateCommisionChartInput) => {
        await supabaseRemove([prevAPath])
        return await updateMutation.mutateAsync(data)
    }


    const upload = async (file: File) => {
        try {
            setUploading(true);
            const res = await supabaseUpload(file);
            if (res.error && !res.data) {
                setUploading(false);
                setPreviewImage(undefined);
                return toast.error(res.error.message)
            }
            const dt = {
                publicUrl: getSupabseUploadUrl(res.data.path),
                meta: {

                }
            };
            if(data){
                await change(data.meta.path, {
                    id: data.id,
                    title: data.title === null ? undefined : data.title,
                    publicUrl: getSupabseUploadUrl(res.data.path),
                    meta: {
                        path: res.data.path
                    }
                })
            }else{
                await save({
                    publicUrl: getSupabseUploadUrl(res.data.path),
                    meta: {
                        path: res.data.path
                    }
                });
            }
            await ctx.invalidate();
            const url = URL.createObjectURL(file);
            // setPreviewImage(url);
            toast.success('New image added successfully!')
            setUploading(false);
            console.log({ res });
        } catch (error) {
            toast.error('Uploading failed')
            // setPreviewImage(undefined);
        }
    }

    const remove = async () => {
        if (!data) return;
        try {
            setUploading(true)
            const res = await supabaseRemove([data.meta?.path]);
            if (res.error && !res.data) {
                toast.error('File removing failed');
                setUploading(false)
                return
            }
            const removed = await deleteMutation.mutateAsync({ id: data.id });
            await ctx.invalidate();
            setUploading(false);
            toast.success('Image removed successfully!')
        } catch (error) {
            toast.error('File removing failed');
        }
    }


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const files = e.target.files;
        if (files && files[0]) {
            void upload(files[0])

        }
    }

    if (uploading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <Loader2 className='w-10 h-10 animate-spin text-gray-500' />
            </div>
        )
    }

    return (

        <div className="flex items-center justify-center w-full">
            <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">


                {
                    previewImage && !uploading ?
                        <div className='w-full h-full bg-center bg-contain bg-no-repeat ' style={{ backgroundImage: `url(${previewImage})` }}>
                            <div className="w-full h-full flex items-center justify-center group gap-3 hover:backdrop-blur-sm transition-all duration-300">
                                <Button variant={'secondary'} className='pointer-events-none group-hover:opacity-100 opacity-0 transition-all duration-300'>Change</Button>
                                <Button  onClick={() => void remove()} variant={'destructive'} className='group-hover:opacity-100 opacity-0 transition-all duration-300'>Remove</Button>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
                        </div>
                }
                <input id={id} type="file" className="hidden" onChange={handleOnChange} />
            </label>
        </div>

    )
}

const ComissionCharts = () => {
    const { data, isLoading } = api.uploadFile.getAll.useQuery({})

    if (isLoading) {
        return (
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    Array(4).fill(null).map(arr => {
                        return <Skeleton key={nanoid()} className='w-full h-64 bg-slate-200' />

                    })
                }
            </div>
        )
    }
    return (
        <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                data?.data.map(d => {
                    return (
                        <div key={nanoid()}>
                            <ComissionChartCard data={convertNullToUndefined(d)} />
                        </div>
                    )
                })
            }
            <div><ComissionChartCard /></div>
        </section>
    )
}

export default ComissionCharts