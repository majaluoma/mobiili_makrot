import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet} from "react-native";
import Macros from "./components/Macros";
import Ingredients from "./components/Ingredients";
import Entypo from "@expo/vector-icons/Entypo";
import Settings from "./components/Settings";


const Tab = createBottomTabNavigator();
export default function App() {

    return (
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
                })}
            >
                <Tab.Screen name="Ingredients" component={Ingredients} />
                <Tab.Screen name="Macros" component={Macros}/>
                <Tab.Screen name="Settings" component={Settings} />
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
