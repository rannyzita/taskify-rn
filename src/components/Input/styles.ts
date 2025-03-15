import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
    boxInput: {
        width: '100%',
        height: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 40,
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: themas.colors.lightGray,
        borderColor: themas.colors.lightGray,
    },
    input: {
        width: '88%',
        paddingHorizontal: 20,
        height: '100%',
    },
    textInput: {
        marginLeft: 5,
        marginTop: 10,
        color: themas.colors.gray
    },
    icon: {
        width: '100%',
    },
    button: {
        width: '10%'
    }
})