import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert, PixelRatio } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextArea, NativeBaseProvider, Button, Flex, Input } from "native-base";
import { launchImageLibrary } from 'react-native-image-picker';
import { storeCar } from './StoreCar';

export default function AddCar() {


    const [carObj, setCarObj] = useState({
        regNumber: '',
        brand: '',
        date: '',
        location: '',
        image: '',
        price: '',
    });

    useEffect(() => {
        setCarObj(() => {
            return {
                ...carObj,
                regNumber: storeCar.regNumber,
            };
        });
    }, []);

    const [imageUri, setImageUri] = useState('')
    const openCamera = () => {
        let options = {
            storageOption: {

                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true,
        }

        launchCamera(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                const source = { uri: 'data:image/jpeg;base64' + response.base64 };
                setImageUri(source)
            }
        });
    }

    return (
        <NativeBaseProvider>
            <ScrollView style={styles.container}>
                <View >

                    <View style={styles.section3}>

                        <Flex
                            style={{
                                marginTop: 2,
                                position: 'relative',
                                width: '50%',
                                height: '100%',
                                borderWidth: 1,
                                borderColor: 'yellow'
                            }}>
                            <Image
                                resizeMode="stretch"
                                source={{ uri: carObj.image }}
                                style={{ width: '100%', height: PixelRatio.getPixelSizeForLayoutSize(70), }}
                            >

                            </Image>
                        </Flex>
                    </View>
                    <View style={styles.section3}>
                        <Button size="sm"
                            marginTop={4}
                            variant="subtle"
                            bgColor={'yellow.100'}
                            width={'30%'}
                            color={'white'}
                            _text={{
                                color: "#080808",
                                fontSize: "md",
                            }}
                            onPress={async e => {
                                const image = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 })
                                let images = image.assets
                                images.forEach(e => {
                                    let uri = e.uri
                                    console.log(uri)
                                    setCarObj(prevState => {
                                        return {
                                            ...carObj,
                                            image: uri,
                                        };
                                    });
                                })

                            }}>Upload</Button>
                    </View>

                    <View style={styles.section3}>
                        <Input
                            focusOutlineColor={'#ffca05'}
                            fontSize={15} color={'black'}
                            bgColor={'yellow.100'}
                            w="80%"
                           
                            
                            onChangeText={e => {
                                setCarObj(prevState => {
                                    return {
                                        ...carObj,
                                        regNumber: e,
                                    };
                                });
                            }}
                            value={carObj.regNumber}
                            placeholder='Reg Number'
                        />
                    </View>
                    <View style={styles.section3}>
                        <Input
                            w="80%"
                            focusOutlineColor={'#ffca05'}
                            fontSize={15} color={'black'}
                            bgColor={'yellow.100'}
                            onChangeText={e => {
                                setCarObj(prevState => {
                                    return {
                                        ...carObj,
                                        brand: e,
                                    };
                                });
                            }}
                            value={carObj.brand}
                            placeholder='Brand'
                        />
                    </View>
                    <View style={styles.section3}>
                        <Input
                            w="80%"
                            focusOutlineColor={'#ffca05'}
                            fontSize={15} color={'black'}
                            bgColor={'yellow.100'}
                            onChangeText={e => {
                                setCarObj(prevState => {
                                    return {
                                        ...carObj,
                                        location: e,
                                    };
                                });
                            }}
                            value={carObj.location}
                            placeholder='location'
                        />
                    </View>
                    <View style={styles.section3}>
                        <Input
                            focusOutlineColor={'#ffca05'}
                            fontSize={15} color={'black'}
                            bgColor={'yellow.100'}
                            w="80%"
                            onChangeText={e => {
                                setCarObj(prevState => {
                                    return {
                                        ...carObj,
                                        price: e,
                                    };
                                });
                            }}
                            value={carObj.price}
                            placeholder='Price'
                        />
                    </View>
                    <View style={styles.section3}>
                        <Input
                            focusOutlineColor={'#ffca05'}
                            fontSize={15} color={'black'}
                            bgColor={'yellow.100'}
                            w="80%"
                            onChangeText={e => {
                                setCarObj(prevState => {
                                    return {
                                        ...carObj,
                                        date: e,
                                    };
                                });
                            }}
                            value={carObj.date}
                            placeholder='Date'
                        />
                    </View>
                    <View style={styles.section4}>
                        <Button
                            marginTop={4}
                            size="md"
                            variant="subtle"
                            bgColor={'#ffca05'}
                            width={'30%'}
                            color={'white'}
                            _text={{
                                color: "#080808",
                                fontSize: "md",
                            }}
                            onPress={async e => {
                                carObj.regNumber != ''

                                    ? fetch(
                                        'http://192.168.1.4:4000/cars',
                                        {
                                            method: 'POST',
                                            body: JSON.stringify(carObj),
                                            headers: {
                                                'Content-Type': 'application/json;charset=UTF-8',
                                            },
                                        },
                                    )
                                        .then(res => {
                                            console.log(res);
                                            Alert.alert('Car Save Successfully');
                                        })
                                        .catch(res => {
                                            console.log(res);
                                            Alert.alert('Car Save is Unsuccessful');
                                        })
                                    : Alert.alert('Please Fill Relevant Fields');
                            }}>
                            Save
                        </Button>

                    </View>

                </View>
            </ScrollView>
        </NativeBaseProvider >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080808'
    },
    text1: {
        fontSize: 20,
        color: 'white'
    },
    section1: {
        flex: 4,
        flexDirection: "row",
    },
    section1_1: {
        flex: 4,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    section1_2: {
        flex: 5,
        flexDirection: "row",
        backgroundColor: 'white'
    },
    section2: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section3: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section4: {
        flex: 1,
        alignItems: 'center',
    }
    , input1: {

        borderWidth: 1,
        padding: 10,
        width: '80%',

    },
});