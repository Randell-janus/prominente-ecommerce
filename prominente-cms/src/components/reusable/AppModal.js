import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XIcon } from "./icons";

export default function AppModal({
  isOpen,
  closeModal,
  children,
  className,
  title,
  onClick,
  btnClassName,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`${className} relative w-full transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all`}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 hover:scale-110 active:scale-90 focus:outline-none"
                >
                  <XIcon />
                </button>
                <form onSubmit={onClick} className="space-y-6 p-8">
                  <h2 className="font-bold capitalize">{title}</h2>
                  {children}
                  <button
                    // onClick={onClick}
                    type="submit"
                    className={`add-products-btn text-white rounded-md w-full capitalize ${btnClassName}`}
                  >
                    {title}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
