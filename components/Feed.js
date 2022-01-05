import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default function Feed(){

  const [feed, setFeed]= useState([]);

  useEffect(function(){
      async function getData(){
        const response = await fetch('https://mobile.ect.ufrn.br:3000/feed');
        const feedServidor = await response.json();
        /*console.log('retorno da conexão:',feed);*/
        setFeed(feedServidor);
      }
      getData();
  }, [])

    function renderItem({item}){
        return <View >
            <View style={styles.postheader}>
                <View style={styles.postheaderesquerda}>
                    <Image style={styles.postheaderimg} source={{uri: item.imgPerfilUri}}/>
                    <Text style={styles.texto}>{item.nomeUsuario}</Text>
                </View>
                <FontAwesome5 style={styles.icones} name="ellipsis-h" size={20} />
            </View>
            <Image style={styles.postimg} aspectRatio={item.aspectRatio} source={{uri: item.imgPostUri}}/>
            <View style={styles.footer}>
                <View style={styles.footericonleft}>
                    <FontAwesome5 style={styles.footericon} name="heart" size={25} />
                    <FontAwesome5 style={styles.footericon} name="comment" size={25} />
                    <FontAwesome5 style={styles.footericon} name="paper-plane" size={25} />
                </View>
                <View style={styles.footericoneright}>
                    <FontAwesome5 style={styles.icones} name="bookmark" size={25} />
                </View>
            </View>
            <Text style={styles.descricao}>
              Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
            </Text>
        </View>
    }

    return(
        <View style={styles.feed}>
            <FlatList
                data={feed}
                renderItem={renderItem}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    feed:{
      flex: 1,
    },
    postheader:{
      height: 60,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'space-between',
      borderTopWidth: 0.3,
    },
    postheaderesquerda:{
      flexDirection:'row',
      margin:5,
    },
    postheaderimg:{
      height: 50,
      width:50,
      borderRadius: 25,
    },
    postimg:{
      width: '100%',
      height: undefined,
    },
    icones:{
      color:'black',
      alignSelf: 'center',
      margin: 10,
    },
    texto:{
      padding: 10,
      color:'black',
      fontSize: 20,
      fontWeight: 'bold',
    },
    footer:{
      height:60,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:'space-between',
    },
    footericon:{
      color:'black',
      margin: 10,
    },
    footericonleft:{
        flexDirection:'row',
    },
    footericoneright:{
        flexDirection:'row',
        margin:5,
    },
    descricao:{
        paddingBottom:10,
        marginLeft:10,
        textAlignVertical: 'center',
    },
  });