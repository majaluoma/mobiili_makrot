import { Macro } from "../types/Interfaces";
import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Makropalvelu from "../services/Makropalvelu";
type MacroCardProps = {
    macro: Macro | undefined;
    editMacro: (macro: Macro) => void;
};

export default function MacroCard({ macro, editMacro }: MacroCardProps) {
    const newMacro = () => {
        let newMacro: Macro = {
            makroId: "",
            nimimerkki: "",
            aterioita: 0,
            laskennassa: 0,
            sokerit: 0,
            suolat: 0,
            energiaKcal: 0,
            rasvat: 0,
            proteiinit: 0,
            hiilihydraatit: 0,
            kuidut: 0,
            tyydyttyneetRasvat: 0,
        };
        let makropalvelu = new Makropalvelu();
        makropalvelu.addMacro(newMacro);
        editMacro(newMacro);
    };

    if (macro) {
        return (
            <Pressable>
                <View style={styles.MacroCard}>
                    <Text>{macro.nimimerkki}</Text>
                    <Text>Kcal: {macro.energiaKcal}</Text>
                    <Text>Dishes: {macro.aterioita}</Text>
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
