/*
  Warnings:

  - You are about to drop the column `is_supervisor` on the `users` table. All the data in the column will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_supervisor",
ADD COLUMN     "role" TEXT NOT NULL;
