import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Macros from "./components/Macros/Macros";
import Ingredients from "./components/Ingredients/Ingredients";
import Entypo from "@expo/vector-icons/Entypo";
import { Appbar, PaperProvider, Text, useTheme } from "react-native-paper";
import { MacroContextProvider } from "./components/MacroContextProvider";
import { mainTheme } from "./styles/mainTheme";
import { styles } from "./styles/mainStyles";
import KeepAwakeButton from "./components/Ingredients/KeepAwakeButton";
import { ImageBackground } from "react-native";
const Tab = createBottomTabNavigator();

export default function App() {
    
    return (
        <MacroContextProvider>
        <PaperProvider theme= {mainTheme}>
            <Appbar mode="medium" elevated>
                <Appbar.Content title="Macros" />
            </Appbar>
            <NavigationContainer>
                <KeepAwakeButton/>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        // Navigator can be customized using screenOptions
                        
                        tabBarIcon: () => {
                            // Function tabBarIcon is given the focused state,
                            // color and size params
                            let iconName: "bowl" | "cog" | "add-user" = "bowl";
                            
                            if (route.name === "Ingredients") {
                                iconName = "bowl";
                            }  else if (route.name === "Macros") {
                                iconName = "add-user";
                            }
                            
                            
                            return <Entypo name={iconName} size={24} color="black" />; //it returns an icon component
                        },
                        
                        headerStyle: styles(mainTheme).headerBar,
                        headerTitleStyle:  styles(mainTheme).headerTitle
                    })}
                    >
                    <Tab.Screen name="Ingredients" component={Ingredients} />
                    <Tab.Screen name="Macros" component={Macros} />
                </Tab.Navigator>
            </NavigationContainer>
        </PaperProvider>
        </MacroContextProvider>
    );
}