// 컴포넌트 경로에 맞게 수정하세요import '../../src/style.module.scss'; // 스타일 경로에 맞게 수정하세요

import {mount} from "cypress/react18";
import Banner from "./index.tsx";

describe('<Banner /> 컴포넌트', () => {
      it('배너 컴포넌트가 렌더링 되는지 테스트', () => {
            mount(<Banner />);
      });
});