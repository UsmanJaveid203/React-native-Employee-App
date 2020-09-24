import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper'
function Flist(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch("http://192.168.1.105:5000/Api/getData")
            .then(res => res.json())
            .then(info => {
                setData(info.result)
                setLoading(false)
            })
            .catch(err => {
                Alert.alert("Something went wrong in uploading!")
            })
    }
    useEffect(() => {
        fetchData();
    });
    const renderlist = ((item) => {
        return (
            <Card key={item.id} style={styles.mycard} onPress={() => {
                props.navigation.navigate("Profile", { item })
            }}>
                {item ?
                    <View style={styles.cardView}>
                        <Image
                            style={{
                                width: 60, height: 60,
                                borderRadius: 30
                            }}
                            source={{ uri: item.picture }}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.text}>{item.name}</Text>
                            <Text>{item.position}</Text>
                        </View>
                    </View> :
                    <View style={styles.cardView}>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{fontSize: 25,color:"red", fontWeight:"bold"}}>Record Not Found</Text>
                        </View>
                    </View>
                }

            </Card>
        )
    })
    return (
        <>
            <View style={{ flex: 1 }}>

                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return renderlist(item)
                    }}
                    keyExtractor={item => `${item._id}`}
                    onRefresh={() => fetchData()}
                    refreshing={loading}
                />

                <FAB
                    style={styles.fab}
                    small={false}
                    icon="plus"
                    theme={{ colors: { accent: "blue" } }}
                    onPress={() => props.navigation.navigate("Employee")}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5

    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})
export default Flist