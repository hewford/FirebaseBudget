import React, { createContext, useState, useEffect } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        setToast('');
      }, 5000);
    }
  }, [toast]);

  const displayToast = (msg) => {
    setToast(msg);
  };


  return (
    <ToastContext.Provider
      value={{ toast, displayToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};
