import { View, Image, StyleSheet, Text } from "react-native";
import { Macro } from "../types/Interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";

type MacroPortionListProps = {
    macros: Macro[];
    kcal : number
};
type portionsPerMacro = {
    macro : Macro;
    portions : number;
}

const giveRound = (kcal : number, macros : portionsPerMacro []) :portionsPerMacro [] => {
    console.debug(`GiveRound: ${kcal}, ${macros.length}`);
    if (macros.length<=0) {
        return [];
    }
    const macroResult = [...macros];
    let leftToShare = kcal;
    for (const macro of macroResult) {
        const portionKcal = macro.macro.dishKcal / macro.macro.dishes;
        console.debug(portionKcal);
        console.debug(leftToShare);
        if (leftToShare < portionKcal) {
            return macroResult;
        }
        leftToShare -= portionKcal;
        macro.portions++;
        console.debug(macro.macro.nickname +  ": "+ macro.portions);
    }
    if (leftToShare !== 0) {
        return giveRound(leftToShare, macroResult);
    }
    return macroResult
}

export default function MacroPortionList({ macros, kcal }: MacroPortionListProps) {
    const [fixedPortion, setFixedPortion] : [null | portionsPerMacro, Dispatch<SetStateAction<null | portionsPerMacro>>] = useState<portionsPerMacro | null>(null);
    const [floatingPortions, setfloatingPortions] = useState([] as portionsPerMacro []);
    
    useEffect (()=> {
        setfloatingPortions([])
        setFixedPortion(null)
        shareRestPortions(macros.map(macro => {return {macro:macro, portions:0}}));
    }, [macros, kcal])

    const resetPortions = () => {
            console.debug("resetPortions");
            const result = giveRound (kcal, macros.map(macro => {return {macro:macro, portions:0}}))
            setfloatingPortions(result);
    }
    
    const shareRestPortions = (macros : portionsPerMacro []) => {
            console.debug("shareRestPoritons");
            const result = giveRound (kcal, macros.map(macro => {return {macro:macro.macro, portions:0}}))
            console.debug(result);
            setfloatingPortions(result);
    }

    const setFixedPortionAmount = (macroKey : string, portions : number) => {
        console.debug("setFixedPortionAmount");
        const newFloatingMacros : portionsPerMacro [] = []
        floatingPortions.forEach(macro => {
            if (macro.macro.macroKey === macroKey) {
                console.debug("OK")
                setFixedPortion({macro:macro.macro, portions:checkMaxPortions(macro.macro, portions)} as portionsPerMacro)
            }else {
                newFloatingMacros.push(macro)
            }
        })
        shareRestPortions(newFloatingMacros);
    }

    const checkMaxPortions = (macro : Macro, portions : number) : number => {
        console.debug("checkMaxPortions");
        const maxDishes = Math.floor(kcal / (macro.dishKcal / macro.dishes));
        if (portions > maxDishes) {
            return maxDishes
        }
        return portions;
    }

    return (
        <View style={styles.macroList}>
            <Button onPress={resetPortions}>Reset</Button>
            {[fixedPortion].concat(floatingPortions).map((macro) => {
                return (
                    macro && <View style={styles.macroItem} key={macro.macro.macroKey + "_pl"}>
                        <TextInput keyboardType="numeric" onChange={(e)=>setFixedPortionAmount(macro.macro.macroKey, Number.parseInt(e.nativeEvent.text))} value={macro.portions.toString()} style={styles.macroPortions}></TextInput>
                        {macro.macro.profileImage !== "" ? (
                            <Image source={{ uri: macro.macro.profileImage }} style={styles.image} />
                        ) : (
                            <Image
                                source={{
                                    uri: "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png",
                                }}
                                style={styles.image}
                            />
                        )}
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        position:"absolute",
        width: 65,
        height: 65,
    },
    macroPortions: {
        textAlign:"center",
        textAlignVertical:"center",
        zIndex:3,
        width:40,
        height:40,
        backgroundColor:"white",
        borderRadius:50,
        position:"absolute"
    },
    macroList: {
        display: "flex",
        flexDirection: "row",
        flexWrap:"wrap",
        flex: 1,
        justifyContent:"space-evenly", 
        marginTop:33   
    },
    macroItem: {
        alignItems:"center",
        justifyContent:"center",
        position:"relative",
        width:65,
        margin:2
    },
});
