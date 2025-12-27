-- AlterTable
ALTER TABLE "MaintenanceRequest" ADD COLUMN     "workCenterId" INTEGER;

-- CreateTable
CREATE TABLE "WorkCenter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "tag" TEXT,
    "costPerHour" DOUBLE PRECISION,
    "capacity" DOUBLE PRECISION,
    "efficiency" DOUBLE PRECISION,
    "oeeTarget" DOUBLE PRECISION,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkCenter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaintenanceRequest" ADD CONSTRAINT "MaintenanceRequest_workCenterId_fkey" FOREIGN KEY ("workCenterId") REFERENCES "WorkCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
