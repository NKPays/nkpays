/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Section from '@/components/shared/Section'
import React from 'react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { api } from '@/utils/api'
import PlanCard from '@/components/plan/PlanCard'



const PricingPage = () => {
    const { data, isLoading } = api.plans.getAll.useQuery({})
    const {data:files} = api.uploadFile.getAll.useQuery({});
    return (
        <>
            <section className='h-64 bg-[#045bcc3a]  relative'>
                <div className='grid place-content-center z-20 backdrop-blur-lg w-full h-full'>
                    <h1 className='text-6xl font-bold'>
                        {isLoading ? 'Loading Our Plans...' : 'Our Plans'}
                    </h1>
                </div>
                <div className='w-20 h-20 rounded-full top-10 left-20 absolute bg-[#045CCC] -z-20' style={{}}></div>
                <div className='w-20 h-20 rounded-full top-20 right-1/2 absolute bg-[#045CCC] -z-20' style={{}}></div>
                <div className='w-20 h-20 rounded-full left-1/3 bottom-0 absolute bg-[#045CCC] -z-20' style={{}}></div>
            </section>

            <Section>
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {
                        data?.data.map(cd => {
                            return (
                                <div className='w-full' key={nanoid()}>
                                    <PlanCard data={cd} />
                                </div>
                            )
                        })
                    }
                </div>
            </Section>


            <Section sectionTitle='Our Commission Charts'>
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
                        {
                            files?.data.map(file => {
                                return <div key={nanoid()} className='rounded-xl overflow-hidden p-3 shadow-lg'>
                                    <Image width={800} height={600} src={file.publicUrl||""} alt={file.title||''} />
                                    </div>
                            })
                        }
                    </div>
            </Section>

        </>

    )
}

export default PricingPage