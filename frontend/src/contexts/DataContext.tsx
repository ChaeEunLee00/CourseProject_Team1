import React, { createContext, useContext, useState } from 'react';

interface DataContextProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

interface DataProviderProps {
    children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [password, setPassword] = useState('');

    return (
        <DataContext.Provider value={{password, setPassword }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextProps => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};