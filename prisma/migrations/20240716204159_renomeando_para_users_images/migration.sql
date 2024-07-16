/*
  Warnings:

  - You are about to drop the `user_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_images" DROP CONSTRAINT "user_images_owner_id_fkey";

-- DropTable
DROP TABLE "user_images";

-- CreateTable
CREATE TABLE "users_images" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "users_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_images_public_id_key" ON "users_images"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_images_url_key" ON "users_images"("url");

-- AddForeignKey
ALTER TABLE "users_images" ADD CONSTRAINT "users_images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
