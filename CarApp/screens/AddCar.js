import { View, Text, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextArea, NativeBaseProvider, Button, TextField } from "native-base";
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
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.section1}>

                        <View style={styles.section1_1}>
                            <View style={styles.section1_2}>
                                <Text style={styles.text1}>Upload Image</Text>
                            </View>
                            <View style={styles.section1_2}>
                                <Button size="sm" onPress={async e => {
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
                        </View>
                    </View>
                    <View style={styles.section2}>
                        <Image source={imageUri} />
                        <TextInput
                            value={carObj.image}
                            style={styles.input1}
                            editable={false} width={'80%'}
                            placeholder='Image'
                        />

                    </View>
                    <View style={styles.section3}>
                        <TextInput
                            style={styles.input1}
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
                        <TextInput
                            style={styles.input1}
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
                        <TextInput
                            style={styles.input1}
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
                        <TextInput
                            style={styles.input1}

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
                        <TextInput
                            style={styles.input1}
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
                            size="md"
                            variant="outline"
                            width={'70%'}
                            onPress={async e => {
                                carObj.regNumber != ''
                                
                                    ? fetch(
                                        'http://192.168.1.3:4000/cars',
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
    },
    text1: {
        fontSize: 20
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