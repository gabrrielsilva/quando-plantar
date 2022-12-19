/*
  Warnings:

  - Added the required column `epoca_plantio` to the `agro.cultura_regiao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agro.cultura_regiao" ADD COLUMN     "epoca_plantio" TEXT NOT NULL;
