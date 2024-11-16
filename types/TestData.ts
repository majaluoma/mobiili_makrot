import { Ingredient, Macro } from "./Interfaces";



// Test Data for Makro
const makrot: Macro[] = [
    {
      macroKey: "1",
      nickname: "JohnDoe",
      dishesPerDay: 3,
      inUse: true,
      profileImage: "",
      sugar: 30,
      salt: 5,
      energyKcal: 450,
      fat: 20,
      protein: 30,
      carbohydrate: 50,
      fiber: 10,
      saturatedFat: 8,
    },
    {
      macroKey: "2",
      nickname: "JaneDoe",
      dishesPerDay: 2,
      inUse: true,
      profileImage: "",
      sugar: 20,
      salt: 3,
      energyKcal: 300,
      fat: 15,
      protein: 20,
      carbohydrate: 40,
      fiber: 12,
      saturatedFat: 6,
    },
  ];
  

// Test Data for FinavianRuokaTiedot
const TestIngredientAPIdata: Ingredient[] = [
    {
      id: -1,
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
      id: -2,
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
  
  export { makrot, TestIngredientAPIdata };