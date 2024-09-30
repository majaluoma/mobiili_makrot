import { DatabaseProcedure, Macro } from "../types/Interfaces";
import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
type MacroCardProps = {
    macro: Macro | undefined;
    editMacro: (macro: Macro, procedure: DatabaseProcedure) => void;
};

export default function MacroCard({ macro, editMacro }: MacroCardProps) {
    const newMacro = () => {
        let newMacro: Macro = {
            macroKey: "",
            nickname: "",
            dishes: 0,
            inUse: true,
            sugar: 0,
            salt: 0,
            energyKcal: 0,
            fat: 0,
            protein: 0,
            carbohydrate: 0,
            fiber: 0,
            saturatedFat: 0,
        };
        editMacro(newMacro, "add");
    };

    if (macro) {
        return (
            <Pressable>
                <View style={styles.MacroCard}>
                    <Text>{macro.nickname}</Text>
                    <Text>Kcal: {macro.energyKcal}</Text>
                    <Text>Dishes: {macro.dishes}</Text>
                    <View style={styles.MacroButtons}>
                    <Pressable onPress={() => editMacro(macro, "update")}>
                        <Entypo name="edit" size={27} color="black"></Entypo>
                    </Pressable>
                    <Pressable onPress={() => editMacro(macro, "toggle")}>
                        <Entypo name="bowl" size={27} color="black"></Entypo>
                    </Pressable>
                    <Pressable onPress={() => editMacro(macro, "remove")}>
                        <Entypo name="cross" size={27} color="black"></Entypo>
                    </Pressable>
                    </View>
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
    MacroButtons: {
        display:"flex",
        flexDirection: "row",
        gap:10
    },
});
