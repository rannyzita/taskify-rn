import React from 'react'

import { View, Text, Image, TextInput, TouchableOpacity,Alert, ActivityIndicator } from 'react-native'

import Logo from '../../assets/logo.png';
import { styles } from './styles'
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [laoding, setLaoding] = React.useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    async function handleLogin() {
        try {
            setLaoding(true);
            // Simula um delay para demonstrar carregamento
            if (!email || !password) {
                return Alert.alert('Atenção','Preencha todos os campos.');
            }

            setTimeout(()=>{
                if (email == 'ranny@gmail.com' && password == '123456') {
                    Alert.alert('Logado com sucesso!');
                    
                } else {
                    Alert.alert('Falha na autenticação!','Usuário ou senha inválidos.');
                }
                setLaoding(false);
            },3000)

        } catch (error) {
            console.error(error);
        } 
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxTop}>
                <Image source={Logo}>
                </Image>
                <Text style={styles.text}>Bem vindo de volta!</Text>
            </View>
            <View style={styles.boxMid}>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    title="ENDEREÇO E-MAIL"
                    IconRight={MaterialIcons}
                    iconRightName='email'
                ></Input>
                <Input                                           
                    value={password}
                    onChangeText={setPassword}
                    title="SENHA"
                    secureTextEntry={secureTextEntry}
                    IconRight={Octicons}
                    iconRightName={secureTextEntry ? 'eye-closed' : 'eye'} 
                    onIconRightPress={() => setSecureTextEntry(!secureTextEntry)}
                ></Input>
            </View>
            <View style={styles.boxBottom}>
                <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
                    {
                        laoding?<ActivityIndicator color={'#FFF'} size={'small'}/>
                    :
                        <Text style={styles.textButton}>Entrar</Text>}
                    
                </TouchableOpacity>
            </View>
            <Text style={styles.textBottom}>Não tem conta? <Text  style={styles.textBottomCreate}>Crie agora</Text></Text>
        </View>
    )
}