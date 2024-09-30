import {  Macro, Resepti } from "../types/Interfaces";
import { getDatabase, ref, push, get, remove } from "firebase/database";
import { app } from "../firebaseConfig";

export type FbMacros = Record<string, Macro>;

class Makropalvelu {
    database;
    constructor() {
        this.database = getDatabase(app);
    }

    /** Includes or excludes Macro from macro calculations
     *
     */
    async toggleLaskennasta(makro: Macro): Promise<string> {
        return "not implemented";
    }

    /** lisää tai muuttaa tietokannassa olevia tietoja nimimerkin pohjalta.
     *
     */

    async addMacro(macro: Macro): Promise<string> {
        console.log("addMacro")
        if (macro.nimimerkki !== "") {
            return push(ref(this.database, "/macros"), macro).then((ref) => {
                return ref.toString();
            });
        } else {
            return "Lisää kaikki tiedot";
        }
    }

    async removeMacro(macro: Macro): Promise<string> {

        return "Not implemented";
    }

    async fetchMacros(): Promise<Macro[]> {
        console.log("fetchMacros")
        const macroRef = ref(this.database, "/macros");
        try {
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
            macros.push({...macro, makroId:key})
        });
        return macros
    }

    async haeMakrotLaskennassa(): Promise<Macro[]> {
        try {
            const vastaus = await fetch("http://localhost:8080/makrot_laskennassa");
            const json: Macro[] = await vastaus.json();
            console.log(`Haettiin Makrojen tiedot  ${json.length} makrosta`);
            return json;
        } catch (e) {
            throw `Makrojen hakemisessa tapahtui virhe: ${e}`;
        }
    }
}
export default Makropalvelu;
