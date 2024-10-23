import log from "./log";
import { Ingredient } from "../types/Interfaces";
import { TestIngredientAPIdata as testIngredientAPIdata } from "../types/TestData";
const API_URL = "https://fineli.fi/fineli/api/v1/foods/";
const HEADERS = {
    "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
};
const DATA_SOURCE = process.env.DATA_SOURCE;


export const testConnection =  async () => {
    if (DATA_SOURCE === "fakedata") {
        return log.debug("Using fakedata");
    }
    try {
        const response = await fetch(API_URL, { method: "GET", headers: HEADERS });
        log.debug(`response: status: ${response.status} `);
        if (response.status !== 200) {
            throw new Error(`status ${response.status}, body: ${await response.text()}`);
        }
        log.debug("Using API")
    } catch (err) {
        log.error(err);
    }
}

export const fetchMany = async (keyword: string) => {
    if (DATA_SOURCE === "fakedata") {
        return testIngredientAPIdata;
    }
    try {
        log.debug(`Fetching FineliAPI: ${API_URL + keyword}`);
        const response = await fetch(API_URL + `?q=*${keyword}*` + addFilters(), { method: "GET", headers: HEADERS });
        
        log.debug(`response: status: ${response.status} `);
        if (response.status !== 200) {
            throw new Error(`status ${response.status}, body: ${await response.text()}`);
        }

        const json : Ingredient[] = await response.json();
        const result: Ingredient[] = filterDishesAway(muutaSuolat(json));
        log.debug(`Found ${result.length} ingredients.`);
        return result
    } catch (error: any) {
        log.error(`Error retrieving data from fineli: ${error}`);
        return [];
    }
};

const muutaSuola = (tieto: Ingredient) => {
    return { ...tieto, salt: tieto.salt / 100 };
}

const muutaSuolat = (tiedot: Ingredient[]) => {
    const uudetTiedot: Ingredient[] = [];
    tiedot.forEach((tieto) => {
        uudetTiedot.push({ ...tieto, salt: tieto.salt / 100 });
    });
    return uudetTiedot;
}

const addFilters = () => {
    let hakuehdot: string = "&foodType=ANY&";
    const ruokaAineLuokat = [
        "FRUITTOT",
        "APPLE",
        "CITRUS",
        "FRUITOTH",
        "BERRY",
        "FRUITCAN",
        "JUICE",
        "FBDRINK",
        "VEGTOT",
        "VEGLEAF",
        "VEGFRU",
        "CABBAGE",
        "VEGONI",
        "ROOT",
        "MUSHRO",
        "VEGJUICE",
        "VEGCANN",
        "LEGUTOT",
        "PEABEAN",
        "NUTSEED",
        "LEGUPROD",
        "SOYAPROD",
        "LEGULIQ",
        "POTATOT",
        "POTATO",
        "POTAPROD",
        "CERTOT",
        "WHEAT",
        "RYE",
        "OAT",
        "BARLEY",
        "RICE",
        "CEROTH",
        "CERBAR",
        "OATLIQ",
        "CEROTLIQ",
        "STARCH",
        "MILKTOT",
        "CREAM",
        "ICECREAM",
        "MILKFF",
        "MILKLF",
        "MILKHF",
        "MILKINGR",
        "SOURMILK",
        "YOGHURHI",
        "YOGHURLO",
        "MILKCURL",
        "CURD",
        "SOUCREAM",
        "CHEECUHI",
        "CHEECULO",
        "CHEEUNHI",
        "CHEEUNLO",
        "CHEEPRHI",
        "CHEEPRLO",
        "VEGCHEES",
        "FATTOT",
        "OIL",
        "FATANIM",
        "BUTTER",
        "BUTTHIGH",
        "BUTTLOW",
        "VEGFATHI",
        "VEGFATLO",
        "FATCOOK",
        "SALADDRE",
        "EGGTOT",
        "EGG",
        "EGGOTH",
        "FISHTOT",
        "FISH",
        "FISHPROD",
        "SHELLFIS",
        "MEATTOT",
        "BEEF",
        "PORK",
        "LAMM",
        "POULTRY",
        "SAUSAGE",
        "SAUSCUTS",
        "MEATCUTS",
        "MEATPROD",
        "GAME",
        "OFFAL",
        "BEVTOT",
        "COFFEE",
        "TEA",
        "WATER",
        "SDRINK",
        "DRINKART",
        "DRINKCO",
        "DRSPORT",
        "DRINKOTH",
        "ALCTOT",
        "BEER",
        "CIDER",
        "WINE",
        "SPIRIT",
        "ALCOTH",
        "SUGARTOT",
        "SUGARSYR",
        "SWEET",
        "CHOCOLAT",
        "JAM",
        "FLAVTOT",
        "HERB",
        "FLAVSEED",
        "FLAVSAUC",
        "INGRTOT",
        "SALT",
        "SWEAGE",
        "INGRMIS",
        "DIETTOT",
        "MMILK",
        "HERBSUP",
        "MEALREP",
        "SPORTFOO",
    ];
    for (let i = 0; i < ruokaAineLuokat.length; i++) {
        const ruokaAine = ruokaAineLuokat[i];
        hakuehdot += `&ingredientClass=${ruokaAine}`;
    }

    return hakuehdot;
}

const filterDishesAway = (ruokaTiedot: Ingredient[]) => {
    let filtered: Ingredient[] = [];
    ruokaTiedot.forEach((ruokatieto) => {
        if (ruokatieto.type.code !== "DISH") {
            filtered.push(ruokatieto);
        }
    });
    return filtered;
}

class Fineli {
    fakeData = true;
    osoite = "https://fineli.fi/fineli/api/v1/foods/";
    headers = {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
    };
    addFilters() {
        let hakuehdot: string = "&foodType=ANY&";
        const ruokaAineLuokat = [
            "FRUITTOT",
            "APPLE",
            "CITRUS",
            "FRUITOTH",
            "BERRY",
            "FRUITCAN",
            "JUICE",
            "FBDRINK",
            "VEGTOT",
            "VEGLEAF",
            "VEGFRU",
            "CABBAGE",
            "VEGONI",
            "ROOT",
            "MUSHRO",
            "VEGJUICE",
            "VEGCANN",
            "LEGUTOT",
            "PEABEAN",
            "NUTSEED",
            "LEGUPROD",
            "SOYAPROD",
            "LEGULIQ",
            "POTATOT",
            "POTATO",
            "POTAPROD",
            "CERTOT",
            "WHEAT",
            "RYE",
            "OAT",
            "BARLEY",
            "RICE",
            "CEROTH",
            "CERBAR",
            "OATLIQ",
            "CEROTLIQ",
            "STARCH",
            "MILKTOT",
            "CREAM",
            "ICECREAM",
            "MILKFF",
            "MILKLF",
            "MILKHF",
            "MILKINGR",
            "SOURMILK",
            "YOGHURHI",
            "YOGHURLO",
            "MILKCURL",
            "CURD",
            "SOUCREAM",
            "CHEECUHI",
            "CHEECULO",
            "CHEEUNHI",
            "CHEEUNLO",
            "CHEEPRHI",
            "CHEEPRLO",
            "VEGCHEES",
            "FATTOT",
            "OIL",
            "FATANIM",
            "BUTTER",
            "BUTTHIGH",
            "BUTTLOW",
            "VEGFATHI",
            "VEGFATLO",
            "FATCOOK",
            "SALADDRE",
            "EGGTOT",
            "EGG",
            "EGGOTH",
            "FISHTOT",
            "FISH",
            "FISHPROD",
            "SHELLFIS",
            "MEATTOT",
            "BEEF",
            "PORK",
            "LAMM",
            "POULTRY",
            "SAUSAGE",
            "SAUSCUTS",
            "MEATCUTS",
            "MEATPROD",
            "GAME",
            "OFFAL",
            "BEVTOT",
            "COFFEE",
            "TEA",
            "WATER",
            "SDRINK",
            "DRINKART",
            "DRINKCO",
            "DRSPORT",
            "DRINKOTH",
            "ALCTOT",
            "BEER",
            "CIDER",
            "WINE",
            "SPIRIT",
            "ALCOTH",
            "SUGARTOT",
            "SUGARSYR",
            "SWEET",
            "CHOCOLAT",
            "JAM",
            "FLAVTOT",
            "HERB",
            "FLAVSEED",
            "FLAVSAUC",
            "INGRTOT",
            "SALT",
            "SWEAGE",
            "INGRMIS",
            "DIETTOT",
            "MMILK",
            "HERBSUP",
            "MEALREP",
            "SPORTFOO",
        ];
        for (let i = 0; i < ruokaAineLuokat.length; i++) {
            const ruokaAine = ruokaAineLuokat[i];
            hakuehdot += `&ingredientClass=${ruokaAine}`;
        }

        return hakuehdot;
    }

    async testConnection() {
        try {
            const response = await fetch(this.osoite, { method: "GET", headers: this.headers });
            log.debug(`response: status: ${response.status} `);
            console.log(response);
            if (response.status !== 200) {
                throw new Error(`status ${response.status}, body: ${await response.text()}`);
            }
            console.log(response.json());
        } catch (err) {
            console.log(err);
        }
    }

    filterDishesAway(ruokaTiedot: Ingredient[]) {
        let filtered: Ingredient[] = [];
        ruokaTiedot.forEach((ruokatieto) => {
            if (ruokatieto.type.code !== "DISH") {
                filtered.push(ruokatieto);
            }
        });
        return filtered;
    }

    async keywordFetch(keyword: string): Promise<Ingredient[]> {
        log.debug(`Searching with keyword: ${keyword}`);
        const hakuehdot: string = `?q=*${keyword}*` + this.addFilters();
        const ruokaTiedot = await this.fetchMany(hakuehdot);
        return this.filterDishesAway(ruokaTiedot);
    }

    private async fetchMany(keyword: string): Promise<Ingredient[]> {
        if (this.fakeData) {
            return testIngredientAPIdata;
        }
        const fetchApi = this.osoite + keyword;
        try {
            log.debug(`Fetching FineliAPI: ${fetchApi}`);
            const response = await fetch(fetchApi);
            log.debug(`response: status: ${response.status} `);
            if (response.status !== 200) {
                throw new Error(`status ${response.status}, body: ${await response.text()}`);
            }
            const json = await response.json();
            const salted: Ingredient[] = this.muutaSuolat(json);
            let ingredients: Ingredient[] = [];
            salted.forEach((ruokatieto) => {
                ingredients.push(ruokatieto);
            });
            log.debug(`Found ${ingredients.length} ingredients.`);
            return ingredients;
        } catch (error: any) {
            log.error(`Error retrieving data from fineli: ${error}`);
            return [] as Ingredient [];
        }
    }

    muutaSuola(tieto: Ingredient) {
        return { ...tieto, salt: tieto.salt / 100 };
    }

    muutaSuolat(tiedot: Ingredient[]) {
        const uudetTiedot: Ingredient[] = [];
        tiedot.forEach((tieto) => {
            uudetTiedot.push({ ...tieto, salt: tieto.salt / 100 });
        });
        return uudetTiedot;
    }
}
export default Fineli;
