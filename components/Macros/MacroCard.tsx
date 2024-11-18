import { DatabaseProcedure, Macro } from "../../types/Interfaces";
import { View, Text, Pressable} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Card } from "react-native-paper";
import { styles } from "../../styles/mainStyles";
import { mainTheme } from "../../styles/mainTheme";
type MacroCardProps = {
    macro: Macro | undefined;
    editMacro: (macro: Macro, procedure: DatabaseProcedure) => void;
};

export default function MacroCard({ macro, editMacro }: MacroCardProps) {
    const inUseColor = () => {
        if (macro?.inUse) {
            return mainTheme.colors.primary;
        } else {
            return mainTheme.colors.secondary;
        }
    };
    const newMacro = () => {
        let newMacro: Macro = {
            kcalPerDish:0,
            macroKey: "",
            nickname: "",
            dishesPerDay: 0,
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
                <Card style={styles(mainTheme).squareCard}>
                    <Card.Title title={macro.nickname} />
                    <Card.Content>
                        <Text>Kcal: {macro.kcalPerDish}</Text>
                        <Text>Dishes: {macro.dishesPerDay}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <View style={styles(mainTheme).cardActionButtons}>
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
                <Card style={styles(mainTheme).squareCard}>
                    <Text>Add new macro</Text>
                    <View style={styles(mainTheme).cardActionButtons}>
                    <Pressable onPress={newMacro}>
                        <Entypo name="plus" size={60} color="black"></Entypo>
                    </Pressable>
                    </View>
                </Card>
            </Pressable>
        );
    }
}