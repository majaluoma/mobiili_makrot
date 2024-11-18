import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MacroCard from "./MacroCard";
import MacroEditView from "./MacroEditView";
import { DatabaseProcedure, Macro } from "../../types/Interfaces";
import { useMacros } from "../MacroContextProvider";
import { styles } from "../../styles/mainStyles";
import { mainTheme } from "../../styles/mainTheme";
import { Card } from "react-native-paper";

export default function Macros() {
    const { macros, addMacro, updateMacro, deleteMacro } = useMacros();
    const [editingMakro, setEditingMakro]: [
        undefined | Macro,
        Dispatch<SetStateAction<undefined | Macro>>
    ] = useState();

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

    const saveMacro = (macro: Macro) => {
        console.log("saveMacro");
        if (macro.macroKey === "" || macro.macroKey === undefined || macro.macroKey === null) {
            if (macro.nickname !== "") {
                addMacro(macro);
            } else {
                return console.error("Information missing");
            }
        } else {
            updateMacro(macro);
        }
        setEditingMakro(undefined)
    };

    const editViewIfEnabled = () => {
        if (editingMakro) {
            return (
                <MacroEditView
                    macro={editingMakro}
                    saveEditedMacro={saveMacro}
                    close={()=>setEditingMakro(undefined)}
                ></MacroEditView>
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles(mainTheme).mainContainer}>
                <Card style={styles(mainTheme).contentCard}>
                <Text >Here are all macros in your group. You can add, edit and remove macros. Press the bowl icon to switch Macro from being used or not. MAcros with red bowl icon are not taken into account when calculating portions</Text>
                </Card>
                <View style={styles(mainTheme).macrosList}>
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
        </ScrollView>
    );
}
