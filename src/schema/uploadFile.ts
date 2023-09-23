import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";

export const UploadCommissionImageMeta = z.object({
    path: z.string()
})

export const CreateFileUpload = z.object({
    title: z.string().optional(),
    publicUrl: z.string(),
    meta: UploadCommissionImageMeta.optional()
})

export const UpdateFileUpoad = z.object({
    id: z.number()
}).merge(CreateFileUpload);


export const DeleteFileUploadSchema = z.object({
    id: z.number()
})

export const ListUploadedFile = WithPagination
    .merge(WithSorting)
    .merge(WithSearch)


export type CreateFileInput<T = any> = {
    title?: string,
    publicUrl: string,
    meta?: T
}

export type FileUploadOutput = {
    id: number;
    title: string | null;
    publicUrl: string;
    meta: z.TypeOf<typeof UploadCommissionImageMeta>;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCommisionChartInput = CreateFileInput<z.TypeOf<typeof UploadCommissionImageMeta>>;
export type UpdateCommisionChartInput = CreateFileInput<z.TypeOf<typeof UploadCommissionImageMeta>> & { id: number };

