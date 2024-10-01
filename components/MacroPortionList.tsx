import { View, Image, StyleSheet, Text } from "react-native";
import { Macro } from "../types/Interfaces";

type MacroPortionListProps = {
    macros: Macro[];
};
export default function MacroPortionList({ macros }: MacroPortionListProps) {
    return (
        <View>
            {macros.map((macro) => {
                return (
                    <View>
                        <Text>{macro.nickname}</Text>
                        {macro.profileImage !== "" ? (
                            <Image source={{ uri: macro.profileImage }} style={styles.image} />
                        ) : (
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png" }} style={styles.image} />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
});
