import React, { forwardRef, LegacyRef } from "react";
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import { View, TextInput, Text, TextInputProps, TouchableOpacity } from 'react-native';

import { themas } from "../../global/themes";
import { styles } from './styles';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> | 
React.ComponentType<React.ComponentProps<typeof FontAwesome>> | 
React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
    IconLeft?: IconComponent,
    IconRight?: IconComponent,
    IconLeftName?: string,
    iconRightName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRightPress?: () => void,
}

export const Input = forwardRef((props: Props, ref: React.Ref<TextInput> | null) => {

    const { IconLeft, IconRight, IconLeftName, iconRightName, title, onIconLeftPress, onIconRightPress,...rest } = props;


    const calculateSizeWidth = () => {
        if (IconLeft && IconRight) {
            return '80%';
        } else if (IconLeft || IconRight) {
            return '90%'
        } else {
            return '100%';
        }
    }

    const calculateSizePaddingLeft  = () => {
        if (IconLeft && IconRight) {
            return 0;
        } else if (IconLeft || IconRight) {
            return 10;
        } else {
            return 20;
        }
    }

    return (
        <>
            {title&&<Text style={styles.textInput}>{title}</Text>}
            <View style={[
                styles.boxInput, {paddingLeft: calculateSizePaddingLeft()}]} >
    
                {IconLeft && IconLeftName &&(
                    <TouchableOpacity onPress={onIconLeftPress} style={styles.button}>
                        <IconLeft name={IconLeftName as any} size={20} color={themas.colors.gray} style={styles.icon}/>
                    </TouchableOpacity>
                )}
                
                <TextInput 
                    style={[
                        styles.input, {width: calculateSizeWidth()}]}
                    {...rest}
                />

                {IconRight && iconRightName &&(
                    <TouchableOpacity onPress={onIconRightPress} style={styles.button}>
                        <IconRight name={iconRightName as any} size={20} color={themas.colors.gray} style={styles.icon}/>
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
});
