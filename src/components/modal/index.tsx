import * as React from "react";
import { ModalContainer, ModalContent, CloseButton } from "./styles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <ModalContainer open={open}>
      <ModalContent>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
