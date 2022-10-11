import { View, Text, TextInput, StyleSheet, SafeAreaView, Alert, Image } from 'react-native'
import React, { useState, } from 'react'
import { NativeBaseProvider, Button, Icon, Input, Pressable } from "native-base";


export default function Login({ navigation }) {
  const [loginObj, setLoginObj] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = React.useState(false);
  return (
    <NativeBaseProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#080808' }}>
        <View style={styles.container}>

          <Input
            mx="3"
            placeholder="Enter Your Email"
            w="80%" focusOutlineColor={'#ffca05'}
            fontSize={15} color={'black'}
            bgColor={'yellow.100'}
            onChangeText={e => {
              setLoginObj(prevState => {
                return {
                  ...loginObj,
                  email: e,
                };
              });
            }}
            value={loginObj.email}
            style={styles.input1}
          />
          <Input
            marginTop={5}
            mx="3"
            placeholder="Enter Your Password"
            w="80%" focusOutlineColor={'#ffca05'}
            fontSize={15} color={'black'}
            bgColor={'yellow.100'}
            onChangeText={e => {
              setLoginObj(prevState => {
                return {
                  ...loginObj,
                  password: e,
                };
              });
            }}
            value={loginObj.password}
            secureTextEntry={true}
          />

          <Button
            marginTop={4}
            size="lg"
            variant="subtle"
            bgColor={'#ffca05'}
            width={'30%'}
            color={'white'}
            _text={{
              color: "#080808",
              fontSize: "md",
            }}
            onPress={async () => {
              if ((loginObj.email === '') | (loginObj.password === '')) {
                Alert.alert('User Login is Unsuccessful');

              } else {

                let res = await fetch(
                  'http://192.168.1.4:4000/user/login?email=' +
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
                    Alert.alert('Check email and password');
                  });
              }
            }}
          >
            Log In
          </Button>

        </View>
        <View marginTop={'60%'}
          alignContent='center'
          alignItems='center'
        >
          <Button
            width={'30%'}

            size="xs"
            variant="ghost"
            _text={{
              color: "#ffca05",
            }}
            onPress={() => {
              navigation.navigate("Register")
            }}>
            Register Now
          </Button>
        </View>

      </SafeAreaView>
    </NativeBaseProvider>
  )
}
const styles = StyleSheet.create({
  btnText: {

  },
  container: {
    marginTop: '55%',
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