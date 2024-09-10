interface MakrojaFinaviaVastaavuus {
    finavia: keyof FinavianMakrot;
    makro: keyof MakroInterface;
}

export const vastaavuudet: MakrojaFinaviaVastaavuus[] = [
    { finavia: "energyKcal", makro: "energiaKcal" },
    { finavia: "fat", makro: "rasvat" },
    { finavia: "fiber", makro: "kuidut" },
    { finavia: "protein", makro: "proteiinit" },
    { finavia: "carbohydrate", makro: "hiilihydraatit" },
    { finavia: "salt", makro: "suolat" },
    { finavia: "saturatedFat", makro: "tyydyttyneetRasvat" },
];

export interface Resepti {
    reseptiId : number
    resepti : string
    tyyppi : ReseptiTyyppi
    ruokaAineet : RuokaAineMaara []
}

export type ReseptiTyyppi = {
    reseptiTyyppiId : number;
    reseptiTyyppi : string;
}

export interface RuokaAineMaara {
    ruokaAineId : number
    ruokaAineMaaraId : number
    maara : number
}

export interface Makro extends MakroInterface {
    makroId: number;
    nimimerkki: string;
    aterioita : number
    laskennassa : 0| 1
    
}

export interface MakroInterface {
    sokerit : number;
    suolat : number;
    energiaKcal : number;
    rasvat : number;
    proteiinit : number;
    hiilihydraatit : number;
    kuidut : number;
    tyydyttyneetRasvat : number;
}

export interface ReseptiMakro extends MakroInterface {
    reseptiId: number;
}

export interface Suunnitelma {
    resepti : Resepti;
    annoksia : number
    makrot : Map<number, number>
}
// Seuraava rajapinta mukailee Finavian tietoja
export interface FinavianMakrot {
    sugar : number;
    salt : number;
    energyKcal : number;
    energy : number;
    fat : number;
    protein : number;
    carbohydrate : number;
    alcohol : number;
    organicAcids : number;
    sugarAlcohol : number;
    fiber : number;
    saturatedFat : number;
} 

// Seuraava rajapinta mukailee Finavian tietoja
export interface FinavianRuokaTiedot extends FinaviaBasicDataStructure, FinavianMakrot {
    id:number,
    type: Type
    name : Name
    preparationMethod : PreparationMethod [];
    ediblePortion : number;
    specialDiets : SpecialDiet [];
    themes: string [];
    units : Units[];
    ingredientClass : IngredientClass
    functionClass : FunctionClass
} 

//Luotu kaksi apuluokkaa toistuvien tietoraknteiden esittämiseen.
interface FinaviaBasicDataStructure {
    code: string
    description : Description
    abbreviation : Abbreviation
}

//Luotu kaksi apuluokkaa toistuvien tietoraknteiden esittämiseen.
interface FinaviaTextDataStructure {
    fi: string
    en : string
    sv : string
}

interface Type extends FinaviaBasicDataStructure {}

interface FunctionClass extends FinaviaBasicDataStructure {}

interface Units extends FinaviaTextDataStructure {
    mass : number
}

interface IngredientClass extends FinaviaBasicDataStructure {}

interface Description extends FinaviaTextDataStructure {}

interface Abbreviation extends FinaviaTextDataStructure{}

interface Name  extends FinaviaTextDataStructure{
    la : string
}

interface PreparationMethod extends FinaviaBasicDataStructure{
    code : string
    description: Description
    abbreviation : Abbreviation
}

//Luotu tyypitys finavian dietteihin.
type SpecialDiet = "SOYAFREE" |"UNSWEET" |"MILKFREE" |"LACSFREE" |"SALTFREE" |"LACVEGE" |"VEGAN" |"GLUTFREE" |"LACOVEGE" |"EGGFREE"