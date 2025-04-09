import React from "react";
import { View } from 'react-native';
import { styles } from "./styles";

type Props = {
    color:string
}
export function Ball({...rest}:Props) {
    return (
        <View style={[styles.ball, {borderColor:rest.color||'gray'}]}/>
    )
}