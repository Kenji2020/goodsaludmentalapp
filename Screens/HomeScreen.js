import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, ScrollView, Dimensions, FlatList, KeyboardAvoidingView} from 'react-native';
import { Input, Button,Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db} from "../firebase";
import {useNavigation} from "@react-navigation/native";
export default function HomeScreen({info}) {
    const [datos, setDatos] = useState([])
    const navigation = useNavigation()
    //obtener datos de la base de datos
    const deviceWidth = Math.round(Dimensions.get('window').width);
    const offset = 60;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log(datos)
    useEffect(()=>{
        db.collection('Inventario').onSnapshot(querySnapshot=>{
            const lista = []
            querySnapshot.docs.forEach(doc=>{
                const {name, description, tags, nickname} = doc.data()
                lista.push({
                    id:doc.id,name,description,tags, nickname
                })

            })
            setDatos([...lista])
        })

    },[])
    const renderItem = ({item})=>{
        return(
            <View style={{backgroundColor: '#e1e1e1'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{backgroundColor: '#e1e1e1', marginTop:0, marginBottom:0}}>
                                <Card containerStyle={{marginLeft:0, marginRight:0, marginTop:0, marginBottom:0, height:400, backgroundColor:'#f6f6f6'}}>
                                    <Card.Title onPress={()=>{navigation.navigate('PostScreen',{userId: item.id})}}>{item.name}</Card.Title>
                                    <Card.Divider />
                                    <View
                                        style={{
                                            position: "relative",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Image

                                            style={{ width: "100%", height: 300 }}
                                            resizeMode="contain"
                                            source={require("../assets/icon.png")}
                                            onPress={()=>{navigation.navigate('PostScreen',{userId: item.id})}}
                                        />
                                        <Text style={{marginTop:10}}>{item.nickname}</Text>
                                    </View>
                                </Card>

                            </View>

                </ScrollView>

            </View>
        )
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={{marginTop:35}}>

           <FlatList data={datos} renderItem={renderItem} keyExtractor={x=>x.id} showsVerticalScrollIndicator={false}
                     style={{marginTop:0, marginBottom:40}}
           />
            <View style={{marginTop:-40, flexDirection: 'row', justifyContent: 'space-evenly', flex:40}} >
                <Button  buttonStyle={{backgroundColor: '#00ADC7'}} title='Cuenta tu historia' onPress={()=>{navigation.navigate('CrearBlogScreen')}} />
                <Button title="Área psicología" onPress={()=>{navigation.navigate('AreaPsicologia')}} buttonStyle={{backgroundColor: '#00ADC7',}}/>
            </View>
        </KeyboardAvoidingView>
    );

}
