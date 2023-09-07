import React from "react";
import { styled } from "styled-components";
import PhoneNumberInput from "../../InputBox/PhoneNumInput";
import CertifyBtn from "../../Button/CertifyBtn";
import CertifyNumInput from "../../InputBox/CertifyNumInput";
import SendBtn from "../../Button/SendBtn";

interface MobileCertifyProps {
  phoneNum: string;
  certifyNum: string;
  setPhoneNum: (phoneNum: string) => void;
  certifyHdr: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setCertifyNum: (certifyNum: string) => void;
  sendHdr: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MobileCertify: React.FC<MobileCertifyProps> = ({
  phoneNum,
  certifyNum,
  certifyHdr,
  sendHdr,
  setPhoneNum,
  setCertifyNum,
}) => {
  return (
    <MCSection>
      <MClabel>핸드폰 인증</MClabel>
      <MobileInputCtn>
        <PhoneNumberInput setPhoneNum={setPhoneNum} />
        <CertifyBtn
          onClick={e => certifyHdr(e)}
          isDisable={phoneNum ? false : true}
        />
      </MobileInputCtn>
      <CertifyCtn>
        <CertifyNumInput setCertifyNum={setCertifyNum} />
        <SendBtn
          isDisable={certifyNum ? false : true}
          onClick={e => sendHdr(e)}
        />
      </CertifyCtn>
    </MCSection>
  );
};

export default MobileCertify;

export const MCSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const MClabel = styled.label`
  font-size: 16px;
`;

export const MobileInputCtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;
export const CertifyCtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;
