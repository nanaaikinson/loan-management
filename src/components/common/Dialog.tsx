import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import classnames from "classnames";
import { Fragment } from "react";

interface DialogProps {
  visible: boolean;
  children?: React.ReactNode;
  panelClassName?: string;
  dialogClassName?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "screen";
  closeOnBackgroundClick?: boolean;
  onClose?: () => void;
}

export default function Dialog({
  children,
  visible,
  panelClassName,
  dialogClassName,
  size,
  closeOnBackgroundClick,
  onClose,
}: DialogProps) {
  const sizeClassName = () => {
    switch (size) {
      case "xs":
        return "max-w-sm";
      case "md":
        return "max-w-2xl";
      case "lg":
        return "max-w-4xl";
      case "xl":
        return "max-w-5xl";
      case "xxl":
        return "max-w-7xl";
      case "screen":
        return "max-w-screen";
      default:
        return "max-w-xl";
    }
  };

  const panelClassNames = classnames(
    "w-full transform overflow-hidden rounded-[10px] bg-white text-left align-middle shadow-xl transition-all",
    panelClassName,
    sizeClassName()
  );
  const dialogClassNames = classnames(
    "relative z-[100] dialog-class",
    dialogClassName
  );

  const closeDialog = () => {
    if (closeOnBackgroundClick) {
      onClose?.();
    }
  };

  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <HeadlessDialog
          as="div"
          className={dialogClassNames}
          onClose={closeDialog}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel className={panelClassNames}>
                  {children}
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    </>
  );
}
