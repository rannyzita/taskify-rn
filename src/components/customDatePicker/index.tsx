import React, { useState } from "react";
import { Modal, View } from 'react-native';
import {styles} from './styles'
export default function CustomDateTimePicker({type, onDateChange, show, setShow}) {

    const [date, setDate] = useState(new Date())
    return (
        <Modal
            transparent={true}
            visible={show}
            onRequestClose={()=>setShow(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.container}>

                </View>
            </View>
        </Modal>
    )
}

