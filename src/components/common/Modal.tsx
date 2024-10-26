import { Dispatch, ReactElement, ReactNode, SetStateAction, cloneElement, createContext, useContext, useState } from 'react';

import { createPortal } from 'react-dom';

interface ModalContextValues {
  openName: string;
  open: Dispatch<SetStateAction<string>>
  close: () => void
}

const defaultValues = {
  openName: '',
  open: () => { },
  close: () => { }
}

const ModalContext = createContext<ModalContextValues>(defaultValues)

const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = setOpenName;

  return <ModalContext.Provider value={{ openName, open, close }}>
    {children}
  </ModalContext.Provider>
}

const Open = ({ children, name }: { children: ReactElement, name: string }) => {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => open(name) })
}

const Window = ({ children, name = '', closeModal }: { children: ReactElement, name?: string, closeModal?: () => void }) => {
  const { openName, close } = useContext(ModalContext)

  if (openName !== name) return null
  const handleClose = () => {
    closeModal?.();
    close()
  }

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center" onClick={handleClose}>
      <div
        className="w-[46rem] relative min-w-[23rem] h-full z-50 flex items-center justify-center bg-black/50"
        aria-label="모달 배경"
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div >,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window

export default Modal;
