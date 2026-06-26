import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    // Eski verileri temizle
    await prisma.timeSlot.deleteMany();

    // Mistik seanslar için örnek çalışma saatleri (10:00 - 21:00)
    await prisma.timeSlot.createMany({
        data: [
            { startTime: "10:00", endTime: "11:00", isAvailable: true },
            { startTime: "11:00", endTime: "12:00", isAvailable: true },
            { startTime: "13:00", endTime: "14:00", isAvailable: true },
            { startTime: "14:00", endTime: "15:00", isAvailable: true },
            { startTime: "15:00", endTime: "16:00", isAvailable: true },
            { startTime: "16:00", endTime: "17:00", isAvailable: true },
            { startTime: "17:00", endTime: "18:00", isAvailable: true },
            { startTime: "18:00", endTime: "19:00", isAvailable: true },
            { startTime: "19:00", endTime: "20:00", isAvailable: true },
            { startTime: "20:00", endTime: "21:00", isAvailable: true },
        ],
    });

    console.log("🌱 Mistik seans saat dilimleri veritabanına başarıyla yüklendi!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
    });