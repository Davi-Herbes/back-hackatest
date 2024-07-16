-- CreateTable
CREATE TABLE "user_images" (
    "id" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "original_filename" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "user_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_images_public_id_key" ON "user_images"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_images_url_key" ON "user_images"("url");

-- AddForeignKey
ALTER TABLE "user_images" ADD CONSTRAINT "user_images_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
