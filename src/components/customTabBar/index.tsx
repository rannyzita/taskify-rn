import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from "./styles";
import { AntDesign, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons'
import { themas } from "../../global/themes";
import { AuthContextList } from "../../context/authContext_list";
export default function MyComponent({ state, navigation }: { state: any, navigation: any }) {

    const {onOpen} = useContext<any>(AuthContextList)

    const go = (screenName:string)=>{
        navigation.navigate(screenName)
    }
    return (
        <View style={styles.tabArea}>
            <TouchableOpacity style={styles.tabItem} onPress={()=>go('List')}>
                <AntDesign
                name='bars'
                style={{opacity:state.index === 0?1:0.5, color:themas.colors.primary,
                    fontSize:32
                }}> 
                </AntDesign>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItemButtom} onPress={()=> onOpen()}>
                <View style={{width: '100%',
                    left:14, 
                    top: 4
                }}>
                    <Entypo name='plus'
                    color={'#fff'}
                    size={42}>
                    </Entypo>
                </View>
                <View style={{flexDirection:'row-reverse',
                    width:'100%',
                    right: 10, 
                    bottom: 10
                }}>
                    <MaterialIcons name='edit'
                    color={'#fff'}
                    size={32}>


                    </MaterialIcons>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={()=> go('User')}>
            <FontAwesome
                name='user'
                style={{opacity:state.index === 1?1:0.2, color:themas.colors.primary,
                    fontSize:32
                }}>
                </FontAwesome>
            </TouchableOpacity>
        </View>
    )
}