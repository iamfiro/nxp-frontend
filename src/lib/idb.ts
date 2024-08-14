import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'nxp-db';
const TOKEN_STORE_NAME = 'tokens';
const IS_LOGGED_IN_STORE_NAME = 'isLoggedIn';
const MEMO_STORE_NAME = 'problem_memo';
const PROBLEM_CODE_STORE_NAME = 'problem_code';

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
			if(!db.objectStoreNames.contains(MEMO_STORE_NAME)) {
				db.createObjectStore(MEMO_STORE_NAME, {
					keyPath: 'key',
					autoIncrement: false,
				});
			}
			if(!db.objectStoreNames.contains(PROBLEM_CODE_STORE_NAME)) {
				db.createObjectStore(PROBLEM_CODE_STORE_NAME, {
					keyPath: 'key',
					autoIncrement: false,
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

interface DBData {
	key: string;
	value: string;
}

export async function UpSertMemo(memo: DBData): Promise<void> {
	const db = await createStore();
	const existingMemo = await db.get(MEMO_STORE_NAME, memo.key);

	if (existingMemo) {
		// Update existing memo
		await db.put(MEMO_STORE_NAME, {
			...existingMemo,
			...memo
		});
	} else {
		// Insert new memo
		await db.add(MEMO_STORE_NAME, {
			...memo,
		});
	}
}

export async function getMemo(id: string): Promise<DBData | undefined> {
	const db = await createStore();
	return await db.get(MEMO_STORE_NAME, id);
}

export async function UpSertCode(code: DBData): Promise<void> {
	const db = await createStore();
	const existingCode = await db.get(PROBLEM_CODE_STORE_NAME, code.key);

	if (existingCode) {
		// Update existing code
		await db.put(PROBLEM_CODE_STORE_NAME, {
			...existingCode,
			...code
		});
	} else {
		// Insert new code
		await db.add(PROBLEM_CODE_STORE_NAME, {
			...code,
		});
	}
}

export async function getCode(id: string): Promise<DBData | undefined> {
	const db = await createStore();
	return await db.get(PROBLEM_CODE_STORE_NAME, id);
}

export async function deleteCode(id: string): Promise<void> {
	const db = await createStore();
	await db.delete(PROBLEM_CODE_STORE_NAME, id);
}
