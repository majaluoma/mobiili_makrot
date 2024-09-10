import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Pressable,
    FlatList,
} from "react-native";
import { z } from "zod";

import FineliPalvelu from "../services/FineliPalvelu";
import { FinavianRuokaTiedot } from "../types/Interfaces";
import log from "../services/log";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/ReactTypes";


type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'SearchBar'>

const stringSchema = z.string();

export default function SearchBar(props : SearchScreenProps) {
    const [keyword, setKeyword] = useState("");
    const [APIingredients, setAPIingredients] = useState([] as FinavianRuokaTiedot[]);

    const fetchIngredients = async (keyword: string) => {
        const fineliPalvelu = new FineliPalvelu();
        const ingredients = await fineliPalvelu.keywordFetch(keyword);
        log.debug(ingredients.length);
        setAPIingredients(ingredients);
    };

    const changeKeyword = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const  data = input.nativeEvent.text
        stringSchema.parse(data)
        setKeyword(data);
        fetchIngredients(data);
    };

    const IngredientChosen = () => {
        props.route.callback("")
        props.navigation.pop();

    }

    const Item = ({ ingredient }: { ingredient: FinavianRuokaTiedot }) => (
        <Pressable onPress={()=>IngredientChosen()}>
            <View>
            <Text style={styles.searchResultHeader}>{ingredient.name.fi}</Text>
            <Text style={styles.searchResultText}>{ingredient.description.fi}</Text>
            </View>
        </Pressable>
    );

    return (
        <View>
            <TextInput
                value={keyword}
                style={styles.searchBar}
                onChange={(e) => changeKeyword(e)}
                keyboardType="default"
            ></TextInput>
            <FlatList
                data={APIingredients}
                renderItem={({ item }) => <Item ingredient={item}></Item>}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
        marginTop:  30,
        width: 360,
        borderWidth: 2,
        borderBlockColor: "black",
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    searchResultHeader: {
        marginLeft:10,
        marginTop:10,
        fontSize:20,
        fontWeight:"bold"
    },
    searchResultText: {
        marginLeft:10,
        fontSize:12,
        marginTop:5,
        fontWeight:"normal"
    },
});
