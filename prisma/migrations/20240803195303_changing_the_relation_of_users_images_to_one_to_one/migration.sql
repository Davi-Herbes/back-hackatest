/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `users_images` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "users_images" DROP CONSTRAINT "users_images_owner_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "users_images_owner_id_key" ON "users_images"("owner_id");

-- AddForeignKey
ALTER TABLE "users_images" ADD CONSTRAINT "users_images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
