import React from "react";
import { TouchableOpacityProps, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    text: string,
    loading?: boolean,

}
export function Button({...rest}) {
    return (
        <TouchableOpacity 
            style={styles.button}
            {...rest}
            activeOpacity={0.6}
        >
            {rest.loading?<ActivityIndicator/>:<Text style={styles.textButton}>{rest.text}</Text>}
        </TouchableOpacity>
    )
}