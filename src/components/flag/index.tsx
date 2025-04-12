import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from "./styles";

type Props = {
    caption:string,
    color:string,
    // selected: boolean
}
export function Flag({...rest}:Props) {
    return (
        <TouchableOpacity style={[
                styles.container, {backgroundColor:rest?.color},
                rest?.selected && {borderWidth:2}
            ]}>
            <Text style={{color:'#fff'}}>{rest.caption}</Text>
        </TouchableOpacity>
    )
}