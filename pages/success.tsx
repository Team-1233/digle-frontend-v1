import Image from "next/image";
import logo2 from "../public/logo2.svg";
import * as S from '../styles/index';

const CompletePage = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Image src={logo2} alt="로고" />
      </div>
      <S.Text>결제가 성공적으로 완료되었어요!</S.Text>
    </div>
  );
};

export default CompletePage;
