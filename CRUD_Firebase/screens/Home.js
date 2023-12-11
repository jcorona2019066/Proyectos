//import React, { useEffect } from "react";
import * as React from "react";
import * as RN from "react-native";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
import Product from "../components/Products";
import { database } from "../config/firebase";

//const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
    const [products, setProducts] = React.useState([]);
    const navigation = useNavigation();

    React.useEffect(() => {
        const collectionRef = collection(database, "products");
        const q = query(collectionRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // onSnapshot is a listener that listens to changes in the database in realtime
        console.log("querySnapshot unsusbscribe");
        setProducts(
            querySnapshot.docs.map((doc) => ({
            id: doc.id,
            emoji: doc.data().emoji,
            name: doc.data().name,
            price: doc.data().price,
            isSold: doc.data().isSold,
            createdAt: doc.data().createdAt,
            }))
        );
        });
        
        return unsubscribe;
    }, [navigation]);

    return (
        
        
        
        <RN.View style={styles2.container}>
            <RN.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            <RN.Text style={styles2.title}>Products</RN.Text>
            {products.map((product) => (
            <Product key={product.id} {...product} />
            ))}
            </RN.ScrollView>
            <View style={styles.container}>
                
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate("Chat")}
                    style={styles.chatButton}
                >
                    <Entypo name="chat" size={24} color={colors.lightGray} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Add")}
                    style={styles.chatButton}
                >
                    <Entypo name="plus" size={30} color={colors.lightGray} />
                </TouchableOpacity> 
            </View>
        </RN.View>
        
    );
};

    export default Home;

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 30,
        }
});

const styles2 = RN.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F3F9",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      margin: 16,
    },
  });