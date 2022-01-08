import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({navigation}) {

  const [user, setUser] = useState('');
  const [password, setPassword]= useState('');

  async function logar(){

    const json = {
      user,
      password,
    };

    const headerOptions={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    };
    const response = await fetch ('https://mobile.ect.ufrn.br:3000/login', headerOptions);
    /*console.log(response.status)*/
    if (response.status === 200){
      const token = await response.text();
      await AsyncStorage.setItem('token', token);
      /*console.log('TOKEN:'+token)*/
      /*const token = await AsyncStorage.getItem('token'); --para usar o token de autenticação em outra tela do app--*/
      navigation.navigate('LoggedTabNavigator');
    } else {
      Alert.alert(
        'Erro',
        'Usuário e/ou senha inválidos',
      );
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.ufrngram} source={require('../assets/img/ufrngram.png')}/>
      <View style={styles.loginContainer}>
        
        <TextInput style={styles.input} placeholder=' Usuário' value={user} onChangeText={setUser}/>

        <TextInput style={styles.input} placeholder=' Senha' value={password} secureTextEntry={true} onChangeText={setPassword}/>

        <TouchableOpacity style={styles.sendButton} onPress={() => logar()}>
            <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: '#F2EBF1',
    justifyContent: 'center',
    margin: 20,
    padding: 30,
    borderRadius: 10,
  },
  ufrngram:{
    width: 110,
    height: 25,
    alignSelf: 'center',
  },
  input:{
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#C7BBBF',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sendButton:{
    padding: 10,
    width:120,
    backgroundColor: '#00E6DC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
});
