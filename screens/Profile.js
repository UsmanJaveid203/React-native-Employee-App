import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Image, Text, Linking,Platform ,Alert} from 'react-native';
import { Title, Card ,Button} from 'react-native-paper';
import { MaterialIcons, Feather } from '@expo/vector-icons';


const Profile = (props) => {
    const {_id,name,position,email,picture,phone,salary} = props.route.params.item;
    const OpenDial=()=>{
        if(Platform.OS === "android"){
            Linking.openURL(`tel:${phone}`)
        }else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }

    const FireEmployee=()=>{
        fetch("http://192.168.1.105:5000/Api/deleteData/"+_id ,{
            method: "delete",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            Alert.alert("Are you sure")
            props.navigation.navigate("Home")
        })
        .catch(err => {
            Alert.alert("Error Occure try again later")
        })
    }

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={["#5a95e8", "#90b5e8"]}
                style={{ height: "25%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{
                        width: 100, height: 100,
                        borderRadius: 50, marginTop: -50
                    }}
                    source={{ uri:picture}}
                />
            </View>

            <View style={{ alignItems: "center" }}>
                <Title>{name}</Title>
                <Text style={{ fontSize: 15 }}>{position}</Text>
            </View>

            <Card style={styles.mycard} onPress={()=>{
                    Linking.openURL(`mailto:${email}`)
                }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="email" size={30} color="green" />
                    <Text style={{ marginLeft: 20, marginTop: 4, fontSize: 15 }}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={OpenDial}>
                <View style={styles.cardContent}>
                    <Feather name="phone" size={30} color="green" />
                    <Text style={{ marginLeft: 20, marginTop: 4, fontSize: 15 }}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={30} color="green" />
                    <Text style={{ marginLeft: 20, marginTop: 4, fontSize: 15 }}>{salary}</Text>
                </View>
            </Card>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" , marginTop:20}}>
                <Button icon="briefcase-edit" mode="contained" onPress={() =>{
                    props.navigation.navigate("Employee",
                    {_id,name,position,email,picture,phone,salary})
                }}>
                    Edit
                </Button>
                <Button icon="delete-circle-outline" mode="contained" onPress={()=>FireEmployee()}>
                    Fire Employee
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    mycard: {
        margin: 7
    },
    cardContent: {
        flexDirection: "row",
        padding: 8
    }
})
export default Profile;