import { Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useState } from "react";
import { Text } from "react-native-paper";

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
        <Pressable style={styles.eyeIcon} onPress={keepOpen}>
            <Entypo name="eye" size={50} color={keepAwakeColor}></Entypo>
            <Text style={styles.text}>Keep open</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    eyeIcon: {
        position: "absolute",
        right: 10,
        zIndex: 200000,
        alignItems:"center",
        backgroundColor:"green",
        borderRadius: 400,
        width: 50,
        height: 50,
    },
    text: {
      fontSize: 10
    }
    
});
