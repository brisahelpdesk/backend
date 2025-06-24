-- CreateTable
CREATE TABLE "tb_user" (
    "id" BIGSERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_client" (
    "id" BIGINT NOT NULL,
    "uuid" TEXT NOT NULL,
    "tax_id" TEXT NOT NULL,

    CONSTRAINT "tb_client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_uuid_key" ON "tb_user"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_client_uuid_key" ON "tb_client"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tb_client_tax_id_key" ON "tb_client"("tax_id");

-- AddForeignKey
ALTER TABLE "tb_client" ADD CONSTRAINT "tb_client_id_fkey" FOREIGN KEY ("id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
