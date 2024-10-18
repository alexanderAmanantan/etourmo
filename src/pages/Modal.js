import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

function Modal({ isOpen, onClose, children }) {
    const modalOverlayRef = useRef(null);
    const modalCloseButtonRef = useRef(null);

    // Handle close logic
    const handleClose = useCallback(() => {
        const modalOverlay = modalOverlayRef.current;
        modalOverlay.classList.remove('show');

        modalOverlay.addEventListener('transitionend', () => {
            onClose();
        }, { once: true });
    }, [onClose]);

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleClose]);

    // Handle modal opening
    useEffect(() => {
        const modalOverlay = modalOverlayRef.current;
        if (isOpen) {
            modalOverlay.classList.add('show');
            adjustCloseButton();
            scrollToTop();
        }
    }, [isOpen]);

    // Function to scroll modal content to the top
    const scrollToTop = () => {
        const modalBody = modalOverlayRef.current.querySelector('.modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
    };

    // Adjust close button position based on modal content height
    const adjustCloseButton = () => {
        const modalContent = modalOverlayRef.current.querySelector('.modal-content');
        const modalHeight = modalContent.offsetHeight;
        const topPosition = Math.max(modalHeight / -5, -5);
        const rightPosition = Math.max(modalHeight / 50);
        const modalCloseButton = modalCloseButtonRef.current;
        modalCloseButton.style.top = `${topPosition}px`;
        modalCloseButton.style.right = `${rightPosition}px`;
    };

    // Prevent background scroll when scrolling inside the modal
    const handleModalScroll = (event) => {
        const modalBody = modalOverlayRef.current.querySelector('.modal-body');
        if (modalBody) {
            const { scrollTop, scrollHeight, clientHeight } = modalBody;
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;

            if (isAtTop && event.deltaY < 0) {
                // Prevent scrolling the main page if at the top and scrolling up
                event.preventDefault();
            } else if (isAtBottom && event.deltaY > 0) {
                // Prevent scrolling the main page if at the bottom and scrolling down
                event.preventDefault();
            }
        }
    };

    // Add scroll event listener to modal body
    useEffect(() => {
        const modalBody = modalOverlayRef.current?.querySelector('.modal-body');
        if (modalBody) {
            modalBody.addEventListener('wheel', handleModalScroll, { passive: false });
        }

        return () => {
            if (modalBody) {
                modalBody.removeEventListener('wheel', handleModalScroll);
            }
        };
    }, [isOpen]);

    const overlayClass = isOpen ? 'modal-overlay' : 'modal-overlay hidden';

    return (
        <div 
            ref={modalOverlayRef} 
            className={overlayClass} 
            onClick={handleClose} 
            aria-modal="true" 
            role="dialog"
        >
            <div 
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    ref={modalCloseButtonRef} 
                    className="modal-close" 
                    onClick={handleClose} 
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <div className="modal-body" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
