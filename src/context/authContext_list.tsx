// src\context\AuthContextList.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { Modalize } from "react-native-modalize";
import { Input } from '../components/Input';
import { themas } from '../global/themes';
import { Flag } from '../components/flag';
import CustomDateTimePicker from "../components/customDatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContextList: any = createContext({});

  const flags = [
    { caption: 'urgente', color: themas.colors.red},
    { caption: 'opcional', color: themas.colors.blueLigth}
  ]
export const AuthProviderList = (props: any): any => {
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFlag, setSelectedFlag] = useState('urgente');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);  
  const [item, setItem] = useState(0); 
  const [taskList, setTaskList] = useState<PropCard[]>([]);
  const [taskListBackup, setTaskListBackup] = useState<PropCard[]>([]);

  const onOpen = () => {
    modalizeRef?.current?.open();
  };

  const onClose = () => {
    modalizeRef?.current?.close();
  }

  // Abre automaticamente o modal
  useEffect(() => {
    get_taskList()
  },[])

  const _renderFlags = () => {
    return (
      flags.map((item, index) => (
        <TouchableOpacity key={index} onPress={()=>{
          setSelectedFlag(item.caption)
        }}>
          <Flag
            caption={item.caption}
            color={item.color}
            selected={item.caption == selectedFlag}
          />
        </TouchableOpacity>
      ))
    )
  }
  
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleTimeChange = (date: Date) => {
    setSelectedTime(date)
  }

  const handleSave = async() => {
    if(!title || !description || !selectedFlag) {
      return Alert.alert('Atenção', 'Preencha todos os campos')
    }
    try {
      const newItem = {
        item:item !== 0?item:Date.now(),
        title,
        description,
        flag:selectedFlag,
        timeLimit: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        ).toISOString(),
      }

      const storageData = await AsyncStorage.getItem('taskList');
      // console.log(storageData)
      let taskList:Array<any> = storageData?JSON.parse(storageData):[]

      const itemIndex = taskList.findIndex((task)=>task.item === newItem.item)

      if(itemIndex >= 0){
        taskList[itemIndex] = newItem
      }else {
        taskList.push(newItem)
      }
      
       // asyncStorage so permite salvar em formato string 
      await AsyncStorage.setItem('taskList', JSON.stringify(taskList)) 

      setTaskList(taskList) 
      setTaskListBackup(taskList)
      setData()
      onClose()
    } catch (error) {
      console.log('Erro ao salvar tarefa',error)
    }
  }

  const setData = ()=>(
    setTitle(''),
    setDescription(''),
    setSelectedFlag('urgente'),
    setItem(0),
    setSelectedDate(new Date()),
    setSelectedTime(new Date())
  )

  async function get_taskList() {
    try {
      const storageData = await AsyncStorage.getItem('taskList')
      const taskList = storageData ? JSON.parse(storageData):[]
      setTaskList(taskList)
      setTaskListBackup(taskList)
    } catch (error) {
      console.log('Erro em:', error)
    }
  }

  type Task = {
    item: string;
  };

  const handleDelete = async (itemToDelete: Task)=>{
    try {
      const storageData = await AsyncStorage.getItem('taskList')
      const taskList:Array<any> = storageData?JSON.parse(storageData):[]
  
      const updatedTaskList = taskList.filter(item=>item.item !==itemToDelete.item)
  
      await AsyncStorage.setItem('taskList', JSON.stringify(updatedTaskList))

      setTaskList(updatedTaskList)
      setTaskListBackup(updatedTaskList)
    } catch (error) {
      console.log('Erro ao excluir o item', error)
    }
  }

  const handleEdit = async (itemToEdit: PropCard) => {
    try {
      setTitle(itemToEdit.title)
      setDescription(itemToEdit.description)
      setItem(itemToEdit.item)
      
      const timeLimit = new Date(itemToEdit.timeLimit)
      
      setSelectedFlag(itemToEdit.flag)
      setSelectedDate(timeLimit);
      setSelectedTime(timeLimit);

      onOpen()
    } catch (error) {
      console.log('Erro ao editar o item', error)
    }
  }

  const filter = (t: string) => {
  
    const array = taskListBackup;
    const campos = ['title', 'description'];
  
    if (t){
      const searchTerm = t.trim().toLowerCase();
    
      const filteredArray = array.filter((item) => {
        for (let i = 0; i < campos.length; i++) {
          if(item[campos[i]].trim().toLowerCase().includes(searchTerm)){
            return true 
          }
        }
      });
      setTaskList(filteredArray)
    }else {
      setTaskList(array)
    }
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
            <TouchableOpacity onPress={()=>handleSave()}>
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
            textAlignVertical="top"
          />
          
          <View style={{width:'40%'}}>
            <View style={{flexDirection: 'row', gap:10, width:'100%'}}>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{width:200}}>
                <Input
                  title="Data limite"
                  labelStyle={styles.label}
                  editable={false}
                  value={selectedDate.toLocaleDateString()}
                  onPress={() => setShowDatePicker(true)}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{width:120}}>
                <Input
                  title="Hora limite"
                  labelStyle={styles.label}
                  editable={false}
                  value={selectedTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true // ou false se quiser no formato 24h
                  })}
                  onPress={() => setShowTimePicker(true)}
                />
              </TouchableOpacity>
            </View>

            <CustomDateTimePicker
              onDateChange={handleDateChange}
              setShow={setShowDatePicker}
              show={showDatePicker}
              type={'date'}
            />

            <CustomDateTimePicker
              onDateChange={handleTimeChange}
              setShow={setShowTimePicker}
              show={showTimePicker}
              type={'time'}
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
    <AuthContextList.Provider value={{ onOpen, taskList, handleDelete, handleEdit,filter }}>
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