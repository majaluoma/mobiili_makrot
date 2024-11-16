import { useState } from "react";
import { View, StyleSheet, Dimensions, Image, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Macro } from "../../types/Interfaces";
import { z } from "zod";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";

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
                            <Button style={styles.avatarButton} onPress={pickImage}>Add avatar</Button>
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
                                label={transformToHeader(key)}
                                style={styles.input}
                                value={editedMacro[key].toString()}
                                onChange={(event) => inputChangeAction(key, event.nativeEvent.text)}
                            ></TextInput>
                        </View>
                    );
            }
        });
    };

    /** Actions done when user clicks exit or backgorund on Macro editing dialog view
     * 
     */
    const closeDialog = () => {
        close();
    };

    /** Actions done when user clicks save button on Macro editing dialog view
     * 
     */
    const save = () => {
        saveEditedMacro(editedMacro);
        close();
    };

    const transformToHeader = (text : string) => {
        let header = text;
        const alphabetHigherCase = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", 
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 
            "Ä", "Ö"
        ];
        alphabetHigherCase.forEach((alphabet) => {
            header = header.replace(alphabet, ` ${alphabet.toLowerCase()}`)
        })

        return header[0].toUpperCase() + header.slice(1)
    }

    return (
        <Portal>
            <Dialog visible={true} onDismiss={closeDialog} style={styles.dialogWindow}>
                <Dialog.ScrollArea>
                    <Dialog.Title>Edit macro</Dialog.Title>
                    <Dialog.Content>
                        <Text>Edit your Macro's information here. Press Save this Macro, when you are ready</Text>
                    </Dialog.Content>
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
    avatarButton: {
        flexWrap:"wrap",
    },
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
        marginRight: 5,
        marginLeft: 5,
        paddingLeft: 10,
        width: 150,
    },
    image: {
        width: 100,
        height: 100,
    },
    imageEdit: {
        marginTop: 10,
        marginBottom:10,
    },
});
