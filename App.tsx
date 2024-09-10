import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import Macros from "./components/Macros";
import Ingredients from "./components/Ingredients";
import SearchBar from "./components/SearchBar";


const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Ingredients" component={Ingredients} />
                <Tab.Screen name="SearchBar" component={SearchBar} />
                <Tab.Screen name="Macros" component={Macros} />
            </Tab.Navigator>
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
