import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmployee = ({ navigation, route }) => {

    const getDetail = (type) => {
        if (route.params) {
            switch (type) {
                case "name":
                    return route.params.name
                case "phone":
                    return route.params.phone
                case "email":
                    return route.params.email
                case "salary":
                    return route.params.salary
                case "picture":
                    return route.params.picture
                case "position":
                    return route.params.position
            }
        }
        return ""
    }

    const [name, setName] = useState(getDetail("name"));
    const [phone, setPhone] = useState(getDetail("phone"));
    const [email, setEmail] = useState(getDetail("email"));
    const [salary, setSalary] = useState(getDetail("salary"));
    const [picture, setPicture] = useState(getDetail("picture"));
    const [position, setPosition] = useState(getDetail("position"));
    const [model, setModel] = useState(false);
    const [enableshift, setEnableshift] = useState(false);



    const pickFromGallary = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            console.log(data);
            if (!data.cancelled) {
                let newFile = { uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `test/${data.uri.split(".")[1]}` }
                handelUpload(newFile);
            }
        } else {
            Alert.alert("Give Permission to work");
        }
    }


    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA);
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
            console.log(data);
            if (!data.cancelled) {
                let newFile = { uri: data.uri, type: `test/${data.uri.split(".")[1]}`, name: `test/${data.uri.split(".")[1]}` }
                handelUpload(newFile);
            }
        } else {
            Alert.alert("Give Permission to work");
        }
    }

    const handelUpload = (image) => {
        const data = new FormData();
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append('cloud_name', 'ubj203')

        fetch("https://api.cloudinary.com/v1_1/ubj203/image/upload", {
            method: 'post',
            body: data
        }).then(res => res.json())
            .then(data => {
                setPicture(data.url);
            })
    }


    const postData = () => {
        fetch("http://192.168.1.105:5000/Api/postData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                navigation.navigate("Home")
            })
            .catch(err => {
                Alert.alert("Something went wrong!")
            })
    }

    const updataData = () => {
        fetch("http://192.168.1.105:5000/Api/updateData/" + route.params._id, {
            method: "patch",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert("Data Updated Successfully")
                navigation.navigate("Profile")
            })
            .catch(err => {
                Alert.alert("Something went wrong!")
            })
    }

    console.log(picture);
    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableshift}>
            <View>
                <TextInput
                    style={styles.inputStyle}
                    label="Name"
                    value={name}
                    onFocus={() => { setEnableshift(false) }}
                    onChangeText={(text) => { setName(text) }}
                />
                <TextInput
                    style={styles.inputStyle}
                    label="Phone"
                    value={phone}
                    keyboardType="number-pad"
                    onFocus={() => { setEnableshift(false) }}
                    onChangeText={(text) => { setPhone(text) }}
                />
                <TextInput
                    style={styles.inputStyle}
                    label="Email"
                    value={email}
                    onFocus={() => { setEnableshift(false) }}
                    onChangeText={(text) => { setEmail(text) }}
                />
                <TextInput
                    style={styles.inputStyle}
                    label="Salary"
                    value={salary}
                    onFocus={() => { setEnableshift(true) }}
                    onChangeText={(text) => { setSalary(text) }}
                />

                <TextInput
                    style={styles.inputStyle}
                    label="Position"
                    value={position}
                    onFocus={() => { setEnableshift(true) }}
                    onChangeText={(text) => { setPosition(text) }}
                />

                <Button style={styles.bb} icon="upload-multiple" mode="contained" onPress={() => { setModel(true) }}>
                    Upload Photo
            </Button>

                {
                    route.params ?
                        <Button style={styles.bb} icon="update" mode="contained" onPress={() => { updataData() }}>
                            Update
                        </Button> :
                        <Button style={styles.bb} icon="content-save" mode="contained" onPress={() => { postData() }}>
                            Upload
                        </Button>
                }

                <Modal
                    animationType="slide"
                    visible={model}
                    transparent={true}>
                    <View style={styles.modelView}>
                        <View style={styles.modelButtonView}>
                            <Button icon="camera" mode="contained" onPress={pickFromCamera}>
                                Camera
                        </Button>
                            <Button icon="folder-upload" mode="contained" onPress={pickFromGallary}>
                                Gallery
                        </Button>
                        </View>
                        <Button mode="contained" onPress={() => { setModel(false) }}>
                            Cancel
                    </Button>
                    </View>

                </Modal>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyle: {
        margin: 5
    },
    modelButtonView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 5
    },
    modelView: {
        position: "absolute",
        bottom: 2,
        width: '100%',
        backgroundColor: 'gray'
    },
    bb: {
        marginTop:10,
        borderRadius: 20
    }
})

export default CreateEmployee;