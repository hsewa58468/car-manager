/*
  Warnings:

  - A unique constraint covering the columns `[carId]` on the table `Spec` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Spec_carId_key" ON "Spec"("carId");
