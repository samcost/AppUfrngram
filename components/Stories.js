import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';


export default function Stories(){
    const [stories, setStories]= useState([]);

    useEffect(function(){
        async function getData(){
          const response = await fetch('https://mobile.ect.ufrn.br:3000/stories');
          const storiesServidor = await response.json();
          /*console.log('retorno da conexão:',stories);*/
          setStories(storiesServidor)
        }
        getData();
    }, [])

    function renderItem({item}){
        return <View style={styles.story}>
                <Image style={styles.imgstory} source={{uri: item.imgPerfilUri}}/>
                <Text>{item.nomeUsuario}</Text>
            </View>
    }

    return(
        <View style={styles.storys}>
            <FlatList 
                data={stories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    storys:{
      height: 90,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    story:{
      height: 90,
      width: 90,
      alignItems: 'center',
    },
    imgstory:{
      width: 70,
      height: 70,
      borderRadius: 35,
      borderColor: '#32cd32',
      borderWidth: 3,
    },
});