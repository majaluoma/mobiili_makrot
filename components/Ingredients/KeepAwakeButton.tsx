import { Pressable, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useKeepAwake, activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { useState } from "react";


export default function KeepAwakeButton () {
    const [keepAwakeColor, setKeepAwakeColor] = useState<"black" | "green">("black");
    const keepOpen = () => {
        console.debug("keepOpen");
        if (keepAwakeColor === "black") {
            setKeepAwakeColor("green");
            activateKeepAwakeAsync();
        } else {
            deactivateKeepAwake();
            setKeepAwakeColor("black");
        }
    };
    return (
        <Pressable style={styles.eyeIcon} onPress={keepOpen}>
                <Entypo name="eye" size={50} color={keepAwakeColor}></Entypo>
            </Pressable>
    )
}

const styles = StyleSheet.create({
eyeIcon: {
    position: "absolute",
    top: -10,
    right: 10,
    zIndex: 200000,
}
})