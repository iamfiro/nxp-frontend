import style from './style.module.scss';
import { ProblemType } from '../../types/component';
import {levelToTextColor} from "../../lib/color.ts";

/**
 * 문제 테이블을 렌더링하는 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성.
 * @param {ProblemType[]} props.data - 문제 데이터 배열.
 * @returns {JSX.Element} - 렌더링된 테이블 컴포넌트.
 */
const ProblemTable = ({ data }: { data: ProblemType[] }): JSX.Element => {
    return (
        <table className={style.table}>
            <thead>
                <tr>
                    <th>난이도</th>
                    <th>문제 제목</th>
                    <th>완료한 사람</th>
                    <th>정답 비율</th>
                </tr>
            </thead>
            <tbody>
                {data.map((problem, index) => (
                    <tr key={index} className={style.dataContainer}>
                        <td className={style.level} style={{ color: levelToTextColor(problem.level) }}>
                            Lv. {problem.level}
                        </td>
                        <td>{problem.title}</td>
                        <td className={style.solved}>{problem.solved}명</td>
                        <td className={style.ratio}>{problem.ratio}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProblemTable;
