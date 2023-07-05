import styled, { keyframes } from "styled-components";
import Modal from "react-modal";

export const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  min-height: 800px;
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
`;

export const MarkerModal = styled(Modal)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border: none;
  padding: 0;
  overflow: visible;
  animation: ${slideUpAnimation} 0.5s ease-in-out;
  height: 200px;
  background-color: white;
  border-radius: 8px;
  outline: none;
`;

export const MarkerContent = styled.div``;

export const TitleList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin-left: 20px;
  margin-top: 20px;
`;

export const Lists = styled.li``;

export const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-left: 15px;
  margin-top: 0px;
`;

export const DescArea = styled.div`
  width: 300px;
  height: 42px;
  margin-left: 20px;
  margin-top: -10px;
`;

export const Description = styled.p`
  font-size: 17px;
  color: #003d68;
  margin: 0;
`;

export const BtnContainer = styled.a`
  padding-top: 40px;
  width: 140px;
  height: 35px;
  margin: 0 auto;
  text-align: center;
`;

export const DonateBtn = styled.button`
  width: 140px;
  height: 35px;
  background-color: #2e99c7;
  color: white;
  border: none;
  border-radius: 20px;
`;

export const Container = styled.div`
  text-align: center;
  margin-top: 30px;
`
