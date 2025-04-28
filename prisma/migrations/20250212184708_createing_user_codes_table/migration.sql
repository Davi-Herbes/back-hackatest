-- CreateTable
CREATE TABLE "UserConfirmationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserConfirmationCode_pkey" PRIMARY KEY ("id")
);
