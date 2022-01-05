import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function ChatListScreen({navigation}) {
    const [chatlist, setChatlist]=useState([]);

    useEffect(() => {
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3000/chatlist');
            const chatlist = await response.json();
            setChatlist(chatlist);
            /*console.log(chatlist);*/
        }
        getData();
    }, []);

    function renderItem({item}) {
        return <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate('ChatScreen',{id: item.id})}>
            <Image style={styles.image} source={{uri: item.imgPerfilUri}}/>
            <View style={styles.textBox}>
                <Text style={styles.nome}>{item.nomeUsuario}</Text>
                <Text>{item.ultimaMensagem}</Text>
            </View>
        </TouchableOpacity>;
    }

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <FlatList
                data={chatlist}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    chat:  {
        height: 70,
        flexDirection: 'row',
        margin: 10,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#32cd32',
        borderWidth: 3,
    },
    textBox: {
        justifyContent: 'center',
        margin: 5,
    },
    nome: {
        fontWeight: 'bold',
    },

});