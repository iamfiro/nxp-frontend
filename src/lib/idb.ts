import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'auth-db';
const TOKEN_STORE_NAME = 'tokens';
const IS_LOGGED_IN_STORE_NAME = 'isLoggedIn';
const MEMO_STORE_NAME = 'problem_memo';

async function createStore(): Promise<IDBPDatabase<unknown>> {
	return await openDB(DB_NAME, 1, {
		upgrade(db) {
			if (!db.objectStoreNames.contains(TOKEN_STORE_NAME)) {
				db.createObjectStore(TOKEN_STORE_NAME, {
					keyPath: 'key',
				});
			}
			if (!db.objectStoreNames.contains(IS_LOGGED_IN_STORE_NAME)) {
				db.createObjectStore(IS_LOGGED_IN_STORE_NAME, {
					keyPath: 'key',
				});
			}
		},
	});
}

export async function saveAccessToken(token: string): Promise<void> {
	const db = await createStore();
	await db.put(TOKEN_STORE_NAME, { key: 'accessToken', value: token });
}

export async function getAccessToken(): Promise<string | null> {
	const db = await createStore();
	// Access token 조회
	const tokenData = await db.get(TOKEN_STORE_NAME, 'accessToken');
	return tokenData ? tokenData.value : null;
}

export async function deleteAccessToken(): Promise<void> {
	const db = await createStore();
	// Access token	삭제
	await db.delete(TOKEN_STORE_NAME, 'accessToken');
}

export async function saveIsLoggedIn(isLoggedIn: boolean): Promise<void> {
	const db = await createStore();
	await db.put(IS_LOGGED_IN_STORE_NAME, { key: 'isLoggedIn', value: isLoggedIn });
}

export async function getIsLoggedIn(): Promise<boolean> {
	const db = await createStore();
	// 로그인 여부 조회
	const isLoggedInData = await db.get(IS_LOGGED_IN_STORE_NAME, 'isLoggedIn');
	return isLoggedInData ? isLoggedInData.value : false;
}

export async function deleteIsLoggedIn(): Promise<void> {
	const db = await createStore();
	// 로그인 여부 삭제
	await db.delete(IS_LOGGED_IN_STORE_NAME, 'isLoggedIn');
}

interface Memo {
	id: string;
	content: string;
}

export async function UpSertMemo(memo: Memo): Promise<void> {
	const db = await createStore();
	const existingMemo = await db.get(MEMO_STORE_NAME, memo.id);

	if (existingMemo) {
		// Update existing memo
		await db.put(MEMO_STORE_NAME, {
			...existingMemo,
			...memo,
			updatedAt: new Date(),
		});
	} else {
		// Insert new memo
		await db.add(MEMO_STORE_NAME, {
			...memo,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
}

export async function getMemo(id: string): Promise<Memo | undefined> {
	const db = await createStore();
	return await db.get(MEMO_STORE_NAME, id);
}
