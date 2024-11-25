import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Pressable,
    FlatList,
} from "react-native";
import { z } from "zod";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Ingredient } from "../../types/Interfaces";
import SearchBar from "./SearchBar";
import MacroPortionList from "./MacroPortionList";
import { Button, Card, TextInput } from "react-native-paper";
import { styles } from "../../styles/mainStyles";
import { mainTheme } from "../../styles/mainTheme";

const numberSchema = z.number();

type IngredientAmount = {
    ingredient: Ingredient | null;
    amount: number;
};

/** Main page for ingredients page. Shows ingredients, allows searching them and
 * makes it possible to see distributed portions per macros
 *  
 * */
export default function Ingredients() {
    const [ingredients, setIngredients] = useState([{
        ingredient: null,
        amount: 0,
    } as IngredientAmount]);
    const [ApiIngredients, setApiIngredients] = useState([] as Ingredient[]);
    const [searchBarToggled, setSearchBarToggled] = useState(false);
    const [ingredientRow, setIngredientRow] = useState(0);
    const [kcal, setKcal] = useState(0);
    const [grams, setGrams] = useState(0)
    const [surplus, setSurplus] = useState(0)



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

    useEffect (()=> {
        console.log("Calculate");
        calculateKcal();
        calculateWeight();
    }, [ingredients])

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
        setGrams(Math.floor(total))
    };

    const calculateKcal = () => {
        let total: number = 0;
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            if (ingredient.ingredient !== null) {
                total += (ingredient.ingredient?.energyKcal * ingredient.amount) / 100;
            }
        }
        setKcal(Math.floor(total))
    };

    const toggleSearchBar = () => {
        console.debug("openSearchBar");
        if (searchBarToggled) {
            setSearchBarToggled(false);
        } else {
            setSearchBarToggled(true);
        }
    };

    const searchDialog = () => {
        if (searchBarToggled === true) {
            console.debug("openSearchBar");
            return <SearchBar callback={ingredientChosen}></SearchBar>;
        }
    };

    const ingredientChosen = (ingredient?: Ingredient) => {
        console.debug("ingredientChosen");
        if (!ingredient) {
            toggleSearchBar();
            return;
        } 
        const data = ingredient;
        let newIngredients = [...ingredients];
        newIngredients[ingredientRow].ingredient = data;
        setIngredients(newIngredients);
        toggleSearchBar();
        console.log(data + " " + ingredientRow);
    };

    const ingredientFields = () => {
        return (
            <Card style={styles(mainTheme).contentCard}>
                <Text>Add ingredients and weight of each (kg)</Text>
                {ingredients.map((ingredient, i) => {
                    return (
                        <View key={i} style={styles(mainTheme).row}>
                            <Pressable
                                onPress={() => {
                                    toggleSearchBar();
                                    setIngredientRow(i);
                                }}
                            >
                                <TextInput style={[styles(mainTheme).inputFieldWithdialog]}>
                                    <Text>
                                        {ingredient.ingredient !== null
                                            ? ingredient.ingredient.name.fi
                                            : ""}
                                    </Text>
                                </TextInput>
                            </Pressable>
                            <TextInput
                                id={"amount_" + i.toString()}
                                value={ingredient.amount.toString()}
                                style={styles(mainTheme).inputFieldSmall}
                                onChange={(e) => changeAmount(e, i)}
                                keyboardType="numeric"
                            ></TextInput>
                            <Pressable onPress={() => removeThisIngredient(i)}>
                                <FontAwesome name="remove" size={24} color={"black"} />
                            </Pressable>
                            <FlatList
                                data={ApiIngredients}
                                renderItem={({ item }) => <Item ingredient={item}></Item>}
                            ></FlatList>
                        </View>
                    );
                })}
                <Button onPress={addIngredient}>Add ingredient</Button>
                <View>
                <Text>Total kg: {grams}</Text>
                <Text>Total kcal: {kcal}</Text>
                </View>
            </Card>
        );
    };

    const Item = ({ ingredient }: { ingredient: Ingredient }) => (
        <View>
            <Text>{ingredient.name.en}</Text>
        </View>
    );

    const updateSurplus = (surplus : number) => {
        setSurplus(Math.floor(surplus/kcal * grams));
    }

    return (
        <View style={styles(mainTheme).mainContainer}>
            {searchDialog()}
            <View style={styles(mainTheme).baseContainer}>
                {ingredientFields()}
                <Card style={styles(mainTheme).contentCard}>
                    <View style={styles(mainTheme).bottomInfo}>
                        <Text style={styles(mainTheme).infoText}>Even distribution of portions below. You can click a Macro to change it's specific portions</Text>
                        <View>
                        </View>
                        <MacroPortionList grams= {grams} kcal={kcal} updateSurplus={updateSurplus}></MacroPortionList>
                        <Text>Surplus after distributing: {surplus} g</Text>
                        <StatusBar style="auto" />
                    </View>
                </Card>
            </View>
        </View>
    );
}
