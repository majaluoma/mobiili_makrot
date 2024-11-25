import { Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useState } from "react";
import { MD3Theme, Text } from "react-native-paper";
import { mainTheme } from "../../styles/mainTheme";

/** Allows user to keep window open, while he or she distributes food based on calculations
 * */
export default function KeepAwakeButton() {
    const [keepAwakeColor, setKeepAwakeColor] = useState<"black" | "white">("black");
    const keepOpen = () => {
        console.debug("keepOpen");
        if (keepAwakeColor === "black") {
            setKeepAwakeColor("white");
            activateKeepAwakeAsync();
        } else {
            deactivateKeepAwake();
            setKeepAwakeColor("black");
        }
    };
    return (
        <Pressable style={styles(mainTheme).eyeIcon} onPress={keepOpen}>
            <Entypo name="eye" size={50} color={keepAwakeColor}></Entypo>
            <Text style={styles(mainTheme).text}>Keep open</Text>
        </Pressable>
    );
}

const styles = (theme : MD3Theme) => StyleSheet.create({
    eyeIcon: {
        position: "absolute",
        right: 10,
        top: 45,
        zIndex: 200,
        alignItems:"center",
        backgroundColor: theme.colors.primary,
        borderRadius: 400,
        width: 50,
        height: 50,
    },
    text: {
      fontSize: 10
    }
    
});
