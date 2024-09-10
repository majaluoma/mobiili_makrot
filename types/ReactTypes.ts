import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { FinavianRuokaTiedot } from "./Interfaces";

export type RootStackParamList = {
    Ingredients: undefined;
    SearchBar: { callback: (input: FinavianRuokaTiedot, i: number) => void };
    Macros : undefined
  }