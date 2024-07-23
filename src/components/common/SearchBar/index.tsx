import style from './style.module.scss';
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = () => {
    return (
        <>
            <input
                className={style.container}
                placeholder={'문제 검색하기'}
            />
            <IoSearchSharp className={style.icon}/>
        </>
    )
};

export default SearchBar;