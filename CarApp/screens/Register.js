import { View, Text,  TextInput, StyleSheet, TouchableOpacity  } from 'react-native'
import React from 'react'

export default function Register() {
  return (
    <View style={styles.container}>
    <TextInput style={styles.input1} placeholder='Name' />
    <TextInput style={styles.input2} placeholder='Address' />
    <TextInput style={styles.input2} placeholder='Con Number' />
    <TextInput style={styles.input2} placeholder='Password' />
    <TouchableOpacity
      style={styles.btn}
    >
      <Text style={{ color: '#ffff', fontSize: 20 }}>Register</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
    input1: {
      marginTop: '40%',
      borderWidth: 1,
      padding: 10,
      width: '80%',
  
    },
    input2: {
      marginTop: '5%',
      borderWidth: 1,
      padding: 10,
      width: '80%',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center'
  
    },
    btn: {
      width: '40%',
      padding: 5,
      backgroundColor: "#2f3640",
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '3%',
      borderRadius: 100
  
    }
  });