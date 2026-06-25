'use client';
import { createContext, useContext } from 'react';

const EditContext = createContext({ editing: false });

export function EditProvider({ editing, children }) {
  return (
    <EditContext.Provider value={{ editing }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  return useContext(EditContext);
}
