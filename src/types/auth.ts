export interface IRegister {
	id: string;
	password: string;
	passwordConfirm: string;
	turnstile: {
		state: 'error' | 'expired' | 'solved' | 'idle';
		token?: string | undefined;
	}
}
