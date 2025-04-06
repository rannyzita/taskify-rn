import React from 'react'

import { View, Text, Image, TextInput, TouchableOpacity,Alert, ActivityIndicator } from 'react-native'

import Logo from '../../assets/logo.png';
import { styles } from './styles'
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function Login() {

    const Navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = React.useState('a');
    const [password, setPassword] = React.useState('a');
    const [laoding, setLaoding] = React.useState(false);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    async function getLogin() {
        try {
            setLaoding(true);
            // Simula um delay para demonstrar carregamento
            if (!email || !password) {
                return Alert.alert('Atenção','Preencha todos os campos.');
            }

            Navigation.reset({routes:[{name:'BottomRoutes'}]});

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
        } finally {
            setLaoding(false);
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
                <Button text="ENTRAR" loading={laoding} onPress={()=>getLogin()}/>
            </View>
            <Text style={styles.textBottom}>Não tem conta? <Text  style={styles.textBottomCreate}>Crie agora</Text></Text>
        </View>
    )
}