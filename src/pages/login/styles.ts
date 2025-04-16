import { Dimensions, StyleSheet } from "react-native";
import { themas } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxTop: {
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        marginTop: 60,
    },
    boxMid: {
        height: Dimensions.get('window').height/4,
        width: '100%',
        paddingHorizontal: 37,
    },
    boxBottom: {
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textBottom: {
        fontSize: 16,
        color: themas.colors.gray,

    },
    textBottomCreate: {
        color: themas.colors.primary,
        fontWeight: 'bold',
    },
    buttonLogin: {

    },
    socialButtonGoogle: {

    }
})