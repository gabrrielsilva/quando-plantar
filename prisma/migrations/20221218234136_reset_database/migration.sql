/*
  Warnings:

  - You are about to drop the `agro.cultura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agro.cultura_regiao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agro.regiao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "agro.cultura_regiao" DROP CONSTRAINT "agro.cultura_regiao_cultura_id_fkey";

-- DropForeignKey
ALTER TABLE "agro.cultura_regiao" DROP CONSTRAINT "agro.cultura_regiao_regiao_id_fkey";

-- DropTable
DROP TABLE "agro.cultura";

-- DropTable
DROP TABLE "agro.cultura_regiao";

-- DropTable
DROP TABLE "agro.regiao";

-- CreateTable
CREATE TABLE "cultura" (
    "nome" TEXT NOT NULL,
    "dias_cultivo" TEXT NOT NULL,

    CONSTRAINT "cultura_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "regiao" (
    "nome" TEXT NOT NULL,

    CONSTRAINT "regiao_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "calendario_agricola" (
    "id" TEXT NOT NULL,
    "cultura_id" TEXT NOT NULL,
    "regiao_id" TEXT NOT NULL,
    "epoca_plantio" TEXT NOT NULL,

    CONSTRAINT "calendario_agricola_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calendario_agricola" ADD CONSTRAINT "calendario_agricola_cultura_id_fkey" FOREIGN KEY ("cultura_id") REFERENCES "cultura"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendario_agricola" ADD CONSTRAINT "calendario_agricola_regiao_id_fkey" FOREIGN KEY ("regiao_id") REFERENCES "regiao"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;
