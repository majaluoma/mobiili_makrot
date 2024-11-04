import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import ShowAndEditInput from "./ShowAndEditInput";
import { PortionsPerMacro } from "../../types/ReactTypes";
import { useMacros } from "../MacroContextProvider";

type MacroPortionListProps = {
    kcal: number;
    grams: number;
};

const giveRound = (kcal: number, macros: PortionsPerMacro[]): PortionsPerMacro[] => {
    if (macros.length <= 0) {
        return [];
    }
    const macroResult = [...macros];
    let leftToShare = kcal;
    for (const macro of macroResult) {
        const portionKcal = macro.macro.dishKcal / macro.macro.dishes;
        if (leftToShare < portionKcal) {
            console.debug(`GiveRound: ${kcal}, ${macros.length}`);
            return macroResult;
        }
        leftToShare -= portionKcal;
        macro.portions++;
    }
    if (leftToShare !== 0) {
        return giveRound(leftToShare, macroResult);
    }
    console.debug(`GiveRound: ${kcal}, ${macros.length}`);
    return macroResult;
};

export default function MacroPortionList({ kcal, grams }: MacroPortionListProps) {
    const { macros } = useMacros();
    const [fixedPortion, setFixedPortion]: [
        null | PortionsPerMacro,
        Dispatch<SetStateAction<null | PortionsPerMacro>>
    ] = useState<PortionsPerMacro | null>(null);
    const [editingMacro, setEditingMacro] = useState(false);
    const [macrosInUse, setMacrosInUse] = useState([] as PortionsPerMacro[]);
    
    //Filter only those macros that are in use
    useEffect(() => {
        const newMacroPortions = macros.filter((macro) => macro.inUse).map(macroInUse => {return  {macro:macroInUse, portions: 0} as PortionsPerMacro});
        const sharedMacros = shareMacroPortions(newMacroPortions, null)
        setMacrosInUse(sharedMacros)
        console.debug("Macros or Kcal changed");
    }, [ kcal]);
    
    const shareMacroPortions = (macros : PortionsPerMacro [], fixed : PortionsPerMacro | null) : PortionsPerMacro [] => {
        const remainingKcal = kcal - (fixed? fixed.macro.dishKcal*fixed.portions:0);
        const macrosToShare = macros.filter(macro => macro.macro.macroKey != fixed?.macro.macroKey);
        const result = giveRound(remainingKcal, macrosToShare);
        return fixed?  [fixed].concat(result) : result;
    }

    const setFixedPortionAmount = (fixedMacroPortion: PortionsPerMacro | null) => {
        const newMacroPortions = macros.filter((macro) => macro.inUse).map(macroInUse => {return  {macro:macroInUse, portions: 0} as PortionsPerMacro});
        const result = shareMacroPortions(
            newMacroPortions,
            fixedMacroPortion? {macro: fixedMacroPortion?.macro, portions:checkMaxPortions(fixedMacroPortion)}: null
        );
        setMacrosInUse(result);
    };

    const checkMaxPortions = (fixedMacroPortion: PortionsPerMacro): number => {
        console.debug("checkMaxPortions");
        const maxDishes = Math.floor(kcal / (fixedMacroPortion.macro.dishKcal));
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

    return (
        <View style={styles.macroList}>
            {fixedPortion && (
                <ShowAndEditInput
                    visible={editingMacro}
                    fixedPortion={fixedPortion}
                    callback={setFixedPortionAmount}
                    close={closeDialog}
                ></ShowAndEditInput>
            )}
            <Button onPress={()=>setFixedPortionAmount(null)}>Reset</Button>
            {macrosInUse.map((macro) => {
                return (
                    macro && (
                        <View style={styles.macroItem} key={macro.macro.macroKey + "_pl"}>
                            <Pressable
                                onPress={() => editMacro(macro)}
                                style={styles.macroPortions}
                            >
                                <Text style={styles.macroPortionText}>
                                    {macro.portions.toString()}
                                </Text>
                            </Pressable>
                            {macro.macro.profileImage !== "" ? (
                                <Image
                                    source={{ uri: macro.macro.profileImage }}
                                    style={styles.image}
                                />
                            ) : (
                                <Image
                                    source={{
                                        uri: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png",
                                    }}
                                    style={styles.image}
                                />
                            )}
                            <Text>{kcal>0 && (grams / kcal) * macro.macro.dishKcal + "g"}</Text>
                        </View>
                    )
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 65,
        height: 65,
    },
    macroPortionText: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        textAlign: "center",
        textAlignVertical: "center",
    },
    macroPortions: {
        top: 12,
        alignContent: "center",
        zIndex: 3,
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 50,
        position: "absolute",
    },
    macroList: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        justifyContent: "space-evenly",
        marginTop: 33,
    },
    macroItem: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: 65,
        margin: 2,
    },
});
