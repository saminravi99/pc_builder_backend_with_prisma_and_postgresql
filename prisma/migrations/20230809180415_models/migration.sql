/*
  Warnings:

  - You are about to drop the `builder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "build_components" DROP CONSTRAINT "build_components_build_id_fkey";

-- DropForeignKey
ALTER TABLE "builder" DROP CONSTRAINT "builder_userId_fkey";

-- DropTable
DROP TABLE "builder";

-- CreateTable
CREATE TABLE "buildes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buildes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "buildes" ADD CONSTRAINT "buildes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build_components" ADD CONSTRAINT "build_components_build_id_fkey" FOREIGN KEY ("build_id") REFERENCES "buildes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
