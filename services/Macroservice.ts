import {  Macro } from "../types/Interfaces";
import { getDatabase, ref, push, get, remove, update } from "firebase/database";
import { app } from "../firebaseConfig";


export type FbMacros = Record<string, Macro>;

const database = getDatabase(app);

/** api client for Firebase database for Macro information
 *  
 * */
export async function addOne(macro: Macro): Promise<Macro> {
    const macroRef = ref(database, `/macros`);
    console.log("addMacro");
    const newMacroReference = await push(macroRef, macro);
    const res = await get(newMacroReference);
    const data = res.val();
    return {...data, macroKey: newMacroReference.key} as Macro;
}

export async function fetchOne(macro: Macro): Promise<Macro> {
    try {
        const macroRef = ref(database, `/macros/${macro.macroKey}`);
        const res = await get(macroRef);
        const data = res.val() as FbMacros;
        
        if (data) {
            console.debug(`Fetched a macro`)
            return transformToMacros(data)[0];
        } else {
            throw new Error (`Macro not found with this key ${macro.macroKey}`)
        }
    } catch (error) {
        console.error("Error fetching macros:", error);
        return {} as Macro;
    }
}

export async function removeOne(macro: Macro): Promise<void> {
    try {
        const macroRef = ref(database, `/macros/${macro.macroKey}`);
        await remove(macroRef);
        console.debug(`removed macro`)
    } catch (error) {
        console.error("Error updating macros:", error);
    }
}

export async function updateOne(macro: Macro): Promise<void> {
    try {
        const macroRef = ref(database, `/macros/${macro.macroKey}`);
        await update(macroRef, macro);
        console.debug(`updated macro`)
    } catch (error) {
        console.error("Error updating macros:", error);
    }
  
}

export async function fetchMacros(): Promise<Macro[]> {
    console.log("fetchMacros")
    try {
        const macroRef = ref(database, "/macros");
        const res = await get(macroRef);
        const data = res.val() as FbMacros;
        
        if (data) {
            return transformToMacros(data);
        } else {
            return []
        }
    } catch (error) {
        console.error("Error fetching macros:", error);
        return [];
    }
}


function transformToMacros  (data : FbMacros) : Macro[] {
    console.debug("transformToMacros");
    let dataArray = Object.entries(data)
    const macros : Macro [] = [];
    dataArray.forEach((dataPiece) => {
        let key = dataPiece[0];
        let macro = dataPiece[1];
        macros.push({...macro, macroKey:key})
    });
    return macros
}

export async function fetchMacrosInUse(): Promise<Macro[]> {
    const macros = await  fetchMacros();
    const filtered = macros.filter((macro) => {
        if (macro.inUse && macro.dishesPerDay>0 && macro.kcalPerDish>0) {
            return macro
        }
    })
    return filtered;
}
