// src\context\AuthContextList.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { Modalize } from "react-native-modalize";
import { Input } from '../components/Input';
import { themas } from '../global/themes';
import { Flag } from '../components/flag';
import CustomDateTimePicker from "../components/customDatePicker";

export const AuthContextList: any = createContext({});

  const flags = [
    { caption: 'Urgente', color: themas.colors.red},
    { caption: 'Opcional', color: themas.colors.blueLigth}
  ]
export const AuthProviderList = (props: any): any => {
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('urgente');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const onOpen = () => {
    modalizeRef?.current?.open();
  };

  const onClose = () => {
    modalizeRef?.current?.close();
  }

  // Abre automaticamente o modal
  useEffect(() => {
    onOpen()
  },[])

  const _renderFlags = () => {
    return (
      flags.map((item, index) => (
        <TouchableOpacity key={index}>
          <Flag
            caption={item.caption}
            color={item.color}
            //selected
          />
        </TouchableOpacity>
      ))
    )
  }

  const _container = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding':'height'}
      
      >
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> onClose()}>
              <MaterialIcons 
                name='close'
                size={30}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Criar Tarefa</Text>
            <TouchableOpacity>
                <AntDesign 
                  name='check'
                  size={30}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Input 
            title='Título:'
            labelStyle={styles.label}
            value={title}
            onChangeText={setTitle}
            />
          <Input 
            title='Descrição:'
            labelStyle={styles.label}
            value={description}
            onChangeText={setDescription}
            height={100}
            multiline
            numberOfLines={5}
          />
          
          <View style={{width:'40%'}}>
            {/* <Input 
              title='Tempo Limite:'
              labelStyle={styles.label}
            /> */}
            <CustomDateTimePicker
              onDateChange={()=>{}}
              setShow={()=>{}}
              show={true}
              type={'date'}
            />
          </View>
          <View style={styles.containerFlag}>
            <Text style={styles.label}>Flags:</Text>
            <View style={styles.Rowflags}>
              {_renderFlags()}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  };

  return (
    <AuthContextList.Provider value={{ onOpen }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: Dimensions.get('window').height/1.7}}
        adjustToContentHeight={true}
        >
      {_container()}
    </Modalize>
    </AuthContextList.Provider>
  );
};

export const useAuth = () => useContext(AuthContextList);

export const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  header: {
    width: '100%',
    height: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  content: {
    width: '100%',
    paddingHorizontal:20
  },
  containerFlag: {
    width: '100%',
    padding: 10
  },
  label: {
    fontWeight: 'bold',
    color: '#000'
  },
  Rowflags: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10
  }
})