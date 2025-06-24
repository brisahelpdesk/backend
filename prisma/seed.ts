import { PrismaService } from "../src/common/prisma/prisma.service";
import { HashService } from "../src/common/hash/hash.service";

const prisma = new PrismaService();
const hashService = new HashService();

async function main() {
    const admin = await prisma.user.upsert({
      where: {id: 1},
      update: {},
      create: {
        email: "admin@api.com",
        password: await hashService.hash("admin")
      }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })