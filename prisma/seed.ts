import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
	await prisma.user.createMany({
		data: [
			{ name: 'Eray Aslan' },
			{ name: 'Enes Faruk Meniz' },
			{ name: 'Sefa Eren Şahin' },
			{ name: 'Kadir Mutlu' },
		],
		skipDuplicates: true,
	});

	await prisma.book.createMany({
		data: [
			{ name: "The Hitchhiker's Guide to the Galaxy" },
			{ name: 'I, Robot' },
			{ name: 'Dune' },
			{ name: '1984' },
			{ name: 'Brave New World' },
		],
		skipDuplicates: true,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
