import { DatabaseProcedure, Macro } from "../../types/Interfaces";
import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Card } from "react-native-paper";
type MacroCardProps = {
    macro: Macro | undefined;
    editMacro: (macro: Macro, procedure: DatabaseProcedure) => void;
};

export default function MacroCard({ macro, editMacro }: MacroCardProps) {
    const inUseColor = () => {
        if (macro?.inUse) {
            return "green";
        } else {
            return "red";
        }
    };
    const newMacro = () => {
        let newMacro: Macro = {
            dishKcal:0,
            macroKey: "",
            nickname: "",
            dishes: 0,
            inUse: true,
            profileImage: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png",
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
                <Card style={styles.MacroCard}>
                    <Card.Title title={macro.nickname} />
                    <Card.Content>
                        <Text>Kcal: {macro.energyKcal}</Text>
                        <Text>Dishes: {macro.dishes}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <View style={styles.MacroButtons}>
                            <Pressable onPress={() => editMacro(macro, "update")}>
                                <Entypo name="edit" size={27} color="black"></Entypo>
                            </Pressable>
                            <Pressable onPress={() => editMacro(macro, "toggle")}>
                                <Entypo name="bowl" size={27} color={inUseColor()}></Entypo>
                            </Pressable>
                            <Pressable onPress={() => editMacro(macro, "remove")}>
                                <Entypo name="cross" size={27} color="black"></Entypo>
                            </Pressable>
                        </View>
                    </Card.Actions>
                </Card>
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
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    MacroButtons: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
});
