import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Dialog, Portal, TextInput } from "react-native-paper";
import { PortionsPerMacro } from "../../types/ReactTypes";
import { Macro } from "../../types/Interfaces";

export default function ShowAndEditInput({
    callback,
    fixedPortion,
    visible,
    close
}: {
    callback: (fixedMacro: PortionsPerMacro) => void;
    fixedPortion : PortionsPerMacro;
    visible:boolean;
    close: ()=> void
}) {
    const [value, setValue] = useState(fixedPortion.portions);
    const [visibility, setVisibility] = useState(visible);

    useEffect(()=> {
        setVisibility(visible)
    }, [visible])

    const closeDialog = () => {
        close()
    };

    const save = (text: string) => {
        setValue(Number.parseInt(text));
        callback({macro: fixedPortion.macro, portions: Number.parseInt(text)});
        close();
    };

    return (
        <Portal>
            <Dialog visible={visibility} onDismiss={closeDialog} style={styles.dialogWindow}>
                <Dialog.Title>Edit</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.contentView}>
                    <TextInput
                        keyboardType="numeric"
                        value={value.toString()}
                        style={styles.searchBar}
                        onChange={(e)=> setValue(Number.parseInt(e.nativeEvent.text) | 0)}
                        onEndEditing={(e) => save(e.nativeEvent.text)}
                    ></TextInput>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialogWindow: {
        marginTop: 100,
        marginBottom: 200,
    },
    contentView: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    searchBar: {
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 10, 
        paddingVertical: 10, 
        marginTop: 30,
        width: 250,
        backgroundColor: "#f0f0f0", 
        textAlign: "center",
        borderRadius: 5, 
    },
});
