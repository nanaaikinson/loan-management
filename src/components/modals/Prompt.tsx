import Button from "../common/Button";
import Dialog from "../common/Dialog";

interface PromptProps {
  visible: boolean;
  className?: string;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Prompt = ({
  visible,
  confirmText,
  cancelText,
  title,
  message,
  onConfirm,
  onCancel,
}: PromptProps) => {
  return (
    <Dialog visible={visible}>
      <div className="px-6 py-16 text-center">
        <svg
          aria-hidden="true"
          className="mx-auto mb-4 text-gray-400 w-20 h-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>

        {title && <h3 className="text-xl font-medium">{title}</h3>}

        <p className="text-gray-500">{message}</p>

        <div className="flex justify-center space-x-3 pt-5">
          <Button
            variant="primary"
            onClick={onConfirm}
            type="button"
            className="px-10"
          >
            {confirmText || "Yes"}
          </Button>

          <Button
            variant="secondary"
            onClick={onCancel}
            type="button"
            className="px-10"
          >
            {cancelText || "No"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Prompt;
