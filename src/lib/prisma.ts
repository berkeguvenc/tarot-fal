import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Veritabanı bağlantı URL'ini alıyoruz
const connectionString = process.env.DATABASE_URL;

const prismaClientSingleton = () => {
    // 1. Yeni bir bağlantı havuzu (pool) oluştur
    const pool = new Pool({ connectionString });

    // 2. Prisma için Postgres adaptörünü kur
    const adapter = new PrismaPg(pool);

    // 3. Prisma'yı adaptör ile başlat
    return new PrismaClient({ adapter });
};

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;