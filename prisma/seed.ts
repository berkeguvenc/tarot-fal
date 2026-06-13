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

    // Test için örnek saat dilimleri ekle
    await prisma.timeSlot.createMany({
        data: [
            { startTime: "09:00", endTime: "10:00", isAvailable: true },
            { startTime: "10:00", endTime: "11:00", isAvailable: true },
            { startTime: "11:00", endTime: "12:00", isAvailable: false }, // Dolu slot testi için
            { startTime: "14:00", endTime: "15:00", isAvailable: true },
        ],
    });

    console.log("🌱 Test saat dilimleri veritabanına başarıyla yüklendi!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await pool.end();
    });