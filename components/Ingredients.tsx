import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Pressable,
    FlatList,
} from "react-native";
import { z } from "zod";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FineliPalvelu from "../services/FineliPalvelu";
import { FinavianRuokaTiedot } from "../types/Interfaces";
import log from "../services/log";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Entypo from "@expo/vector-icons/Entypo";
import { RootStackParamList } from "../types/ReactTypes";


const numberSchema = z.number();

type IngredientAmount  = {
    ingredient : string;
    amount : number;
}
type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Ingredients'>
export default function Ingredients(props : SearchScreenProps) {
    const baseIngredient : IngredientAmount = {
        ingredient: "peruna",
        amount : 0
    }
    const [ingredients, setIngredients] = useState([baseIngredient]);

    const [keyword, setKeyword] = useState("");
    const [APIingredients, setAPIingredients] = useState([] as FinavianRuokaTiedot []);

    const changeAmount = (input: NativeSyntheticEvent<TextInputChangeEventData>, i: number) => {
        const data = input.nativeEvent.text;
        try {
            let verifiedNumber = numberSchema.parse(Number.parseInt(data));
            let newIngredients  = [...ingredients];
            newIngredients[i].amount = verifiedNumber;
            setIngredients(newIngredients);
        } catch (e: unknown) {
            let newIngredients  = [...ingredients];
            newIngredients[i].amount = 0;
            setIngredients(newIngredients);
            console.log("not verified")
        }
    };

    const fetchIngredients = async  (keyword  : string)=> {
        const fineliPalvelu = new FineliPalvelu();
        const ingredients = await fineliPalvelu.keywordFetch(keyword);
        log.debug(ingredients.length)
        setAPIingredients(ingredients)
    }

    const openSearchBar = (i)=>  {
        props.navigation.push("SearchBar", { callback: changeIngredient });
    }

    const changeIngredient = (ingredient: FinavianRuokaTiedot, i: number) => {
        const data = input.nativeEvent.text;
        let newIngredients  = [...ingredients];
        newIngredients[i].ingredient = data;
        setIngredients(newIngredients);
    };

    const addIngredient = ()=> {
        let newIngredients = [...ingredients];
        newIngredients.push({ingredient: "", amount: 0});
        setIngredients(newIngredients);
    }

    const removeThisIngredient = (index : number)=>{
        let newIngredients = []
        for (let i = 0; i < ingredients.length; i++) {
            if (index !== i) {
                const ingredient = ingredients[i];
                newIngredients.push(ingredient)
            }
        }
        setIngredients(newIngredients);
    }

    const calculateWeight = () => {
        let total : number = 0;
        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            total += ingredient.amount;
        }
        return total;
    } 

    const ingredientFields = () => {
        return (
            <View>
                {ingredients.map((ingredient, i) => {
                    return (
                        <View key={i} style={styles.row}>
                            <Pressable 
                            onPress={()=> openSearchBar(i)}>
                            <View
                                style={styles.input}
                            ></View>
                            </Pressable>
                            <TextInput
                                id={"amount_"+i.toString()}
                                value={ingredient.amount.toString()}
                                style={styles.input}
                                onChange={(e) => changeAmount(e, i)}
                                keyboardType="numeric"
                            ></TextInput>
                            <Pressable onPress={()=> removeThisIngredient(i)}>
                            <FontAwesome name="remove" size={24} color="black" />
                            </Pressable>
                            <FlatList
                            data={APIingredients}
                            renderItem={({item})=> <Item ingredient = {item}></Item>}>
                            </FlatList>
                        </View>
                    );
                })}
            </View>
        );
    };
    
    const Item = ({ingredient} : {ingredient: FinavianRuokaTiedot}) => (
        <View >
          <Text  >{ingredient.name.fi}</Text>
        </View>
      );

    return (
        <View style={styles.container}>
            <Text>Add ingredients and weight of each</Text>
            {ingredientFields()}
            <Button onPress={addIngredient} title="+"></Button>
            <Text>Total weight: {calculateWeight()}</Text>
            <Text>Total kilocalories:</Text>
            <Text>Total portions:</Text>
            <StatusBar style="auto" />
            <Pressable onPress={()=> props.navigation.push("Macros")}>
            <Entypo name="home" size={24} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom:70,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    input: {
        height: 30,
        marginRight:10,
        marginLeft:10,
        paddingLeft:10,
        width: 100,
        borderWidth: 2,
        borderBlockColor: "black",
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
