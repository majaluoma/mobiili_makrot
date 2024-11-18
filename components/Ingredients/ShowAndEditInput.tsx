import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { Button, Card, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { PortionsPerMacro } from "../../types/ReactTypes";
import { Macro } from "../../types/Interfaces";
import { styles } from "../../styles/mainStyles";
import { mainTheme } from "../../styles/mainTheme";

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
            <Dialog visible={visibility} onDismiss={closeDialog} style={styles(mainTheme).dialogWindowMainContainer}>
                <Dialog.Title>Edit</Dialog.Title>
                <Dialog.Content>
                    <Card style={styles(mainTheme).contentCard}>
                        <Text>Input the amount of portions you want to distribute to this Macro. If there is still kcals to distribute, it will be given to other macros </Text>
                        <TextInput
                            keyboardType="numeric"
                            value={value.toString()}
                            style={styles(mainTheme).inputFieldSmall}
                            onChange={(e)=> setValue(Number.parseInt(e.nativeEvent.text) | 0)}
                            onEndEditing={(e) => save(e.nativeEvent.text)}
                        ></TextInput>
                    </Card>
                    <Button labelStyle={{ color: mainTheme.colors.onPrimary }} style={styles(mainTheme).smallTextButton} onPress={()=>save(value.toString())}>
                        OK
                    </Button>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
}

