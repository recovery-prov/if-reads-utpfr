-- CreateTable
CREATE TABLE "favorites" (
    "userId" INTEGER NOT NULL,
    "fictionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("userId","fictionId")
);

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fictionId_fkey" FOREIGN KEY ("fictionId") REFERENCES "fictions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
