import { View, Text,Image, SafeAreaView, } from 'react-native'
import React, {useEffect, useState}  from 'react'

export default function Spalsh({ navigation }) {
    const [isGo, setIsGo] = useState(true);
  
    useEffect(() => {
      if (isGo == true) {
        setTimeout(() => {
            navigation.navigate("Login")
          setIsGo(false);
        }, 2000);
      }
    });
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#080808'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/icon.png')}
          style={{width: 150, height: 150}}
        />
      </View>
      <View
        style={{bottom: 300, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#ffca05'}}>
          CarApp
        </Text>
      </View>
    </SafeAreaView>
  )
}