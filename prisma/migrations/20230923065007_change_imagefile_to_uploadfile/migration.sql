/*
  Warnings:

  - You are about to drop the `ImageFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ImageFile";

-- CreateTable
CREATE TABLE "UploadFile" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadFile_pkey" PRIMARY KEY ("id")
);
