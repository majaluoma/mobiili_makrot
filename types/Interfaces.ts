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
    amount : number
}

export interface Macro extends MacroInterface {
    macroKey: string;
    nickname: string;
    dishes : number
    inUse : 0| 1
    
}

export interface ReseptiMakro extends MacroInterface {
    reseptiId: number;
}

export interface Suunnitelma {
    resepti : Resepti;
    annoksia : number
    makrot : Map<number, number>
}

interface MacroInterface {
    sugar : number;
    salt : number;
    energyKcal : number;
    fat : number;
    protein : number;
    carbohydrate : number;
    fiber : number;
    saturatedFat : number;

}

// Seuraava rajapinta mukailee Finavian tietoja
export interface FinavianMakrot extends MacroInterface {
    energy : number;
    alcohol : number;
    organicAcids : number;
    sugarAlcohol : number;
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
type SpecialDiet = "SOYAFREE" |"UNSWEET" |"MILKFREE" |"LACSFREE" |"SALTFREE" |"LACVEGE" |"VEGAN" |"GLUTFREE" |"LACOVEGE" |"EGGFREE";