
import log from "./log";
import { FinavianRuokaTiedot, Resepti } from "../types/Interfaces";
import { TestIngredientAPIdata as testIngredientAPIdata } from "../types/TestData";

class FineliPalvelu {
    fakeData = true;
    osoite = "https://fineli.fi/fineli/api/v1/foods/"

    addFilters() {
        let hakuehdot : string = "&foodType=ANY&";
        const ruokaAineLuokat = [
         "FRUITTOT","APPLE","CITRUS","FRUITOTH","BERRY","FRUITCAN","JUICE","FBDRINK","VEGTOT","VEGLEAF","VEGFRU","CABBAGE","VEGONI","ROOT","MUSHRO","VEGJUICE","VEGCANN","LEGUTOT","PEABEAN","NUTSEED","LEGUPROD","SOYAPROD","LEGULIQ","POTATOT","POTATO","POTAPROD","CERTOT","WHEAT","RYE","OAT","BARLEY","RICE","CEROTH","CERBAR","OATLIQ","CEROTLIQ","STARCH","MILKTOT","CREAM","ICECREAM","MILKFF","MILKLF","MILKHF","MILKINGR","SOURMILK","YOGHURHI","YOGHURLO","MILKCURL","CURD","SOUCREAM","CHEECUHI","CHEECULO","CHEEUNHI","CHEEUNLO","CHEEPRHI","CHEEPRLO","VEGCHEES","FATTOT","OIL","FATANIM","BUTTER","BUTTHIGH","BUTTLOW","VEGFATHI","VEGFATLO","FATCOOK","SALADDRE","EGGTOT","EGG","EGGOTH","FISHTOT","FISH","FISHPROD","SHELLFIS","MEATTOT","BEEF","PORK","LAMM","POULTRY","SAUSAGE","SAUSCUTS","MEATCUTS","MEATPROD","GAME","OFFAL","BEVTOT","COFFEE","TEA","WATER","SDRINK","DRINKART","DRINKCO","DRSPORT","DRINKOTH","ALCTOT","BEER","CIDER","WINE","SPIRIT","ALCOTH","SUGARTOT","SUGARSYR","SWEET","CHOCOLAT","JAM","FLAVTOT","HERB","FLAVSEED","FLAVSAUC","INGRTOT","SALT","SWEAGE","INGRMIS","DIETTOT","MMILK","HERBSUP","MEALREP","SPORTFOO"
        ]
        for (let i = 0; i < ruokaAineLuokat.length; i++) {
            const ruokaAine = ruokaAineLuokat[i];
            hakuehdot += `&ingredientClass=${ruokaAine}`
        }
        
       return hakuehdot;
    }

    filterDishesAway(ruokaTiedot : FinavianRuokaTiedot[]) {
        let filtered : FinavianRuokaTiedot [] = []
        ruokaTiedot.forEach( (ruokatieto) => {
            if (ruokatieto.type.code!=="DISH") {
                filtered.push(ruokatieto)
            }
        })
       return filtered;
    }

    async keywordFetch(keyword :  string) : Promise<FinavianRuokaTiedot[]> {
        log.debug(`Searching with keyword: ${keyword}`)
        const hakuehdot : string = `?q=*${keyword}*` + this.addFilters();
        const ruokaTiedot = await this.fetchMany(hakuehdot)
        return this.filterDishesAway(ruokaTiedot);
    }

    async  haeReseptinRuokaAineet  (resepti :  Resepti ) {
        const ingredients: FinavianRuokaTiedot [] = [];
        if (this.fakeData) {
            return testIngredientAPIdata;
        }
        const lupaukset : Promise<FinavianRuokaTiedot> [] = [];
        for (let i = 0; i < resepti.ruokaAineet.length; i++) {
            const ruokaAine = resepti.ruokaAineet[i];
            lupaukset.push(this.haeYksi(ruokaAine.ruokaAineId.toString()))
        }
        for  (let i =  0;  i < lupaukset.length; i++) {
            ingredients.push(await lupaukset [i]);
        }
        return ingredients
    }

    private async haeYksi (hakuehdot :string) : Promise<FinavianRuokaTiedot> {
        if (this.fakeData) {
            return testIngredientAPIdata[1];
        }
        const vastaus = await fetch(`${this.osoite}${hakuehdot}`);
        const json: FinavianRuokaTiedot = this.muutaSuola(await vastaus.json());
        return json;
    }

    private async fetchMany (keyword :string) : Promise<FinavianRuokaTiedot[]> {
        if (this.fakeData) {
            return testIngredientAPIdata;
        }
        const fetchApi = this.osoite
        try {
            log.debug(`Fetching FineliAPI: ${fetchApi}`)
            const response = await fetch(fetchApi);
            log.debug(`response: status: ${response.status} `);
            if (response.status !== 200) {
                throw new Error(`status ${response.status}, body: ${await response.text()}`)
            }
            const json = await response.json();
            const salted: FinavianRuokaTiedot [] = this.muutaSuolat(json);
            let ingredients: FinavianRuokaTiedot[] = []
            salted.forEach((ruokatieto) => {
                ingredients.push(ruokatieto)
            })
            log.debug(`Found ${ingredients.length} ingredients.`)
            return ingredients;
        }catch (error : any) {
            log.error(`Error retrieving data from fineli: ${error}`)
            return [];
        }
    }

    muutaSuola (tieto : FinavianRuokaTiedot) {
        return {...tieto, salt: tieto.salt/100}
    }

    muutaSuolat (tiedot : FinavianRuokaTiedot []) {
        const uudetTiedot : FinavianRuokaTiedot [] =  []
        tiedot.forEach(tieto => {
            uudetTiedot.push  ({...tieto, salt: tieto.salt/100})
        })
        return uudetTiedot
    }

}export default FineliPalvelu