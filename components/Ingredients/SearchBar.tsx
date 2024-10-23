import { useState } from "react";
import {
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    FlatList,
} from "react-native";
import { z } from "zod";
import { Ingredient } from "../../types/Interfaces";
import log from "../../services/log";
import IngredientResult from "./IngredientResult";
import { Dialog, Portal, TextInput } from "react-native-paper";
import { fetchMany } from "../../services/Fineli";

const stringSchema = z.string();

export default function SearchBar({ callback }: { callback: (ingredient: Ingredient) => void }) {
    const [visible, setVisible] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [APIingredients, setAPIingredients] = useState([] as Ingredient[]);

    const fetchIngredients = async (keyword: string) => {
        const ingredients = await fetchMany(keyword);
        setAPIingredients(ingredients);
        log.debug("ok");
    };

    const changeKeyword = (input: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const data = input.nativeEvent.text;
        stringSchema.parse(data);
        setKeyword(data);
        fetchIngredients(data);
    };

    const closeDialog = () => {
        setVisible(false);
    };

    const save = (ingredient: Ingredient) => {
        callback(ingredient);
        setVisible(false);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={closeDialog} style={styles.dialogWindow}>
                <Dialog.Title>Search</Dialog.Title>
                    <TextInput
                        value={keyword}
                        style={styles.searchBar}
                        onChange={(e) => changeKeyword(e)}
                        keyboardType="default"
                    ></TextInput>
                <Dialog.Content>
                        <FlatList
                            data={APIingredients}
                            renderItem={({ item }) => (
                                <IngredientResult
                                    ingredient={item}
                                    callback={save}
                                ></IngredientResult>
                            )}
                        ></FlatList>
                    </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
   
    dialogWindow: {
        marginTop: 100,
        marginBottom: 200,
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
