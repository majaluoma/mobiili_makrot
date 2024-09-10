import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Macros from "./components/Macros";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ingredients from "./components/Ingredients";
import SearchBar from "./components/SearchBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/ReactTypes";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Ingredients" component={Ingredients} />
                <Stack.Screen name="SearchBar" component={SearchBar} />
                <Stack.Screen name="Macros" component={Macros} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
