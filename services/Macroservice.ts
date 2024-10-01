import {  Macro } from "../types/Interfaces";
import { getDatabase, ref, push, get, remove, update } from "firebase/database";
import { app } from "../firebaseConfig";

export type FbMacros = Record<string, Macro>;

class Macroservice {
    database;
    constructor() {
        this.database = getDatabase(app);
    }


    /** lisää tai muuttaa tietokannassa olevia tietoja nimimerkin pohjalta.
     *
     */

    async addMacro(macro: Macro): Promise<string> {
        const macroRef = ref(this.database, `/macros`);
        console.log("addMacro")
        return push(macroRef, macro).then((ref) => {
            return ref.toString();
        });
    }

    async fetchMacro(macro: Macro): Promise<Macro> {
        try {
            const macroRef = ref(this.database, `/macros/${macro.macroKey}`);
            const res = await get(macroRef);
            const data = res.val() as FbMacros;
            
            if (data) {
                console.debug(`Fetched a macro`)
                return this.transformToMacros(data)[0];
            } else {
                throw new Error (`Macro not found with this key ${macro.macroKey}`)
            }
        } catch (error) {
            console.error("Error fetching macros:", error);
            return {} as Macro;
        }
    }

    async removeMacro(macro: Macro): Promise<void> {
        try {
            const macroRef = ref(this.database, `/macros/${macro.macroKey}`);
            await remove(macroRef);
            console.debug(`updated macro`)
        } catch (error) {
            console.error("Error updating macros:", error);
        }
    }

    async updateMacro(macro: Macro): Promise<void> {
        try {
            const macroRef = ref(this.database, `/macros/${macro.macroKey}`);
            await update(macroRef, macro);
            console.debug(`removed macro`)
        } catch (error) {
            console.error("Error updating macros:", error);
        }
      
    }

    async fetchMacros(): Promise<Macro[]> {
        console.log("fetchMacros")
        try {
            const macroRef = ref(this.database, "/macros");
            const res = await get(macroRef);
            const data = res.val() as FbMacros;
            
            if (data) {
                return this.transformToMacros(data);
            } else {
                return []
            }
        } catch (error) {
            console.error("Error fetching macros:", error);
            return [];
        }
    }


    transformToMacros  (data : FbMacros) : Macro[] {
        let dataArray = Object.entries(data)
        const macros : Macro [] = [];
        dataArray.forEach((dataPiece) => {
            let key = dataPiece[0];
            let macro = dataPiece[1];
            macros.push({...macro, macroKey:key})
        });
        return macros
    }

    async fetchMacrosInUse(): Promise<Macro[]> {
        const macros = await  this.fetchMacros();
        const filtered = macros.filter((macro) => {
            if (macro.inUse) {
                return macro
            }
        })
        return filtered;
    }
}
export default Macroservice;
