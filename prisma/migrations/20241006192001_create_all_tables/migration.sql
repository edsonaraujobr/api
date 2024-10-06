/*
  Warnings:

  - You are about to drop the column `description` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "link_github" TEXT;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "description",
ADD COLUMN     "isAccepted" BOOLEAN NOT NULL DEFAULT false;
