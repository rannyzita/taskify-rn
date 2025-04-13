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
        borderColor: themas.colors.gray,
    },
    input: {
        width: '88%',
        paddingHorizontal: 4,
        height: '100%',
        color: themas.colors.gray
    },
    textInput: {
        marginLeft: 4,
        marginTop: 10,
    },
    icon: {
        width: '100%',
    },
    button: {
        width: '10%'
    }
})