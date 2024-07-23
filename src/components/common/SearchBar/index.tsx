import style from './style.module.scss';
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
    return (
        <>
            <IoSearchSharp className={style.icon}/>
            <input
                className={style.container}
                placeholder={'문제 검색하기'}
            />
        </>
    )
};

export default SearchBar;