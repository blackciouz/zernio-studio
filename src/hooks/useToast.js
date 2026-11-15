import { useState, createContext, useContext } from 'react';
import React from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return React.createElement(ToastContext.Provider, { value: addToast },
    children,
    React.createElement('div', { className: 'fixed bottom-4 right-4 z-50 flex flex-col gap-2' },
      toasts.map((toast) => 
        React.createElement('div', { key: toast.id, className: 'bg-slate-800 text-white px-4 py-2 rounded shadow-lg text-sm' }, toast.message)
      )
    )
  );
};

export const useToast = () => useContext(ToastContext);
