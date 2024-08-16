/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BarbershopService` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BarbershopService` table. All the data in the column will be lost.
  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "BarbershopService" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "Authenticator";
