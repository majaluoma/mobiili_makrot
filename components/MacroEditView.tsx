import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Dimensions,
    ScrollView,
    Button,
    Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Macro } from "../types/Interfaces";
import {z} from "zod";

type MacroEditViewProps = {
    macro: Macro;
    closeView: (makro: Macro | undefined) => void;
    saveEditedMacro: (macro: Macro) => void;
};

export default function MacroEditView({ macro, closeView, saveEditedMacro }: MacroEditViewProps) {
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
          inputChangeAction("profileImage", result.assets[0].uri)
        }
    };
    
    
    /** Changes the value of macros depending on the key used
     * can handle only string and number typed vvariables for now
     */
    const inputChangeAction = (
        key: keyof Macro,
        value : string
    ) => {
        if (typeof editedMacro[key] === "string") {
            setEditedMacro ({...editedMacro, [key]:value})
        } else if (typeof editedMacro[key] === "number") {
            let num = numberSchema.safeParse(Number.parseInt(value)).data
            console.log(num)
            if (num) {
                setEditedMacro ({...editedMacro, [key]:num})
            }
        }else if (key === "profileImage") {
            setEditedMacro ({...editedMacro, [key]:value})
        }else {
            console.log("Error with macro type")
        }
    };

    /** Input fields for each  key in macro. Allows editing
     */
    const macroEditInputs = () => {
        let keys: Array<keyof Macro> = Object.keys(editedMacro) as Array<keyof Macro>;
        return keys.map((key,index) => {
            switch (key) {
                case "macroKey": return  ""
                case "inUse": return "" 
                case "profileImage":
                    return (
                        <View key={`edit_${key}_${index}`} style={styles.row}>
                          <Button title="Pick an image" onPress={pickImage} />
                          {editedMacro.profileImage !== null && <Image source={{ uri: editedMacro.profileImage }} style={styles.image} />}
                        </View>
                      );
                default: 
                return (
                    <View key={`edit_${key}_${index}`} style={styles.row}>
                        <Text>{key}: </Text>
                        <TextInput
                            style={styles.input}
                            value={editedMacro[key].toString()}
                            onChange={(event) => inputChangeAction(key, event.nativeEvent.text)}
                        ></TextInput>
                    </View>
                )
            }
        });
    };


    return (
        <ScrollView>
            <Pressable onPress={() => closeView(undefined)}>
                <View style={styles.overlayBackground}></View>
            </Pressable>
            <View style={styles.overlayView}>
                {macroEditInputs()}
                <Text>
                    <Button
                        onPress={() => saveEditedMacro(editedMacro)}
                        title="Save this macro"
                    ></Button>
                </Text>
            </View>
        </ScrollView>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    overlayView: {
        backgroundColor: "white",
        position: "absolute",
        top: 40,
        bottom: 150,
        right: 40,
        left: 40,
        opacity: 1,
        alignItems: "center",
    },

    // MIKS EI VOI LAITTAA STRINGEJÄÅ WIDTHIIS ESIM 1EM tai 100VW
    overlayBackground: {
        width: width,
        height: height,
        position: "static",
        backgroundColor: "black",
        opacity: 0.5,
    },

    row: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    input: {
        height: 30,
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 10,
        width: 50,
        borderWidth: 2,
        borderBlockColor: "black",
        borderStyle: "solid",
        borderColor: "black",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
      width: 100,
      height: 100,
    },
});
