import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Macro } from '../types/Interfaces';
import Macroservice from '../services/Macroservice';

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
    const macroService : Macroservice = new Macroservice();

    useEffect(()=> {
        fetchMacros()
    }, []) 

    const fetchMacros = async () => {
        console.log("fetchMacros");
        setMacros(await macroService.fetchMacros());
    };

    const addMacro = (newMacro: Macro) => {
        setMacros((prevMacros) => [...prevMacros, newMacro]);
        macroService.addMacro(newMacro);
    };

    const updateMacro = (updatedMacro: Macro) => {
        setMacros((prevMacros) => prevMacros.map(m => m.macroKey === updatedMacro.macroKey ? updatedMacro : m));
        macroService.updateMacro(updatedMacro);
    };

    const deleteMacro = (deletedMAcro : Macro) => {
        setMacros((prevMacros) => prevMacros.filter(m=>m.macroKey != deletedMAcro.macroKey))
        macroService.removeMacro(deletedMAcro);
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