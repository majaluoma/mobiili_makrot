import { StatusBar } from "expo-status-bar";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MacroCard from "./MacroCard";
import MacroEditView from "./MacroEditView";
import Macroservice from "../services/Macroservice";
import { DatabaseProcedure, Macro } from "../types/Interfaces";

export default function Macros() {
    const [macros, setMacros] = useState([] as Macro[]);
    const [editingMakro, setEditingMakro]: [
        undefined | Macro,
        Dispatch<SetStateAction<undefined | Macro>>
    ] = useState();

    useEffect(() => {
        fetchMacros();
    }, []);

    const fetchMacros = async () => {
        console.log("fetchMacros");
        let macroService = new Macroservice();
        setMacros(await macroService.fetchMacros());
    };
    const openEditView = (macro: Macro | undefined) => {
        setEditingMakro(macro);
    };

    const editMacro = (macro: Macro, procedure: DatabaseProcedure) => {
        console.log("editMacro");
        switch (procedure) {
            case "update":
                openEditView(macro);
                break;
            case "remove":
                deleteMacro(macro);
                break;
            case "add":
                openEditView(macro);
                break;
            case "toggle":
                saveMacro({ ...macro, inUse: !macro.inUse });
                break;
        }
    };

    const deleteMacro = (macro: Macro) => {
        console.log("deleteMacro");
        let macroService: Macroservice = new Macroservice();
        macroService.removeMacro(macro);
        fetchMacros();
    };

    const saveMacro = (macro: Macro) => {
        console.log("saveMacro");
        let macroService: Macroservice = new Macroservice();

        if (macro.macroKey === "" || macro.macroKey === undefined || macro.macroKey === null) {
            if (macro.nickname !== "") {
                macroService.addMacro(macro);
            } else {
                return console.error("Information missing");
            }
        } else {
            macroService.updateMacro(macro);
        }
        setEditingMakro(undefined)
        fetchMacros();
    };

    const editViewIfEnabled = () => {
        if (editingMakro) {
            return (
                <MacroEditView
                    macro={editingMakro}
                    saveEditedMacro={saveMacro}
                ></MacroEditView>
            );
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.baseContainer}>
                <Text>Here are all macros in your group</Text>
                <View style={styles.macrosList}>
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
        padding: 20,
        position: "relative",
        pointerEvents: "auto",
        zIndex: -1,
        alignItems: "center",
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
    macrosList: {
        maxWidth: 275,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
});
