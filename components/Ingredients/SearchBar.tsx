import { useState } from "react";
import {
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    FlatList,
    View,
} from "react-native";
import { z } from "zod";
import { Ingredient } from "../../types/Interfaces";
import log from "../../services/log";
import IngredientResult from "./IngredientResult";
import { Card, Dialog, Portal, TextInput } from "react-native-paper";
import { fetchMany } from "../../services/Fineli";
import { styles } from "../../styles/mainStyles";
import { mainTheme } from "../../styles/mainTheme";

const stringSchema = z.string();

export default function SearchBar({ callback }: { callback: (ingredient?: Ingredient) => void }) {
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
        if (data.length>2) {
            fetchIngredients(data);
        }
    };

    const closeDialog = () => {
        callback(undefined);
        setVisible(false);
    };

    const save = (ingredient: Ingredient) => {
        callback(ingredient);
        setVisible(false);
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={closeDialog} style={[styles(mainTheme).dialogWindowAlwaysFull, styles(mainTheme).dialogWindowMainContainer]}>
                <Dialog.Title>Search ingredient</Dialog.Title>
                <Card style={styles(mainTheme).contentCard}>
                    <TextInput
                        value={keyword}
                        style={styles(mainTheme).searchBar}
                        onChange={(e) => changeKeyword(e)}
                        keyboardType="default"
                    ></TextInput>
                </Card>
                <Dialog.ScrollArea>
                    <Card style={[styles(mainTheme).contentCard]}>
                        <FlatList
                            data={APIingredients}
                            renderItem={({ item }) => (
                                <IngredientResult
                                    ingredient={item}
                                    callback={save}
                                ></IngredientResult>
                            )}
                        ></FlatList>
                    </Card>
                </Dialog.ScrollArea>
            </Dialog>
        </Portal>
    );
}
