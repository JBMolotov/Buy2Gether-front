import styled from "styled-components";

interface ModalContainerProps {
  open: boolean;
}

export const ModalContainer = styled.div<ModalContainerProps>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  overflow: auto;
  font-family: "Raleway", sans-serif;
`;

export const ModalContent = styled.div`
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  width: 60%;
  max-width: 800px;
  margin: 25% auto;
  padding: 5rem;
  position: relative;
  font-family: "Raleway", sans-serif;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  color: #888;

  &:hover {
    color: #000;
  }
`;
