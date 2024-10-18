import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
                    <TextInput
                        keyboardType="numeric"
                        value={value.toString()}
                        style={styles.searchBar}
                        onChange={(e)=> setValue(Number.parseInt(e.nativeEvent.text) | 0)}
                        onEndEditing={(e) => save(e.nativeEvent.text)}
                    ></TextInput>
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
    searchBar: {
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
        marginTop: 30,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
    },
});
