import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Pressable,
    FlatList,
} from "react-native";
import { z } from "zod";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FineliPalvelu from "../services/FineliPalvelu";
import { Ingredient, Macro } from "../types/Interfaces";
import log from "../services/log";
import SearchBar from "./SearchBar";
import Entypo from "@expo/vector-icons/Entypo";
import { useKeepAwake, activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { TestIngredientAPIdata } from "../types/TestData";
import MacroPortionList from "./MacroPortionList";
import Macroservice from "../services/Macroservice";
import { Button, TextInput } from "react-native-paper";

const numberSchema = z.number();

type IngredientAmount = {
    ingredient: Ingredient | null;
    amount: number;
};
export default function Ingredients() {
    const baseIngredient: IngredientAmount = {
        ingredient: TestIngredientAPIdata[0],
        amount: 0,
    };
    const [ingredients, setIngredients] = useState([baseIngredient]);
    const [keepAwakeColor, setKeepAwakeColor] = useState<"black" | "green">("black");
    const [keyword, setKeyword] = useState("");
    const [APIingredients, setAPIingredients] = useState([] as Ingredient[]);
    const [searchBarToggled, setSearchBarToggled] = useState(false);
    const [ingredientRow, setIngredientRow] = useState(0);
    const [macrosInUse, setMacrosInUse] = useState<Macro[]>([]);
    const changeAmount = (input: NativeSyntheticEvent<TextInputChangeEventData>, i: number) => {
        const data = input.nativeEvent.text;
        try {
            let verifiedNumber = numberSchema.parse(Number.parseInt(data));
            let newIngredients = [...ingredients];
            newIngredients[i].amount = verifiedNumber;
            setIngredients(newIngredients);
        } catch (e: unknown) {
            let newIngredients = [...ingredients];
            newIngredients[i].amount = 0;
            setIngredients(newIngredients);
            console.log("not verified");
        }
    };

    useEffect(() => {
        fetchMacros();
    }, []);

    const fetchMacros = async () => {
        console.log("fetchMacros");
        let macroService = new Macroservice();
        setMacrosInUse(await macroService.fetchMacrosInUse());
    };

    const fetchIngredients = async (keyword: string) => {
        const fineliPalvelu = new FineliPalvelu();
        const ingredients = await fineliPalvelu.keywordFetch(keyword);
        log.debug(ingredients.length);
        setAPIingredients(ingredients);
    };

    const changeIngredient = (ingredient: IngredientAmount, i: number) => {
        const data = ingredient.ingredient;
        let newIngredients = [...ingredients];
        newIngredients[i].ingredient = data;
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        let newIngredients = [...ingredients];
        newIngredients.push({ ingredient: null, amount: 0 });
        setIngredients(newIngredients);
    };

    const removeThisIngredient = (index: number) => {
        let newIngredients = [];
        for (let i = 0; i < ingredients.length; i++) {
            if (index !== i) {
                const ingredient = ingredients[i];
                newIngredients.push(ingredient);
            }
        }
        setIngredients(newIngredients);
    };

    const calculateWeight = () => {
        let total: number = 0;
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            total += ingredient.amount;
        }
        return total;
    };

    const calculateKcal = () => {
        let total: number = 0;
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            if (ingredient.ingredient !== null) {
                total += (ingredient.ingredient?.energyKcal * ingredient.amount) / 100;
            }
        }
        return total;
    };

    const toggleSearchBar = () => {
        if (searchBarToggled) {
            setSearchBarToggled(false);
        } else {
            setSearchBarToggled(true);
        }
    };

    const ingredientChosen = (ingredient: Ingredient) => {
        const data = ingredient;
        let newIngredients = [...ingredients];
        newIngredients[ingredientRow].ingredient = data;
        setIngredients(newIngredients);
        toggleSearchBar();
        console.log(data + " " + ingredientRow);
    };

    const searchBarIfToggled = () => {
        if (searchBarToggled) {
            return (
                <View style={styles.overlayContainer}>
                    <SearchBar closeView={toggleSearchBar} callback={ingredientChosen}></SearchBar>
                </View>
            );
        }
    };

    const ingredientFields = () => {
        return (
            <View style={styles.ingredientsList}>
                <Text>Add ingredients and weight of each</Text>
                {ingredients.map((ingredient, i) => {
                    return (
                        <View key={i} style={styles.row}>
                            <Pressable
                                onPress={() => {
                                    toggleSearchBar();
                                    setIngredientRow(i);
                                }}
                            >
                                <TextInput style={[styles.input, styles.ingredientInput]}>
                                    <Text>
                                        {ingredient.ingredient !== null
                                            ? ingredient.ingredient.name.en
                                            : ""}
                                    </Text>
                                </TextInput>
                            </Pressable>
                            <TextInput
                                id={"amount_" + i.toString()}
                                value={ingredient.amount.toString()}
                                style={styles.input}
                                onChange={(e) => changeAmount(e, i)}
                                keyboardType="numeric"
                            ></TextInput>
                            <Pressable onPress={() => removeThisIngredient(i)}>
                                <FontAwesome name="remove" size={24} color={"black"} />
                            </Pressable>
                            <FlatList
                                data={APIingredients}
                                renderItem={({ item }) => <Item ingredient={item}></Item>}
                            ></FlatList>
                        </View>
                    );
                })}
            </View>
        );
    };

    const keepOpen = () => {
        console.debug("keepOpen");
        if (keepAwakeColor === "black") {
            setKeepAwakeColor("green");
            activateKeepAwakeAsync();
        } else {
            deactivateKeepAwake();
            setKeepAwakeColor("black");
        }
    };

    const Item = ({ ingredient }: { ingredient: Ingredient }) => (
        <View>
            <Text>{ingredient.name.en}</Text>
        </View>
    );

    return (
        <View style={styles.mainContainer}>
            {searchBarIfToggled()}
            <Pressable style={styles.eyeIcon} onPress={keepOpen}>
                <Entypo name="eye" size={50} color={keepAwakeColor}></Entypo>
            </Pressable>
            <View style={styles.baseContainer}>
                {ingredientFields()}
                <Button onPress={addIngredient}>Add ingredient</Button>
                <View style={styles.bottomInfo}>
                    <Text>Total kg: {calculateWeight()}</Text>
                    <Text>Total kcal: {calculateKcal()}</Text>
                    <Text>Total portions:</Text>
                    <MacroPortionList macros={macrosInUse}></MacroPortionList>
                    <StatusBar style="auto" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: "absolute",
        pointerEvents: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    bottomInfo: {
        alignItems: "center",
        position: "absolute",
        bottom: 2,
    },
    eyeIcon: {
        position: "absolute",
        top: -10,
        right: 10,
        zIndex: 200000,
    },
    ingredientsList: {
        marginTop: 20,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        gap: 10,
    },
    baseContainer: {
        top: 10,
        position: "relative",
        pointerEvents: "auto",
        zIndex: -1,
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    mainContainer: {
        position: "relative",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: 800,
    },
    row: {
        flexDirection: "row",

        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    input: {
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
        width: 100,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    ingredientInput: {
        pointerEvents: "none",
    },
});
