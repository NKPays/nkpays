

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ServerErrorHandler } from './../error-handler/ServerErrorHandler';
import { createPaginator } from 'prisma-pagination';
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { type UploadFile, type Prisma } from '@prisma/client';
import { z } from 'zod';
import { CreateFileUpload, DeleteFileUploadSchema, ListUploadedFile, UpdateFileUpoad } from '@/schema/uploadFile';

const paginate = createPaginator({ perPage: 30 })

export const UploadFileRouter = createTRPCRouter({

    create: publicProcedure
        .input(CreateFileUpload)
        .mutation(async ({ ctx, input }) => {
            try {
                const res = await ctx.prisma.uploadFile.create({
                    data: {...input}
                });
                return res;
            } catch (error) {
                ServerErrorHandler(error)
            }
        }),

    getAll: publicProcedure.input(ListUploadedFile).query(async ({ ctx, input }) => {
        const { search, sortBy, pagination } = input;
        const res = await paginate<UploadFile, Prisma.UploadFileFindManyArgs>(ctx.prisma.uploadFile, {
            where: {
                OR: search ? {
                    title: {
                        contains: input.search,
                        mode: 'insensitive'
                    }
                }: undefined,
            },
            orderBy: sortBy || { createdAt: 'asc' },
        }, pagination)

        return res;
    }),

    getId: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
        return await ctx.prisma.uploadFile.findFirst({
            where: {
                id: input.id
            }
        })
    }),

    delete: protectedProcedure.input(DeleteFileUploadSchema).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.uploadFile.delete({ where: { id: input.id } })
    }),

    deleteMany: protectedProcedure.input(z.object({ ids: z.array(z.number()).default([]) })).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.uploadFile.deleteMany({
            where: {
                id: {
                    in: input.ids
                }
            }
        })
    }),

    update: protectedProcedure.input(UpdateFileUpoad).mutation(async ({ ctx, input }) => {
        return await ctx.prisma.uploadFile.update({ where: { id: input.id }, data: input })
    })

});