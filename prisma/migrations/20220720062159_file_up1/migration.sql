-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_directories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "parentID" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "directories_parentID_fkey" FOREIGN KEY ("parentID") REFERENCES "directories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_directories" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "directories";
DROP TABLE "directories";
ALTER TABLE "new_directories" RENAME TO "directories";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
