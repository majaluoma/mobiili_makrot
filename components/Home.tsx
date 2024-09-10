import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ingredients from './Ingredients';
import SearchBar from './SearchBar';
import { RootStackParamList } from '../types/ReactTypes';


const Stack = createNativeStackNavigator<RootStackParamList>()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ingredients" component={Ingredients} />
        <Stack.Screen name="SearchBar" component={SearchBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}