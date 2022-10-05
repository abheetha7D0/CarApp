import { View, Text, TextInput, StyleSheet, TouchableOpacity,  } from 'react-native'
import React, { useState } from 'react'
import { NativeBaseProvider, Button } from "native-base";


export default function Login({ navigation }) {
  const [loginObj, setLoginObj] = useState({
    email: '',
    password: '',
  });

  return (
    <NativeBaseProvider>

      <View style={styles.container}>

        <TextInput
          style={styles.input1}

          onChangeText={e => {
            setLoginObj(prevState => {
              return {
                ...loginObj,
                email: e,
              };
            });
          }}
          value={loginObj.email}

          placeholder='Username'
        />
        <TextInput
          style={styles.input2}
          onChangeText={e => {
            setLoginObj(prevState => {
              return {
                ...loginObj,
                password: e,
              };
            });
          }}
          value={loginObj.password}
          placeholder='Password'
          secureTextEntry={true}
        />
        <Button
          marginTop={2}
          size="lg"
          variant="subtle"
          colorScheme="blue"
          onPress={async () => {
            navigation.navigate('Home');
            if ((loginObj.email === '') | (loginObj.password === '')) {
              Alert.alert('User Login is Unsuccessful');
              
            } else {
              
              let res = await fetch(
                'http:////192.168.1.3:4000/user/login?email=' +
                  loginObj.email +
                  '&password=' +
                  loginObj.password,
                {
                  method: 'GET',
                },
              )
                .then(async res => {
                  let bool = await res.json();
                  console.log(bool);
                  if (bool === true) {
                    console.log(bool);
                    setLoginObj(prevState => {
                      return {
                        email: '',
                        password: '',
                      };
                    });
                    navigation.navigate('Home');
                  }
                })
                .catch(async res => {
                  Alert.alert('User Login is Unsuccessful');
                });
            }
          }}
        >
          Log In
        </Button>
        <Button marginTop={1} size="xs" variant="ghost" colorScheme="blue" onPress={() => { navigation.navigate("Register") }}>
          Register Now
        </Button>
      </View>
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

  },
  rBtn: {
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