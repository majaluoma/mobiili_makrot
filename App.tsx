import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Macros from "./components/Macros/Macros";
import Ingredients from "./components/Ingredients/Ingredients";
import Entypo from "@expo/vector-icons/Entypo";
import Settings from "./components/Settings";
import { Appbar, PaperProvider } from "react-native-paper";
import { MacroContextProvider } from "./components/MacroContextProvider";

const Tab = createBottomTabNavigator();
export default function App() {
    return (
        <MacroContextProvider>
        <PaperProvider>
            <Appbar mode="small" elevated>
                <Appbar.Content title="Macros" />
            </Appbar>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        // Navigator can be customized using screenOptions

                        tabBarIcon: () => {
                            // Function tabBarIcon is given the focused state,
                            // color and size params
                            let iconName: "bowl" | "cog" | "add-user" = "bowl";

                            if (route.name === "Ingredients") {
                                iconName = "bowl";
                            } else if (route.name === "Settings") {
                                iconName = "cog";
                            } else if (route.name === "Macros") {
                                iconName = "add-user";
                            }
                            

                            return <Entypo name={iconName} size={24} color="black" />; //it returns an icon component
                        },
                        tabBarActiveTintColor: 'green', 
                        headerTintColor:"green",
                        headerStyle: styles.headerBar,
                        headerTitleStyle:  styles.headerTitle
                    })}
                >
                    <Tab.Screen name="Ingredients" component={Ingredients} />
                    <Tab.Screen name="Macros" component={Macros} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
        </MacroContextProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    headerBar: {
        height:60,
    },
    headerTitle: {
        top:-30,
    },
});
