/*
  Warnings:

  - Made the column `people_id` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "address" ALTER COLUMN "people_id" SET NOT NULL;
