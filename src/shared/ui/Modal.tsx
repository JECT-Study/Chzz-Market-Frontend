import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from 'react';

import { createPortal } from 'react-dom';

const ModalContext = createContext({
  openName: '',
  open: (_name: string) => { },
  close: () => { }
});

export const Modal = ({ children }: { children: ReactNode }) => {
  const [openName, setOpenName] = useState('')
  const close = () => setOpenName('')
  const open = (name: string) => setOpenName(name);

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
    <div className="absolute inset-0 z-50 flex items-center justify-center" onClick={handleClose} aria-label="모달">
      <div
        className="relative z-50 flex items-center justify-center h-full w-web min-w-mobile bg-black/50"
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div >,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window