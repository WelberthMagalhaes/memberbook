-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_people_id_fkey";

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_people_id_fkey" FOREIGN KEY ("people_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
