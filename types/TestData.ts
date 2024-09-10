import { FinavianRuokaTiedot, Makro, Resepti } from "./Interfaces";

const reseptit: Resepti[] = [
    {
      reseptiId: 1,
      resepti: "Spaghetti Bolognese",
      tyyppi: {
        reseptiTyyppiId: 101,
        reseptiTyyppi: "Main Course",
      },
      ruokaAineet: [
        { ruokaAineId: 1, ruokaAineMaaraId: 11, maara: 150 },
        { ruokaAineId: 2, ruokaAineMaaraId: 12, maara: 100 },
      ],
    },
    {
      reseptiId: 2,
      resepti: "Vegetable Soup",
      tyyppi: {
        reseptiTyyppiId: 102,
        reseptiTyyppi: "Appetizer",
      },
      ruokaAineet: [
        { ruokaAineId: 3, ruokaAineMaaraId: 13, maara: 200 },
        { ruokaAineId: 4, ruokaAineMaaraId: 14, maara: 50 },
      ],
    },
  ];


// Test Data for Makro
const makrot: Makro[] = [
    {
      makroId: 1,
      nimimerkki: "JohnDoe",
      aterioita: 3,
      laskennassa: 1,
      sokerit: 30,
      suolat: 5,
      energiaKcal: 450,
      rasvat: 20,
      proteiinit: 30,
      hiilihydraatit: 50,
      kuidut: 10,
      tyydyttyneetRasvat: 8,
    },
    {
      makroId: 2,
      nimimerkki: "JaneDoe",
      aterioita: 2,
      laskennassa: 0,
      sokerit: 20,
      suolat: 3,
      energiaKcal: 300,
      rasvat: 15,
      proteiinit: 20,
      hiilihydraatit: 40,
      kuidut: 12,
      tyydyttyneetRasvat: 6,
    },
  ];
  

// Test Data for FinavianRuokaTiedot
const TestIngredientAPIdata: FinavianRuokaTiedot[] = [
    {
      id: 101,
      code: "R101",
      description: { fi: "Kuvaus suomeksi", en: "Description in English", sv: "Beskrivning på svenska" },
      abbreviation: { fi: "Lyhenne", en: "Abbreviation", sv: "Förkortning" },
      type: {
        code: "T1",
        description: { fi: "Tyyppi 1", en: "Type 1", sv: "Typ 1" },
        abbreviation: { fi: "T1", en: "T1", sv: "T1" },
      },
      name: { fi: "Peruna", en: "Potato", sv: "Potatis", la: "Perunatus potatus" },
      preparationMethod: [
        {
          code: "P1",
          description: { fi: "Valmistustapa 1", en: "Preparation 1", sv: "Förberedelse 1" },
          abbreviation: { fi: "P1", en: "P1", sv: "P1" },
        },
      ],
      ediblePortion: 80,
      specialDiets: ["VEGAN", "GLUTFREE"],
      themes: ["Health", "Sustainability"],
      units: [
        { fi: "Grammat", en: "Grams", sv: "Gram", mass: 100 },
      ],
      ingredientClass: {
        code: "I1",
        description: { fi: "Ainesosa 1", en: "Ingredient 1", sv: "Ingrediens 1" },
        abbreviation: { fi: "A1", en: "I1", sv: "I1" },
      },
      functionClass: {
        code: "F1",
        description: { fi: "Funktioluokka 1", en: "Function Class 1", sv: "Funktionsklass 1" },
        abbreviation: { fi: "F1", en: "F1", sv: "F1" },
      },
      sugar: 5,
      salt: 1,
      energyKcal: 250,
      energy: 1045,
      fat: 15,
      protein: 10,
      carbohydrate: 30,
      alcohol: 0,
      organicAcids: 0,
      sugarAlcohol: 0,
      fiber: 5,
      saturatedFat: 3,
    },
    {
      id: 102,
      code: "R102",
      description: { fi: "Toinen kuvaus", en: "Second description", sv: "Andra beskrivningen" },
      abbreviation: { fi: "L1", en: "A1", sv: "B1" },
      type: {
        code: "T2",
        description: { fi: "Tyyppi 2", en: "Type 2", sv: "Typ 2" },
        abbreviation: { fi: "T2", en: "T2", sv: "T2" },
      },
      name: { fi: "Maito", en: "Milk", sv: "Mjölk", la: "MOO MOO" },
      preparationMethod: [
        {
          code: "P2",
          description: { fi: "Toinen valmistustapa", en: "Second preparation method", sv: "Andra förberedelsen" },
          abbreviation: { fi: "P2", en: "P2", sv: "P2" },
        },
      ],
      ediblePortion: 90,
      specialDiets: ["MILKFREE", "SOYAFREE"],
      themes: ["Organic", "Low Fat"],
      units: [
        { fi: "Milliliters", en: "Milliliters", sv: "Milliliter", mass: 150 },
      ],
      ingredientClass: {
        code: "I2",
        description: { fi: "Ainesosa 2", en: "Ingredient 2", sv: "Ingrediens 2" },
        abbreviation: { fi: "A2", en: "I2", sv: "I2" },
      },
      functionClass: {
        code: "F2",
        description: { fi: "Funktioluokka 2", en: "Function Class 2", sv: "Funktionsklass 2" },
        abbreviation: { fi: "F2", en: "F2", sv: "F2" },
      },
      sugar: 7,
      salt: 2,
      energyKcal: 300,
      energy: 1255,
      fat: 10,
      protein: 15,
      carbohydrate: 35,
      alcohol: 0,
      organicAcids: 0,
      sugarAlcohol: 0,
      fiber: 7,
      saturatedFat: 4,
    },
  ];
  
  export { reseptit, makrot, TestIngredientAPIdata };