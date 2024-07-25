import style from './style.module.scss';
import { IoSearchSharp } from "react-icons/io5";

/**
 * SearchBar 컴포넌트
 * 문제의 제목이나 내용을 입력할 수 있는 검색 창과 아이콘을 포함한 컴포넌트
 * @returns {JSX.Element} SearchBar 컴포넌트
 */
const SearchBar = (): JSX.Element => {
    return (
        <div className={style.container}>
            <input
                className={style.searchBar}
                type="text"
                placeholder="문제의 제목이나 내용을 입력하세요"
            />
            <IoSearchSharp className={style.searchIcon} />
        </div>
    );
}

export default SearchBar;