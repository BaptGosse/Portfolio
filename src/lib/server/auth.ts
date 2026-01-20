import { hash, verify } from '@node-rs/argon2';
import { db } from './db';
import { POR_USERS, POR_SESSIONS } from './db/schema';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 jours

const ARGON2_OPTIONS = {
    memoryCost: 65536, // 64 MB
    timeCost: 3,
    parallelism: 1,
};

export async function hashPassword(password: string): Promise<string> {
	return hash(password, ARGON2_OPTIONS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
	return verify(hashedPassword, password, ARGON2_OPTIONS);
}

export async function createSession(userId: string): Promise<string> {
	const token = randomUUID();
	const expiresAt = new Date(Date.now() + SESSION_DURATION);

	await db.insert(POR_SESSIONS).values({
		USR_ID: userId,
		SES_TOKEN: token,
		SES_EXPIRES_AT: expiresAt
	});

	return token;
}

export async function validateSession(token: string) {
	const [session] = await db
		.select()
		.from(POR_SESSIONS)
		.where(eq(POR_SESSIONS.SES_TOKEN, token))
		.limit(1);

	if (!session) return null;

	if (new Date() > session.SES_EXPIRES_AT) {
		await db.delete(POR_SESSIONS).where(eq(POR_SESSIONS.SES_ID, session.SES_ID));
		return null;
	}

	const [user] = await db
		.select()
		.from(POR_USERS)
		.where(eq(POR_USERS.USR_ID, session.USR_ID))
		.limit(1);

	return user || null;
}

export async function deleteSession(token: string): Promise<void> {
	await db.delete(POR_SESSIONS).where(eq(POR_SESSIONS.SES_TOKEN, token));
}

export async function getUserByEmail(email: string) {
	const [user] = await db
		.select()
		.from(POR_USERS)
		.where(eq(POR_USERS.USR_EMAIL, email))
		.limit(1);

	return user || null;
}
