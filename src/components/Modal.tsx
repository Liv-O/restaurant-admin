import { useEffect, type ReactNode } from 'react';
import Button from './ui/Button';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function handleClickOutside(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClickOutside}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl"
      >
        <div className="mb-4 flex flex-col gap-1">
          <h2 className="text-lg font-bold">New Reservation</h2>
          <p className="text-sm text-muted">Fields marked with * are required</p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
