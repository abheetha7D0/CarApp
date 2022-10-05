import { View, Text, StyleSheet, TouchableOpacity,PixelRatio, FlatList,  Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Button, Flex } from "native-base";

export default function Home({ navigation }) {
    const [posts, setPosts] = useState([]);


    const [dataList, setDataList] = useState([]);

    const loadData = async () => {
        dataList.splice(0, dataList.length);
        let res = await fetch('http://192.168.1.3:4000/cars', { method: 'GET' })
            .then(async res => {
                let arr = await res.json();
                console.log(arr);
                setDataList(arr);
            })
            .catch(async res => { });
    };

    useEffect(() => {
        loadData();
    }, [dataList]);


    return (
        <NativeBaseProvider>
            <View style={styles.container}>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <TextInput
                        style={styles.input1}

                        onChangeText={e => {

                        }}

                        placeholder='Search'
                    />
                </View>
                
                <View style={{ flex: 8, }}>
                    <View style={{ padding: 20 }}>
                        
                        <FlatList
                            data={dataList}
                            
                            renderItem={({ item }) =>
                                <TouchableOpacity style={{
                                    backgroundColor: '#fff',
                                    position: 'relative',
                                    borderWidth: 1,
                                    borderColor: '#353b48',
                                    marginBottom: '1%',
                                    padding: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                  }}
                                   onPress={() => { console.log("hello"); }}>
                                    <Flex
                                        flexDirection={'row'}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            height: PixelRatio.getPixelSizeForLayoutSize(36),
                                        }}>
                                        <Flex
                                            flexDirection={'row'}
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                            <Flex
                                                style={{
                                                    position: 'relative',
                                                    width: '50%',
                                                    height: '100%',
                                                }}>
                                                <Image
                                                    resizeMode="stretch"
                                                    source={{ uri: item.image }}
                                                    style={{ width: '100%', height: '100%' }}></Image>
                                            </Flex>
                                            <Flex
                                                flexDirection={'column'}
                                                style={{
                                                    width: '50%',
                                                    height: '100%',
                                                }}>
                                                <Flex
                                                    style={{
                                                        width: '100%',
                                                        height: '35%',
                                                    }}>
                                                       
                                                    <Text
                                                    
                                                        color={'white'}
                                                        fontSize={'sm'}
                                                        style={{ marginBottom: 5, marginLeft: '10%' }}>
                                                        Brand : {item.brand}
                                                    </Text>
                                                </Flex>
                                                <Flex
                                                    style={{
                                                        width: '100%',
                                                        height: '35%',
                                                    }}>
                                                    <Text
                                                        color={'white'}
                                                        fontSize={'sm'}
                                                        style={{ marginBottom: 5, marginLeft: '10%' }}>
                                                        Reg No : {item.regNumber}
                                                    </Text>
                                                </Flex>
                                                <Flex
                                                    style={{
                                                        width: '100%',
                                                        height: '35%',
                                                        justifyContent: 'center',
                                                    }}>
                                                    <Text
                                                        color={'white'}
                                                        fontSize={'sm'}
                                                        style={{ marginBottom: 5, marginLeft: '10%' }}>
                                                        Price : {item.price}
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
               
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button marginTop={2} size="md" width={'30%'} variant="subtle" colorScheme="blue" onPress={() => { navigation.navigate("ManageCar") }}>
                        Add New Vehicle
                    </Button>
                </View>

            </View>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input1: {
        borderWidth: 1,
        width: '80%',

    },
});