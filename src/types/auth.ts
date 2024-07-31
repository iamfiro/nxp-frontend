export interface IRegister {
	id: string;
	password: string;
	passwordConfirm: string;
	phone: {
		number?: string;
		isPending?: boolean;
	}
}
