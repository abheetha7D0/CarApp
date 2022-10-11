import { View, Text, TextInput, StyleSheet, ScrollView, Alert, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Button, Icon, Input, Pressable } from "native-base";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');


  return (
    <NativeBaseProvider>
      <ScrollView style={{ flex: 1, backgroundColor: '#080808' }}>
        <View style={styles.container}>
          <View style={styles.container2}>
            <Input
              marginTop={2}
              mx="3"
              placeholder="Enter your full name"
              w="80%" focusOutlineColor={'#ffca05'}
              fontSize={15} color={'black'}
              bgColor={'yellow.100'}
              onChangeText={e => {
                setName(e);
              }}


            />
            <Input
              marginTop={5}
              mx="3"
              placeholder="Enter your email address"
              w="80%" focusOutlineColor={'#ffca05'}
              fontSize={15} color={'black'}
              bgColor={'yellow.100'}
              onChangeText={e => {
                setEmail(e);
              }}


            />
            <Input
              marginTop={5}
              mx="3"
              placeholder="Enter your phone number"
              w="80%" focusOutlineColor={'#ffca05'}
              fontSize={15} color={'black'}
              bgColor={'yellow.100'}
              onChangeText={e => {
                setContact(e);
              }}


            />
            <Input
              marginTop={5}
              mx="3"
              placeholder="Enter your Password"
              w="80%" focusOutlineColor={'#ffca05'}
              fontSize={15} color={'black'}
              bgColor={'yellow.100'}
              onChangeText={e => {
                setPassword(e);
              }}

              secureTextEntry={true}
            />
          </View>
          <Button
            marginTop={5}
            size="lg"
            variant="subtle"
            bgColor={'#ffca05'}
            width={'30%'}
            color={'white'}
            _text={{
              color: "#080808",
              fontSize: "md",
            }}
            onPress={async e => {
              name != '', email != '', password != '', contact != ''

                ? fetch(
                  'http://192.168.1.4:4000/user/register',
                  {
                    method: 'POST',
                    body: JSON.stringify({
                      name: name,
                      phoneNumber: contact,
                      password: password,
                      email: email,
                    }),
                    headers: {
                      'Content-Type': 'application/json;charset=UTF-8',
                    },
                  },
                )
                  .then(response => {
                    Alert.alert('User Saved Successfully !');
                  })
                  .catch(err => {
                    Alert.alert('Something went wrong, Try again !');
                  })
                : Alert.alert('Please Fill Relevant Fields');
            }}
          >
            Register
          </Button>
          
        </View>
      </ScrollView>
    </NativeBaseProvider>
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
    alignItems: 'center',

  },
  container: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',

  },
  btn: {
    width: '40%',
    padding: 5,
    backgroundColor: "#2f3640",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100

  }
});