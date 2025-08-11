-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageGroup" TEXT[],

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spec" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "engineCC" TEXT NOT NULL,
    "transmission" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "Spec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "special" TEXT[],
    "carId" TEXT NOT NULL,

    CONSTRAINT "InfoCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spec_carId_key" ON "Spec"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_hashedToken_key" ON "RefreshToken"("hashedToken");
