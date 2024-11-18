import { MD3LightTheme, MD3Theme } from "react-native-paper";

// Used https://colordesigner.io
export const mainTheme : MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
            primary: "#00A388",
            onPrimary: "#000000",
            secondary: "#BEEB9F", 
            onSecondary: "#FFFFFF",
            tertiary: "#FFFF9D",
            onTertiary: "#000000",
            background: "#79BD8F", 
            onBackground: "#000000",
            surface: "#FFFFFF", 
            onSurface: "#000000",
            error: "#FF6138", 
            onError: "#FFFFF",
    }
}