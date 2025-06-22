import React from 'react';
import { Modal } from 'react-magma-dom';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  children?: React.ReactNode;
}

export const BaseModal = ({ isOpen, onClose, header, children }: BaseModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={header}>
      {children}
    </Modal>
  );
};

