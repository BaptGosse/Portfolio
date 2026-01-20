import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { hash } from '@node-rs/argon2';
import { POR_USERS } from '../src/lib/server/db/schema';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4];

if (!email || !password || !name) {
	console.error('Usage: npx tsx scripts/create-admin.ts <email> <password> <name>');
	process.exit(1);
}

const client = postgres(DATABASE_URL);
const db = drizzle(client);

async function main() {
	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		parallelism: 1
	});

	try {
		const [user] = await db.insert(POR_USERS).values({
			USR_EMAIL: email,
			USR_PASSWORD_HASH: passwordHash,
			USR_NAME: name
		}).returning();

		console.log('Admin user created successfully:');
		console.log(`  ID: ${user.USR_ID}`);
		console.log(`  Email: ${user.USR_EMAIL}`);
		console.log(`  Name: ${user.USR_NAME}`);
	} catch (err) {
		console.error('Error creating admin user:', err);
		process.exit(1);
	}

	await client.end();
}

main();
