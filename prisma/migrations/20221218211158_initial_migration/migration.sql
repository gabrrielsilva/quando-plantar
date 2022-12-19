-- CreateTable
CREATE TABLE "agro.cultura" (
    "nome" TEXT NOT NULL,
    "dias_cultivo" TEXT NOT NULL,

    CONSTRAINT "agro.cultura_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "agro.regiao" (
    "nome" TEXT NOT NULL,

    CONSTRAINT "agro.regiao_pkey" PRIMARY KEY ("nome")
);

-- CreateTable
CREATE TABLE "agro.cultura_regiao" (
    "id" TEXT NOT NULL,
    "cultura_id" TEXT NOT NULL,
    "regiao_id" TEXT NOT NULL,

    CONSTRAINT "agro.cultura_regiao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "agro.cultura_regiao" ADD CONSTRAINT "agro.cultura_regiao_cultura_id_fkey" FOREIGN KEY ("cultura_id") REFERENCES "agro.cultura"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agro.cultura_regiao" ADD CONSTRAINT "agro.cultura_regiao_regiao_id_fkey" FOREIGN KEY ("regiao_id") REFERENCES "agro.regiao"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;
