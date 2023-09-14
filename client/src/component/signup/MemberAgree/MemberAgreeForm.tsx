import React, { useState } from "react";
import { styled } from "styled-components";
import ConfirmBtn from "../../Button/ConfirmBtn";
import { useNavigate } from "react-router-dom";

const MemberAgreeForm = () => {
  const navigate = useNavigate();
  const [checkAll, setCheckAll] = useState(false);
  const [checkService, setCheckService] = useState(false);
  const [checkPInfo, setCheckPInfo] = useState(false);
  const [checkInfo, setCheckInfo] = useState(false);

  //확인누를시 회원가입페이지로 직행.
  const confirmHdr = () => {
    navigate("/signup");
  };
  //모두동의 클릭시 모든 체크박스 클릭.
  const checkAllHdr = () => {
    setCheckAll(!checkAll);
    setCheckService(!checkAll);
    setCheckPInfo(!checkAll);
    setCheckInfo(!checkAll);
  };

  const checkServiceHdr = () => {
    setCheckService(!checkService);
  };

  const checkPInfoHdr = () => {
    setCheckPInfo(!checkPInfo);
  };

  const checkInfoHdr = () => {
    setCheckInfo(!checkInfo);
  };

  return (
    <MASection>
      {/* <div>
        <AgreeSpan>이용약관</AgreeSpan>
        <InputSpan>정보입력</InputSpan>
        <DoneSpan>완료</DoneSpan>
      </div> */}
      <AllAgree>
        <input
          type="checkbox"
          checked={checkAll}
          onChange={() => checkAllHdr()}
          style={{ marginRight: "4px", color: "#A2A2A2" }}
        ></input>
        모두 동의 합니다.
      </AllAgree>
      <ServiceAgree>
        <input
          type="checkbox"
          checked={checkService}
          onChange={() => checkServiceHdr()}
          style={{ marginRight: "4px", color: "#A2A2A2" }}
        ></input>
        이용약관에 동의합니다.(필수)
      </ServiceAgree>
      <PersonalInfoAgree>
        <input
          type="checkbox"
          checked={checkPInfo}
          onChange={() => checkPInfoHdr()}
          style={{ marginRight: "4px", color: "#A2A2A2" }}
        ></input>
        개인정보처리방침에 동의합니다.(필수)
      </PersonalInfoAgree>
      <InfoAgree>
        <input
          type="checkbox"
          checked={checkInfo}
          onChange={() => checkInfoHdr()}
          style={{ marginRight: "4px", color: "#A2A2A2" }}
        ></input>
        유용한 소식 받기.(선택)
      </InfoAgree>
      <ConfirmBtn
        onClick={() => confirmHdr()}
        isDisable={checkService === true && checkPInfo === true ? false : true}
      />
    </MASection>
  );
};

export default MemberAgreeForm;

export const MASection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 21px;
  width: 239px;
`;
export const AgreeSpan = styled.span`
  font-size: 12px;
  margin-right: 5px;
  font-weight: 600;
`;

export const InputSpan = styled.span`
  font-size: 12px;
  color: #595959;
  margin-right: 5px;
`;

export const DoneSpan = styled.span`
  font-size: 12px;
  color: #595959;
`;
//border색상이 제대로 출력되지 않음.
export const AllAgree = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #bdbdbd;
  background-color: #e9eeff;
  border-radius: 4px;
  height: 30px;
  font-size: 12px;
  color: #2a2a2a;
  padding-left: 18px;
  margin-top: 14px;
`;

export const ServiceAgree = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  color: #2a2a2a;
  padding-left: 18px;
  margin-top: 12px;
`;
//수치에 문제가있는지 줄바꿈이 발생함.
export const PersonalInfoAgree = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  color: #2a2a2a;
  padding-left: 18px;
  margin-top: 12px;
`;

export const InfoAgree = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  color: #2a2a2a;
  padding-left: 18px;
  margin-top: 12px;
`;
