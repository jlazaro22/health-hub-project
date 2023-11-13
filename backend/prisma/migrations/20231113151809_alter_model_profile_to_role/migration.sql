/*
  Warnings:

  - You are about to drop the column `profile_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `user_profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profile_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "profile_id",
ADD COLUMN     "role_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "user_profiles";

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_name_key" ON "user_roles"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "user_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
