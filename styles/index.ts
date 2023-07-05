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

export const MarkerContent = styled.div`
  color: #000;
`;
