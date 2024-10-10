import { View, Image, StyleSheet, Text } from "react-native";
import { Macro } from "../types/Interfaces";

type MacroPortionListProps = {
    macros: Macro[];
};
export default function MacroPortionList({ macros }: MacroPortionListProps) {
    return (
        <View style={styles.macroList}>
            {macros.map((macro) => {
                return (
                    <View style={styles.macroItem} key={macro.macroKey + "_pl"}>
                        <Text style={styles.macroPortions}>{macro.dishes}</Text>
                        {macro.profileImage !== "" ? (
                            <Image source={{ uri: macro.profileImage }} style={styles.image} />
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
