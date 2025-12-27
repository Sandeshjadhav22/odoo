-- CreateTable
CREATE TABLE "EquipmentCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT,
    "company" TEXT NOT NULL,
    "usedBy" TEXT NOT NULL,
    "employee" TEXT,
    "department" TEXT,
    "technician" TEXT NOT NULL,
    "maintenanceTeam" TEXT,
    "assignedDate" TIMESTAMP(3),
    "scrapDate" TIMESTAMP(3),
    "location" TEXT,
    "workCenter" TEXT,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EquipmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
