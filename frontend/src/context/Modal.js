import { useContext, useRef, useState, useEffect, createContext } from 'react';

export const ModalContext = createContext();

export function ModalProvider({children}) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  },[])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
        </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}
