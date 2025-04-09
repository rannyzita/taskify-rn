// src\context\AuthContextList.tsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { Modalize } from "react-native-modalize";
import { Input } from '../components/Input';
import { themas } from '../global/themes';
import { Flag } from '../components/flag';

export const AuthContextList: any = createContext({});

  const flags = [
    { caption: 'Urgente', color: themas.colors.red},
    { caption: 'Opcional', color: themas.colors.blueLigth}
  ]
export const AuthProviderList = (props: any): any => {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef?.current?.open();
  };

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
          />
        </TouchableOpacity>
      ))
    )
  }

  const _container = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
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
               />
              <Input 
                title='Descrição:'
                labelStyle={styles.label}
                height={100}
                multiline
                numberOfLines={5}
              />
              
              <View style={{width:'40%'}}>
                <Input 
                  title='Tempo Limite:'
                  labelStyle={styles.label}
                />
              </View>
              <View style={styles.containerFlag}>
                <Text style={styles.label}>Flags:</Text>
                <View style={styles.Rowflags}>
                  {_renderFlags()}
                </View>
              </View>
            </View>
        </View>
    )
  };

  return (
    <AuthContextList.Provider value={{ onOpen }}>
      {props.children}
      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: Dimensions.get("window").height / 1.3 }}
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