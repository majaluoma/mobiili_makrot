import { StatusBar } from "expo-status-bar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MacroCard from "./MacroCard";
import MacroEditView from "./MacroEditView";
import Macroservice from "../services/Macroservice";
import { Macro } from "../types/Interfaces";

export default function Macros() {
    const [macros, setMacros] = useState([] as Macro[]);
    const [editViewEnabled, setEditViewEnabled] = useState(false);
    const [editingMakro, setEditingMakro]: [
        undefined | Macro,
        Dispatch<SetStateAction<undefined | Macro>>
    ] = useState();

    useEffect(() => {
        fetchMacros()
    }, []);
    
    const fetchMacros =  async () => {
        console.log("fetchMacros")
        let macroService = new Macroservice ();
        setMacros(await macroService.fetchMacros())
    }
    const openEditView = (macro: Macro | undefined) => {
        setEditingMakro(macro);
        setEditViewEnabled(true);
    };
    const closeEditView = () => {
        setEditViewEnabled(false);
        setEditingMakro(undefined);
    };

    const editMacro = (macro: Macro) => {
        console.log("editMacro")
        openEditView(macro);
    };

    const saveMacro = (macro: Macro) => {
        console.log("saveMacro")
        let macroService : Macroservice = new Macroservice();
        
        if (macro.macroKey === "" || macro.macroKey === undefined || macro.macroKey === null) {
            if (macro.nickname !== "") {
                macroService.addMacro(macro)
            } else {
                return console.error("Information missing");
            }
        }else {
            macroService.updateMacro(macro)
        }
        
        closeEditView();
        fetchMacros()
    };

    const editViewIfEnabled = () => {
        if (editViewEnabled && editingMakro) {
            return (
                <View style={styles.overlayContainer}>
                    <MacroEditView
                        macro={editingMakro}
                        closeView={closeEditView}
                        saveEditedMacro={saveMacro}
                    ></MacroEditView>
                </View>
            );
        } else {
            return (<View/>);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.baseContainer}>
                <Text>Here are all macros in your group</Text>
                {macros.map((macro) => {
                    return (
                        <MacroCard
                            key={macro.macroKey}
                            macro={macro}
                            editMacro={editMacro}
                        ></MacroCard>
                    );
                })}
            </View>
            <MacroCard editMacro={editMacro} macro={undefined}></MacroCard>
            {editViewIfEnabled()}
        </View>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        position: "absolute",
        pointerEvents: "auto",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    baseContainer: {
        position: "relative",
        pointerEvents: "auto",
        zIndex: -1,
    },
    mainContainer: {
        position: "relative",
        paddingBottom: 70,
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
