/*
  Warnings:

  - You are about to drop the column `offering_type_id` on the `tb_offering` table. All the data in the column will be lost.
  - You are about to drop the `tb_offering_type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `offering_category_id` to the `tb_offering` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."tb_offering" DROP CONSTRAINT "tb_offering_offering_type_id_fkey";

-- AlterTable
ALTER TABLE "public"."tb_offering" DROP COLUMN "offering_type_id",
ADD COLUMN     "offering_category_id" BIGINT NOT NULL;

-- DropTable
DROP TABLE "public"."tb_offering_type";

-- CreateTable
CREATE TABLE "public"."tb_offering_category" (
    "id" BIGSERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_offering_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_offering_category_uuid_key" ON "public"."tb_offering_category"("uuid");

-- AddForeignKey
ALTER TABLE "public"."tb_offering" ADD CONSTRAINT "tb_offering_offering_category_id_fkey" FOREIGN KEY ("offering_category_id") REFERENCES "public"."tb_offering_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
