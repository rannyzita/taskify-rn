import React, { useContext, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles'
import { Input } from '../../components/Input'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Ball } from "../../components/ball";
import { Flag } from '../../components/flag';
import { themas } from '../../global/themes';
import { AuthContextList } from "../../context/authContext_list";
import { formatDateToBR } from "../../global/functions";
import { Swipeable } from 'react-native-gesture-handler'

export default function List() {

    const {taskList, handleDelete, handleEdit} = useContext<AuthContextType>(AuthContextList)
    const swipeableRefs = useRef<Array<Swipeable | null>>([]);

    const renderRightActions = ()=>  {
        return(<View style={styles.button}>
            <AntDesign 
                name='delete'
                size={20}
                color={'#fff'}
            />
        </View>)
    }

    const renderLeftActions = () => {
        return (
          <View style={[styles.button, { backgroundColor: themas.colors.blueLigth }]}>
            <AntDesign
                name="edit"
                size={20}
                color={"#FFF"}
            />
          </View>
        );
      };

    const handleSwipeOpen = (directions:'right'|'left', item:PropCard, index:any) => {
        if(directions == 'right'){
            handleDelete(item)
        }else {
            handleEdit(item)
        }
        swipeableRefs.current[index]?.close()
    }

    const _renderCard = (item:PropCard, index:any) => {
        const color = item.flag == 'opcional'?themas.colors.blueLigth:themas.colors.red
        return (
            <Swipeable
                ref ={(ref) => swipeableRefs.current[index] = ref}
                key={index}
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={(directions)=>handleSwipeOpen(directions, item, index)}
            >
                <View style={styles.card}>
                    <View style={styles.rowCard}>
                        <View style={styles.rowCardLeft}>
                            <Ball color={color}/>
                            <View>
                                <Text style={styles.titleCard}>{item.title}</Text>
                                <Text style={styles.descriptionCard}>{item.description}</Text>
                                <Text style={styles.descriptionCard}>até {formatDateToBR(item.timeLimit)}</Text>
                            </View>
                        </View>
                        
                        <Flag 
                            caption={item.flag} color={color}
                        />
                    </View>
                </View>
            </Swipeable>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Bom dia, <Text style={{fontWeight:'bold'}}>Ranny</Text></Text>
                <View style={styles.boxInput}>
                    <Input IconLeft={MaterialIcons} 
                    IconLeftName="search">
                    </Input>
                </View>
            </View>
            <View style={styles.boxList}>
                <FlatList
                data={taskList}
                style={{marginTop:40,
                    paddingHorizontal:30,
                }}    
                keyExtractor={(item, index)=>item.item.toString()}
                renderItem={({item, index})=>{
                    return (_renderCard(item, index))
                }}
                >
                </FlatList>
            </View>
        </View>
    )
}
