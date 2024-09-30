import { Macro } from "../types/Interfaces";
import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Macroservice from "../services/Macroservice";
type MacroCardProps = {
    macro: Macro | undefined;
    editMacro: (macro: Macro) => void;
};

export default function MacroCard({ macro, editMacro }: MacroCardProps) {
    const newMacro = () => {
        let newMacro: Macro = {
            macroKey: "",
            nickname: "",
            dishes: 0,
            inUse: 0,
            sugar: 0,
            salt: 0,
            energyKcal: 0,
            fat: 0,
            protein: 0,
            carbohydrate: 0,
            fiber: 0,
            saturatedFat: 0,
        };
        editMacro(newMacro);
    };

    if (macro) {
        return (
            <Pressable>
                <View style={styles.MacroCard}>
                    <Text>{macro.nickname}</Text>
                    <Text>Kcal: {macro.energyKcal}</Text>
                    <Text>Dishes: {macro.dishes}</Text>
                    <Pressable onPress={() => editMacro(macro)}>
                        <Text>Click to edit</Text>
                    </Pressable>
                </View>
            </Pressable>
        );
    } else {
        return (
            <Pressable>
                <View style={styles.MacroCard}>
                    <Text>Add new macro</Text>
                    <Pressable onPress={newMacro}>
                        <Entypo name="plus" size={60} color="black"></Entypo>
                    </Pressable>
                </View>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    MacroCard: {
        width: 130,
        height: 130,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
    },
});
