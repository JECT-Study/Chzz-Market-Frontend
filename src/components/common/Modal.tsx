import { ReactElement, ReactNode, cloneElement, createContext, useContext, useState } from 'react';

import { createPortal } from 'react-dom';

interface IModalContext {
  flag: boolean
  open: () => void
  close: () => void
}

const defaultValues = {
  flag: false,
  open: () => { },
  close: () => { }
}

const ModalContext = createContext<IModalContext>(defaultValues)

const Modal = ({ children }: { children: ReactNode }) => {
  const [flag, setFlag] = useState(false)
  const close = () => setFlag(false)
  const open = () => setFlag(true)

  return <ModalContext.Provider value={{ flag, open, close }}>
    {children}
  </ModalContext.Provider>
}

const Open = ({ children }: { children: ReactElement }) => {
  const { open } = useContext(ModalContext)

  return cloneElement(children, { onClick: open })
}

const Window = ({ children }: { children: ReactElement }) => {
  const { flag, close } = useContext(ModalContext)
  if (!flag) return null

  return createPortal(
    <div className='absolute inset-0 flex items-center justify-center' onClick={close}>
      <div
        className='w-[46rem] relative min-w-[23rem] z-50 h-full flex items-center justify-center bg-black/50'
        aria-label="모달 배경"
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div >,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window

export default Modal;
