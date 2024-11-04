import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Macro } from '../types/Interfaces';
import { addOne, removeOne, updateOne, fetchMacros } from '../services/Macroservice';

// Define the context shape
type MacroContextType = {
    macros: Macro[];
    addMacro: (newMacro: Macro) => void;
    updateMacro: (updatedMacro: Macro) => void;
    deleteMacro: (deletedMacro: Macro) => void;
};
// Create the context
const MacroContext = createContext<MacroContextType | undefined>(undefined);

type MacroContextProviderProps = {
    children : ReactNode
}
// Macro context provider
export const MacroContextProvider = ({ children } : MacroContextProviderProps) => {
    const [macros, setMacros] = useState<Macro[]>([]);

    useEffect(()=> {
        fetchAllMacros()
    }, []) 

    const fetchAllMacros = async () => {
        console.log("fetchMacros");
        setMacros(await fetchMacros());
        console.debug("MAcros set to service");
    };

    const addMacro = (newMacro: Macro) => {
        setMacros([...macros, newMacro]);
        addOne(newMacro);
    };

    const updateMacro = (updatedMacro: Macro) => {
        setMacros(macros.map(m => m.macroKey === updatedMacro.macroKey ? updatedMacro : m));
        updateOne(updatedMacro);
    };

    const deleteMacro = (deletedMacro : Macro) => {
        setMacros(macros.filter(m=>m.macroKey != deletedMacro.macroKey));
        console.debug("Hei:"+macros.filter(m=>m.macroKey != deletedMacro.macroKey).length)
        removeOne(deletedMacro);
    }

    return (
        <MacroContext.Provider value={{ macros, addMacro, updateMacro, deleteMacro }}>
            {children}
        </MacroContext.Provider>
    );
};

export const useMacros = () => {
    const context = useContext(MacroContext);
    if (!context) {
        throw new Error('useMacros must be used within a MacroContextProvider');
    }
    return context;
};