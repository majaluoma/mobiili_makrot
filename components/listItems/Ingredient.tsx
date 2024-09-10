import { Pressable, View, Text, StyleSheet } from "react-native";
import { FinavianRuokaTiedot } from "../../types/Interfaces";

export default function Item({ ingredient, callback }: { ingredient: FinavianRuokaTiedot, callback : (ingredient : FinavianRuokaTiedot) => void }) {

    

    return (
        <Pressable onPress={() => callback(ingredient)}>
            <View>
                <Text style={styles.searchResultHeader}>{ingredient.name.fi}</Text>
                <Text style={styles.searchResultText}>{ingredient.description.fi}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    searchResultHeader: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    searchResultText: {
        marginLeft: 10,
        fontSize: 12,
        marginTop: 5,
        fontWeight: "normal",
    },
});
