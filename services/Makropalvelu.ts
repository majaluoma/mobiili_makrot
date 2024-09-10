import {Makro, Resepti } from "../types/Interfaces";


class Makropalvelu {

    
    async toggleLaskennasta (makro : Makro) : Promise<string> {
        const makrojson = JSON.stringify(makro)
        const vastaus = await fetch ("http://localhost:8080/toggle_makro", {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            body: makrojson,
            headers: {
                "Content-Type": "application/json",
            },
        })
        const viesti = await vastaus.json();
        return viesti.message
    }

    async haeMakronVakioateriat (makro : Makro) {
        try {
            const makrojson = JSON.stringify(makro)
            const vastaus = await fetch ("http://localhost:8080/vakioateriat", {
                method: "POST", 
                mode: "cors", 
                cache: "no-cache", 
                credentials: "same-origin", 
                body: makrojson,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const json: Resepti [] = await vastaus.json();
            return json
        } catch (e) {
            throw (`Reseptien hakemisessa tapahtui virhe: ${e}`);
        }
    }

     //lisaaMakroTietokantaan - lisää tai muuttaa tietokannassa olevia tietoja nimimerkin pohjalta.
     async lisaaMakroTietokantaan (makro : Makro) : Promise<string> {
        if (
            makro.nimimerkki !== "" &&
            makro.aterioita > 0 &&
            makro.sokerit > 0 &&
            makro.suolat > 0 &&
            makro.energiaKcal > 0 &&
            makro.rasvat > 0 &&
            makro.proteiinit > 0 &&
            makro.hiilihydraatit > 0 &&
            makro.kuidut > 0 &&
            makro.tyydyttyneetRasvat > 0
        ) {
            
            const makrojson = JSON.stringify(makro)
            const response = await fetch ("http://localhost:8080/lisaa_makro", {
                method: "POST", 
                mode: "cors", 
                cache: "no-cache", 
                credentials: "same-origin", 
                body: makrojson,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const viesti = await response.json();
            return (viesti.message)
        
    
            
        } else {
            return("Lisää kaikki tiedot");
        }
    }

    //lisaaMakroTietokantaan - lisää tai muuttaa tietokannassa olevia tietoja nimimerkin pohjalta.
    async vakioateriaksi (makro : Makro, resepti : Resepti) : Promise<string> {
        const makrojson = JSON.stringify({makro, resepti})
        const response = await fetch ("http://localhost:8080/lisaa_vakioateriaksi", {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            body: makrojson,
            headers: {
                "Content-Type": "application/json",
            },
        })
        const viesti = await response.json();
        return (viesti.message)
    }

    async poistaMakro (makro : Makro) :  Promise<string> {
        const makrojson = JSON.stringify(makro)
        const response = await fetch ("http://localhost:8080/poista_makro", {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            body: makrojson,
            headers: {
                "Content-Type": "application/json",
            },
        })
        const viesti = await response.json();
        
        return viesti.message
    }

    async poistaVakioateria (resepti : Resepti, makroId : number) :  Promise<string> {
        const makrojson = JSON.stringify({resepti, makroId})
        const response = await fetch ("http://localhost:8080/poista_vakioateria", {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            body: makrojson,
            headers: {
                "Content-Type": "application/json",
            },
        })
        const viesti = await response.json();
        
        return viesti.message
    }

    async haeMakrot  () : Promise<Makro []> {
        try {
            const vastaus = await fetch("http://localhost:8080/kaikki_makrot");
            const json: Makro[] = await vastaus.json();
            return json
        } catch (e) {
            throw (`Reseptien hakemisessa tapahtui virhe: ${e}`);
        }
    }

    async haeMakrotLaskennassa  () : Promise<Makro []> {
        try {
            const vastaus = await fetch("http://localhost:8080/makrot_laskennassa");
            const json: Makro[] = await vastaus.json();
            console.log(`Haettiin Makrojen tiedot  ${json.length} makrosta`);
            return json
        } catch (e) {
            throw (`Makrojen hakemisessa tapahtui virhe: ${e}`);
        }
    }

} export default Makropalvelu