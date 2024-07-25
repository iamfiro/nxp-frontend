import style from './style.module.scss';
import {ProblemType} from "../../types/component.ts";

function LevelToTextColor(level: number) {
    switch (level) {
        case 1:
            return '#00b0f0';
        case 2:
            return '#00b050';
        case 3:
            return '#ffc000';
        case 4:
            return '#ff0000';
        case 5:
            return '#7030a0';
        default:
            return '#000000';
    }
}

const ProblemTable = ({ data }: { data: ProblemType[] }) => {
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
            {
                data.map((problem, index) => {
                    return (
                        <tr key={index} className={style.dataContainer}>
                            <td className={style.level} style={{ color: LevelToTextColor(problem.level)}}>Lv. {problem.level}</td>
                            <td>{problem.title}</td>
                            <td className={style.solved}>{problem.solved}명</td>
                            <td className={style.ratio}>{problem.ratio}%</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
};

export default ProblemTable;