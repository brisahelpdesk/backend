-- CreateTable
CREATE TABLE "public"."tb_offering_type" (
    "id" BIGSERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_offering_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tb_offering" (
    "id" BIGSERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
    "offering_type_id" BIGINT NOT NULL,
    "internal_code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_physical" BOOLEAN NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_offering_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_offering_type_uuid_key" ON "public"."tb_offering_type"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tb_offering_uuid_key" ON "public"."tb_offering"("uuid");

-- AddForeignKey
ALTER TABLE "public"."tb_offering" ADD CONSTRAINT "tb_offering_offering_type_id_fkey" FOREIGN KEY ("offering_type_id") REFERENCES "public"."tb_offering_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
