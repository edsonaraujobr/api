/*
  Warnings:

  - The primary key for the `administrators` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cpf` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the column `administrator_cpf` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `administrator_cpf` on the `modules` table. All the data in the column will be lost.
  - You are about to drop the column `student_cpf` on the `projects` table. All the data in the column will be lost.
  - The primary key for the `students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `administrator_cpf` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `students` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `administrators` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `administrators` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `administrator_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrator_id` to the `modules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `administrator_id` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `students` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `students` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_administrator_cpf_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_administrator_cpf_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_student_cpf_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_administrator_cpf_fkey";

-- AlterTable
ALTER TABLE "administrators" DROP CONSTRAINT "administrators_pkey",
DROP COLUMN "cpf",
DROP COLUMN "name",
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "administrators_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "administrator_cpf",
ADD COLUMN     "administrator_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "administrator_cpf",
ADD COLUMN     "administrator_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "student_cpf",
ADD COLUMN     "student_id" TEXT NOT NULL,
ALTER COLUMN "rate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP CONSTRAINT "students_pkey",
DROP COLUMN "administrator_cpf",
DROP COLUMN "cpf",
DROP COLUMN "name",
ADD COLUMN     "administrator_id" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "students_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_administrator_id_fkey" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_administrator_id_fkey" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_administrator_id_fkey" FOREIGN KEY ("administrator_id") REFERENCES "administrators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
