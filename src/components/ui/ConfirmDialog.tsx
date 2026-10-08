import Button from './Button';

type ConfirmDialogProps = {
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  message,
  confirmLabel,
  cancelLabel,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[15px] leading-relaxed text-muted">{message}</p>
      <div className="flex justify-end gap-2.5 border-t border-line pt-4">
        <Button variant="secondary" autoFocus onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
}
