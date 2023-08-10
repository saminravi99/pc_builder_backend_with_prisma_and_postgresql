/*
  Warnings:

  - You are about to drop the column `userId` on the `buildes` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `components` table. All the data in the column will be lost.
  - You are about to drop the column `componentId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `buildes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `components` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `components` table without a default value. This is not possible if the table is not empty.
  - Added the required column `component_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "buildes" DROP CONSTRAINT "buildes_userId_fkey";

-- DropForeignKey
ALTER TABLE "components" DROP CONSTRAINT "components_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_componentId_fkey";

-- AlterTable
ALTER TABLE "buildes" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "components" DROP COLUMN "categoryId",
ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "componentId",
ADD COLUMN     "component_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "components" ADD CONSTRAINT "components_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildes" ADD CONSTRAINT "buildes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
