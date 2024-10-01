import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ingredient } from "../../types/Interfaces";

export default function IngredientResult({ ingredient, callback }: { ingredient: Ingredient, callback : (ingredient : Ingredient) => void }) {

    

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
