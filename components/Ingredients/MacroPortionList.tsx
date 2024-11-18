import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Card } from "react-native-paper";
import ShowAndEditInput from "./ShowAndEditInput";
import { PortionsPerMacro } from "../../types/ReactTypes";
import { useMacros } from "../MacroContextProvider";
import { styles } from "../../styles/mainStyles";
import { mainTheme } from "../../styles/mainTheme";

type MacroPortionListProps = {
    kcal: number;
    grams: number;
    updateSurplus : (surplus : number)=>void
};


export default function MacroPortionList({ kcal, grams, updateSurplus }: MacroPortionListProps) {
    const { macros } = useMacros();
    const [fixedPortion, setFixedPortion]: [
        null | PortionsPerMacro,
        Dispatch<SetStateAction<null | PortionsPerMacro>>
    ] = useState<PortionsPerMacro | null>(null);
    const [editingMacro, setEditingMacro] = useState(false);
    const [macrosInUse, setMacrosInUse] = useState([] as PortionsPerMacro[]);

    //Filter only those macros that are in use
    useEffect(() => {
        const newMacroPortions = macros
        .filter((macro) => macro.inUse)
        .map((macroInUse) => {
            return { macro: macroInUse, portions: 0 } as PortionsPerMacro;
            });
        const sharedMacros = shareMacroPortions(newMacroPortions, null);
        setMacrosInUse(sharedMacros);
        console.debug("Macros or Kcal changed");
    }, [kcal, macros]);
    
    const shareMacroPortions = (
        macros: PortionsPerMacro[],
        fixed: PortionsPerMacro | null
    ): PortionsPerMacro[] => {
        const remainingKcal = kcal - (fixed ? fixed.macro.kcalPerDish * fixed.portions : 0);
        const macrosToShare = macros.filter(
            (macro) => macro.macro.macroKey != fixed?.macro.macroKey
        );
        const result = giveRound(remainingKcal, macrosToShare);
        return fixed ? [fixed].concat(result) : result;
    };
    
    const setFixedPortionAmount = (fixedMacroPortion: PortionsPerMacro | null) => {
        const newMacroPortions = macros
        .filter((macro) => macro.inUse)
        .map((macroInUse) => {
            return { macro: macroInUse, portions: 0 } as PortionsPerMacro;
        });
        const result = shareMacroPortions(
            newMacroPortions,
            fixedMacroPortion
            ? { macro: fixedMacroPortion?.macro, portions: checkMaxPortions(fixedMacroPortion) }
            : null
        );
        const sorted = result.sort((a, b) => {return a.macro.macroKey > b.macro.macroKey? 1: -1 });
        setMacrosInUse(sorted);
    };
    
    const checkMaxPortions = (fixedMacroPortion: PortionsPerMacro): number => {
        console.debug("checkMaxPortions");
        const maxDishes = Math.floor(kcal / fixedMacroPortion.macro.kcalPerDish);
        if (fixedMacroPortion.portions > maxDishes) {
            return maxDishes;
        }
        return fixedMacroPortion.portions;
    };
    
    const editMacro = (macro: PortionsPerMacro) => {
        setFixedPortion(macro);
        setEditingMacro(true);
    };
    
    const closeDialog = () => {
        setEditingMacro(false);
    };
    
    const giveRound = (kcal: number, macros: PortionsPerMacro[]): PortionsPerMacro[] => {
        if (macros.length <= 0) {
            return [];
        }
        const macroResult = [...macros];
        let leftToShare = kcal;
        for (const macro of macroResult) {
            const portionKcal = macro.macro.kcalPerDish / macro.macro.dishesPerDay;
            if (leftToShare < portionKcal) {
                console.debug(`GiveRound: ${kcal}, ${macros.length}`);
                updateSurplus(Math.floor(leftToShare));
                return macroResult;
            }
            leftToShare -= portionKcal;
            macro.portions++;
        }
        if (leftToShare !== 0) {
            return giveRound(leftToShare, macroResult);
        }
        console.debug(`GiveRound: ${kcal}, ${macros.length}`);
        updateSurplus(Math.floor(leftToShare));
        return macroResult;
    };
    
    return (
        <View>
            <View >
                    <Button labelStyle={{color: mainTheme.colors.onSecondary}} style={styles(mainTheme).smallTextButton} onPress={() => setFixedPortionAmount(null)}>Reset portions</Button>
            </View>
            <Text>Total portions per Macro:</Text>
            <View style={styles(mainTheme).macroPortionList}>
                {fixedPortion && (
                    <ShowAndEditInput
                    visible={editingMacro}
                    fixedPortion={fixedPortion}
                    callback={setFixedPortionAmount}
                    close={closeDialog}
                    ></ShowAndEditInput>
                )}
                
                {macrosInUse.map((macro) => {
                    return (
                        macro && (
                            <View style={styles(mainTheme).macroPortionItem} key={macro.macro.macroKey + "_pl"}>
                                <Pressable
                                    onPress={() => editMacro(macro)}
                                    style={styles(mainTheme).macroPortions}
                                    >
                                    <Text style={styles(mainTheme).macroPortionText}>
                                        {macro.portions.toString()}
                                    </Text>
                                </Pressable>
                                {macro.macro.profileImage !== "" ? (
                                    <Image
                                    source={{ uri: macro.macro.profileImage }}
                                    style={styles(mainTheme).smallSquareImage}
                                    />
                                ) : (
                                    <Image
                                    source={{
                                            uri: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png",
                                        }}
                                        style={styles(mainTheme).smallSquareImage}
                                        />
                                    )}
                                <Text>
                                    {kcal > 0 &&
                                        Math.floor((grams / kcal) * macro.macro.kcalPerDish) + "g"}
                                </Text>
                            </View>
                        )
                    );
                })}
                
            </View>
        </View>
    );
}
