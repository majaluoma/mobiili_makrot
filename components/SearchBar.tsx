import { useState } from "react";
import {
    View,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Pressable,
    FlatList,
    Dimensions,
} from "react-native";
import { z } from "zod";

import FineliPalvelu from "../services/FineliPalvelu";
import { Ingredient } from "../types/Interfaces";
import log from "../services/log";
import IngredientResult from "./listItems/IngredientResult";
import { TextInput } from "react-native-paper";

const stringSchema = z.string();

export default function SearchBar({closeView, callback} : {closeView : ()=> void, callback : (ingredient : Ingredient)=> void})  {

    const [keyword, setKeyword] = useState("");
    const [APIingredients, setAPIingredients] = useState([] as Ingredient[]);

    const fetchIngredients = async (keyword: string) => {
        const fineliPalvelu = new FineliPalvelu();
        const ingredients = await fineliPalvelu.keywordFetch(keyword);
        log.debug(ingredients.length);
        setAPIingredients(ingredients);
    };

    const changeKeyword = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const data = input.nativeEvent.text;
        stringSchema.parse(data);
        setKeyword(data);
        fetchIngredients(data);
    };

    return (
        <View>
            <Pressable onPress={closeView}><View style={styles.overlayBackground}></View></Pressable>
            <View style={styles.overlayView}>
                <TextInput
                    value={keyword}
                    style={styles.searchBar}
                    onChange={(e) => changeKeyword(e)}
                    keyboardType="default"
                ></TextInput>
                <FlatList
                    data={APIingredients}
                    renderItem={({ item }) => (
                        <IngredientResult ingredient={item} callback={callback}></IngredientResult>
                    )}
                ></FlatList>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    overlayView: {
        backgroundColor: "white",
        position: "absolute",
        top: 40,
        bottom: 150,
        right: 40,
        left: 40,
        opacity: 1,
        alignItems: "center",
    },

    // MIKS EI VOI LAITTAA STRINGEJÄÅ WIDTHIIS ESIM 1EM tai 100VW
    overlayBackground: {
        width: width,
        height: height,
        position: "static",
        backgroundColor: "black",
        opacity: 0.5,
    },
    searchBar: {
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
        marginTop: 30,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
    },
});
