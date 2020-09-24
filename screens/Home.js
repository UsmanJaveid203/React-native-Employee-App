import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper'
function Home() {
    const data = [
        { _id: 1, name: "Usman Javed", positon: "Web_devolper" },
        { _id: 2, name: "Umer Naeem", positon: "Web_devolper" },
        { _id: 3, name: "Waseem Raja", positon: "Web_devolper" },
        { _id: 4, name: "Syed Noor", positon: "Web_devolper" },
    ]
    return ( 
        <>
            <View>
                {
                    data.map((val) => {
                        return (
                            <>
                                <Card key={val._id} style={styles.mycard}>
                                    <View style={styles.cardView}>
                                        <Image
                                            style={{
                                                width: 60, height: 60,
                                                borderRadius: 30
                                            }}
                                            source={{ uri: "https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }}
                                        />
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.text}>{val.name}</Text>
                                            <Text>{val.positon}</Text>
                                        </View>
                                    </View>
                                </Card>
                            </>
                        )
                    })
                }

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
    }
})
export default Home