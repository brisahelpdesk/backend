-- CreateTable
CREATE TABLE "tb_user" (
    "id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);
