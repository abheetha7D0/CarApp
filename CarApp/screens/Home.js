import { View, Text, StyleSheet, TouchableOpacity, PixelRatio, FlatList, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeBaseProvider, Button, Flex, Input } from "native-base";
import { storeCar } from './StoreCar';

export default function Home({ navigation }) {
    const [posts, setPosts] = useState([]);


    const [dataList, setDataList] = useState([]);

    const loadData = async () => {
        dataList.splice(0, dataList.length);
        let res = await fetch('http://192.168.1.4:4000/cars', { method: 'GET' })
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
                    <Input
                        mx="3"
                        placeholder="Search"
                        w="80%" focusOutlineColor={'#ffca05'}
                        fontSize={15} color={'black'}
                        bgColor={'yellow.100'}
                        onChangeText={e => {

                        }}

                    />

                </View>

                <View style={{ flex: 8, }}>
                    <View style={{ padding: 20 }}>

                        <FlatList
                            data={dataList}

                            renderItem={({ item }) =>
                                <TouchableOpacity style={{
                                    backgroundColor: '#f6e58d',
                                    position: 'relative',
                                    marginBottom: '1%',
                                    padding: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }} onPress={e => {
                                    storeCar.regNumber = item.regNumber;
                                    navigation.navigate('ManageCar');
                                }}
                                >
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
                                                    style={{ width: '50%', height: '100%' }}>
                                                    
                                                </Image>
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
                                                        style={{color:'black' ,marginBottom: 5, marginLeft: '10%' }}>
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
                                                        style={{color:'#080808' , marginBottom: 5, marginLeft: '10%' }}>
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
                                                        style={{color:'#080808' , marginBottom: 5, marginLeft: '10%' }}>
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
                    <Button
                        size="lg"
                        variant="subtle"
                        bgColor={'#ffca05'}
                        width={'40%'}
                        color={'white'}
                        _text={{
                            color: "#080808",
                        }}
                        onPress={() => { navigation.navigate("AddCar") }}>
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
        backgroundColor: '#080808'
    },
    input1: {
        borderWidth: 1,
        width: '80%',

    },
});