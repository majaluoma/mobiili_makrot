import { StyleSheet } from "react-native"
import { MD3Theme } from "react-native-paper";


export const styles = (theme : MD3Theme) => StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
        color: theme.colors.onBackground,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 0,
        gap: 10,
    },
    backGroundImage: {
        position: 'absolute',  // Use absolute positioning to take the element out of the normal layout flow
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,  // Ensure it appears above other elements (if needed)
        justifyContent: 'center',  // This might not be necessary if you're just positioning an image
        width: "100%",
        height: "100%",
        opacity: 0.5

        // Optional: you can add other styles like backgroundColor, or use ImageBackground if you need an image
    },
    baseContainer: {
        justifyContent: "flex-start",
        display:"flex",
        minHeight: 500,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        position: "relative",
        pointerEvents: "auto",
        zIndex: 1,
        alignItems: "center",
    },
    contentCard: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        elevation: 10,
        padding: 25,
        backgroundColor:theme.colors.surface,
        color: theme.colors.onSurface
    },
    macrosList: {
        maxWidth: 275,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    headerBar: {
        height:60,
        backgroundColor: theme.colors.secondary,
      },
    headerTitle: {
        top:-30,
    },
    smallTextButton: {
        flexWrap:"wrap",
        backgroundColor: theme.colors.primary,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
        //Label color is applied in the button tag labelstyle
    },
    mediumSquareImage: {
        width: 100,
        height: 100,
        backgroundColor: "white",
    },
    smallSquareImage: {
        width: 65,
        height: 65,
        backgroundColor: "white",
    },
    inputField: {
        height: 30,
        marginTop: 5,
        paddingLeft: 10,
        width: 150,
        backgroundColor: theme.colors.surface,
        color: theme.colors.onSurface
    },
    inputFieldWithdialog: {
        height: 30,
        marginTop: 5,
        paddingLeft: 10,
        width: 150,
        backgroundColor: theme.colors.surface,
        color: theme.colors.onSurface,
        pointerEvents: "none"
    },
    inputFieldSmall: {
        height: 30,
        marginTop: 5,
        paddingLeft: 10,
        width: 50,
        backgroundColor: theme.colors.surface,
        color: theme.colors.onSurface
    },
    dialogWindowMainContainer: {
        backgroundColor: theme.colors.secondary,
        color: theme.colors.onSecondary,
        marginTop: 100,
        padding: 5,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        gap:10
    },
    squareCard: {
        width: 130,
        height: 130,
        backgroundColor: theme.colors.surface,
        color: theme.colors.onSurface,
        alignItems: "center",
        justifyContent: "center",
    },
    cardActionButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent:"center",
        gap: 10,
    },
    bottomInfo: {
        alignItems: "flex-start",
        bottom: 2,
        gap: 10,
        width: 250,
    },
    ingredientInput: {
        pointerEvents: "none",
        margin: 10,
        elevation: 10,
        padding: 15,
        backgroundColor:theme.colors.surface,
        color: theme.colors.onSurface
    },
    macroPortionList: {
        width:"100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        marginTop: 5,
        flexDirection:"row"
    },
    infoText: {
        fontSize: 10,
        flexWrap: "wrap",
        textAlign: "center",
    },
    macroPortionItem: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: 65,
        margin: 2,
    },
    macroPortions: {
        top: 20,
        alignContent: "center",
        zIndex: 3,
        width: 40,
        height: 40,
        backgroundColor: "white",
        borderRadius: 50,
        position: "absolute",
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
    searchBar: {
        width: 250,
        backgroundColor: theme.colors.surface, 
        textAlign: "center",
    },
    dialogWindowAlwaysFull: {
        minHeight: 500,
    }
}
);


