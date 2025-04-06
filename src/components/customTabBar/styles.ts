import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
    tabArea: {
        flexDirection:'row',
        height: 80,
        // esse de baixo deixa tudo milimetricamnete separado
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemButtom: {
        width: 70,
        height: 70,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        top: -30,   
        backgroundColor: themas.colors.primary
    }

})