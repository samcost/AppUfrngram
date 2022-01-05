import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default function Header({navigation}){
    return(
        <View style={styles.header}>
            <Image style={styles.ufrngram} source={require('../assets/img/ufrngram.png')}/>
            <View style={styles.icones}>
                <FontAwesome5 style={styles.icones} name="heart" size={25} />
                <FontAwesome5 style={styles.icones} name="paper-plane" size={25} onPress={() => navigation.navigate('ChatListScreen')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    header:{
      flexDirection: 'row',
      height: 50,
      marginLeft:10,
      alignItems: 'center',
      justifyContent:'space-between',
    },
    icones:{
      flexDirection: 'row',
      color:'black',
      marginRight: 10,
      marginLeft:10,
      alignSelf: 'center',
    },
    ufrngram:{
      width: 110,
      height: 25,
      alignSelf: 'center',
    },
  });