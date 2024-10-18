import { useState } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Macro } from "../../types/Interfaces";
import { z } from "zod";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import DialogContent from "react-native-paper/lib/typescript/components/Dialog/DialogContent";

type MacroEditViewProps = {
    macro: Macro;
    saveEditedMacro: (macro: Macro) => void;
    close: () => void
};

export default function MacroEditView({ macro, saveEditedMacro, close }: MacroEditViewProps) {
    const [editedMacro, setEditedMacro] = useState(macro);
    const numberSchema = z.number();
    // No permissions request is necessary for launching the image library
    const pickImage = async () => {
        console.log(`pickImage`);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            inputChangeAction("profileImage", result.assets[0].uri);
        }
    };

    /** Changes the value of macros depending on the key used
     * can handle only string and number typed vvariables for now
     */
    const inputChangeAction = (key: keyof Macro, value: string) => {
        if (typeof editedMacro[key] === "string") {
            setEditedMacro({ ...editedMacro, [key]: value });
        } else if (typeof editedMacro[key] === "number") {
            let num = numberSchema.safeParse(Number.parseInt(value)).data;
            console.log(num);
            if (num) {
                setEditedMacro({ ...editedMacro, [key]: num });
            }
        } else if (key === "profileImage") {
            setEditedMacro({ ...editedMacro, [key]: value });
        } else {
            console.log("Error with macro type");
        }
    };

    /** Input fields for each  key in macro. Allows editing
     */
    const macroEditInputs = () => {
        let keys: Array<keyof Macro> = Object.keys(editedMacro) as Array<keyof Macro>;
        return keys.map((key, index) => {
            switch (key) {
                case "macroKey":
                    return "";
                case "inUse":
                    return "";
                case "profileImage":
                    return (
                        <View key={`edit_${key}_${index}`} style={[styles.row, styles.imageEdit]}>
                            <Button onPress={pickImage}>Avatar</Button>
                            {editedMacro.profileImage !== null && (
                                <Image
                                    source={{ uri: editedMacro.profileImage }}
                                    style={styles.image}
                                />
                            )}
                        </View>
                    );
                default:
                    return (
                        <View key={`edit_${key}_${index}`} style={styles.row}>
                            <TextInput
                                label={key}
                                style={styles.input}
                                value={editedMacro[key].toString()}
                                onChange={(event) => inputChangeAction(key, event.nativeEvent.text)}
                            ></TextInput>
                        </View>
                    );
            }
        });
    };

    const closeDialog = () => {
        close();
    };

    const save = () => {
        saveEditedMacro(editedMacro);
        close();
    };

    return (
        <Portal>
            <Dialog visible={true} onDismiss={closeDialog} style={styles.dialogWindow}>
                <Dialog.ScrollArea>
                    <Dialog.Title>Edit macro</Dialog.Title>
                    <ScrollView>
                    {macroEditInputs()}
                    </ScrollView>
                    <Dialog.Actions>
                        <Button style={styles.saveButton} onPress={save}>
                            Save this macro
                        </Button>
                    </Dialog.Actions>
                </Dialog.ScrollArea>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialogWindow: {
        marginTop: 100,
        marginBottom: 100
    },
    saveButton: {
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    input: {
        height: 30,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
        width: 150,
    },
    image: {
        width: 100,
        height: 100,
    },
    imageEdit: {
        marginTop: 10,
        height: 100,
    },
});
