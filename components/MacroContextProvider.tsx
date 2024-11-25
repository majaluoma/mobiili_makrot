import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Macro } from '../types/Interfaces';
import { addOne, removeOne, updateOne, fetchMacros } from '../services/Macroservice';

type MacroContextType = {
    macros: Macro[];
    addMacro: (newMacro: Macro) => void;
    updateMacro: (updatedMacro: Macro) => void;
    deleteMacro: (deletedMacro: Macro) => void;
};
const MacroContext = createContext<MacroContextType | undefined>(undefined);

type MacroContextProviderProps = {
    children : ReactNode
}
/** Offers methods to edit, update and delet macros in Google Firebase
 * */
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

    const addMacro = async (newMacro: Macro) => {
        const createdMacro = await addOne(newMacro);
        setMacros([...macros, createdMacro]);
    };

    const updateMacro = (updatedMacro: Macro) => {
        updateOne(updatedMacro);
        setMacros(macros.map(m => m.macroKey === updatedMacro.macroKey ? updatedMacro : m));
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