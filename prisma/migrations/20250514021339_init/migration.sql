-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spec" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "engineCC" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);
