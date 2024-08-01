import C from '../../public/icon/lang/c.svg';
import Go from '../../public/icon/lang/go.svg';
import Cpp from '../../public/icon/lang/cpp.svg';
import Java from '../../public/icon/lang/java.svg';
import Rust from '../../public/icon/lang/rust.svg';

export function LanguageToSvg(lang: string) {
	switch (lang) {
		case 'c':
			return C;
		case 'go':
			return Go;
		case 'cpp':
			return Cpp;
		case 'java':
			return Java;
		case 'rust':
			return Rust;
		default:
			return '';
	}
}
