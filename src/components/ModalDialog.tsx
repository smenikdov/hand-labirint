import React, { ReactNode, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BiX } from 'react-icons/bi';

interface ModalProps {
    isVisible: boolean;
    title: string,
    children: ReactNode;
    onClose: (event: React.MouseEvent<HTMLElement>) => void;
    width?: number;
}

const Modal = ({ isVisible, children, onClose, title, width = 600 }: ModalProps) => {
    if (!isVisible) return null;

    const modalContent = (
        <div className="modal">
            <div className="modalOverlay" onClick={onClose} />
            <div className="modalWrapper" style={{ width: `${width}px` }}>
                <div className="modalContent">
                    <div className="modalHeader mbMd">
                        <h2 className="modalTitle">{title}</h2>
                        <button className="closeButton" onClick={onClose}>
                            <BiX size="1.3em" />
                        </button>
                    </div>
                    <div className="modalBody">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.body,
    );
};

export default Modal;