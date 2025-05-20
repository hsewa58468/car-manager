-- CreateTable
CREATE TABLE "InfoCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "InfoCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoItem" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "infoCategoryId" TEXT NOT NULL,

    CONSTRAINT "InfoItem_pkey" PRIMARY KEY ("id")
);
