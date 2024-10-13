/*
  Warnings:

  - You are about to drop the column `date_birtday` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the column `date_birtday` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "date_birtday",
ADD COLUMN     "date_birthday" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "students" DROP COLUMN "date_birtday",
ADD COLUMN     "date_birthday" TIMESTAMP(3);
