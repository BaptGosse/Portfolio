import { db } from '$lib/server/db';
import { POR_USERS } from '$lib/server/db/schema';
import { hash } from '@node-rs/argon2';
import { exit } from 'process';

async function createAdmin() {
	const email = process.argv[2];
	const password = process.argv[3];
	const name = process.argv[4] || 'Admin';

	if (!email || !password) {
		console.error('❌ Usage: tsx scripts/create-admin.ts <email> <password> [name]');
		console.error('');
		console.error('Example:');
		console.error('  tsx scripts/create-admin.ts admin@example.com MySecurePassword123 "John Doe"');
		exit(1);
	}

	// Validation basique
	if (!email.includes('@')) {
		console.error('❌ Invalid email format');
		exit(1);
	}

	if (password.length < 8) {
		console.error('❌ Password must be at least 8 characters');
		exit(1);
	}

	try {
		console.log('🔐 Hashing password...');

		// Hash le mot de passe avec Argon2id
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		console.log('💾 Creating admin user...');

		// Créer l'utilisateur
		const [user] = await db
			.insert(POR_USERS)
			.values({
				USR_EMAIL: email,
				USR_PASSWORD_HASH: passwordHash,
				USR_NAME: name
			})
			.returning();

		console.log('');
		console.log('✅ Admin user created successfully!');
		console.log('');
		console.log('📧 Email:', email);
		console.log('👤 Name:', name);
		console.log('🆔 ID:', user.USR_ID);
		console.log('');
		console.log('🔗 You can now login at: /admin/login');
		console.log('');

		exit(0);
	} catch (error: any) {
		console.error('');
		console.error('❌ Error creating admin user:');

		if (error.code === '23505') {
			console.error('   → Email already exists in database');
		} else if (error.code === 'ECONNREFUSED') {
			console.error('   → Cannot connect to database');
			console.error('   → Make sure DATABASE_URL is correct in your .env file');
		} else {
			console.error('   →', error.message);
		}

		console.error('');
		exit(1);
	}
}

createAdmin();
