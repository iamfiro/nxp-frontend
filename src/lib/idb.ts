import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'auth-db';
const STORE_NAME = 'tokens';

async function createStore(): Promise<IDBPDatabase<unknown>> {
	return await openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {
					keyPath: 'key',
				});
			}
		},
	});
}

export async function saveAccessToken(token: string): Promise<void> {
	const db = await createStore();
	await db.put(STORE_NAME, { key: 'accessToken', value: token });
}

export async function getAccessToken(): Promise<string | null> {
	const db = await createStore();
	// Access token 조회
	const tokenData = await db.get(STORE_NAME, 'accessToken');
	return tokenData ? tokenData.value : null;
}

export async function deleteAccessToken(): Promise<void> {
	const db = await createStore();
	// Access token	삭제
	await db.delete(STORE_NAME, 'accessToken');
}
