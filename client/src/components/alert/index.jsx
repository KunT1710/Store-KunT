import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'antd';
import { createPortal } from 'react-dom';
import './style.scss';

const AlertContext = createContext();

const AlertContainer = ({ alerts, removeAlert }) => {
  return createPortal(
    <div className="alert-container">
      {alerts.map(({ id, message, description, type, closable = true }) => (
        <Alert
          key={id}
          className="custom-alert"
          message={message}
          description={description}
          type={type}
          showIcon
          closable={closable}
          onClose={() => removeAlert(id)}
        />
      ))}
    </div>,
    document.body
  );
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { ...alert, id }]);
    if (alert.duration !== 0) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
      }, alert.duration || 3000);
    }
  };

  const removeAlert = (id) => {
    setAlerts((prev) => {
      if (!prev.some(a => a.id === id)) return prev; // Đã xóa rồi thì không xóa nữa
      return prev.filter((a) => a.id !== id);
    });
  };

  const showSuccess = (message, description = '', duration = 3000) => {
    addAlert({ message, description, type: 'success', duration });
  };
  const showError = (message, description = '', duration = 3000) => {
    addAlert({ message, description, type: 'error', duration });
  };
  const showWarning = (message, description = '', duration = 3000) => {
    addAlert({ message, description, type: 'warning', duration });
  };
  const showInfo = (message, description = '', duration = 3000) => {
    addAlert({ message, description, type: 'info', duration });
  };

  return (
    <AlertContext.Provider value={{ addAlert, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <AlertContainer alerts={alerts} removeAlert={removeAlert} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
