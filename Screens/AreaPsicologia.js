import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, KeyboardAvoidingView, FlatList, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {db} from '../firebase'
import {Button, Card} from 'react-native-elements';
const AreaPsicologia = ({ info }) => {

    const navigation = useNavigation()
    const [blogsList, setBlogsList] = useState([]);
    useEffect(()=>{
        db.collection('Psicólogos').onSnapshot(querySnapshot=>{
            const lista = []
            querySnapshot.docs.forEach(doc=>{
                const {name, description, tags,correo,image,numero,tipoDeConsulta} = doc.data()
                lista.push({
                    id:doc.id,name,description,tags,correo,image,numero,tipoDeConsulta
                })
            })
            setBlogsList([...lista])
        })
    },[])
    function renderItem ({item}) {
        const image = {uri : item.image}
        return (
            <View style={{backgroundColor: '#e1e1e1'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: '#e1e1e1', marginTop:0, marginBottom:0}}>
                        <Card containerStyle={{marginLeft:0, marginRight:0, marginTop:0, marginBottom:5, height:"100%",width:"100%", backgroundColor:'#f6f6f6'}}>
                            <Card.Title onPress={()=>{navigation.navigate('DescripcionPsicologos',{userId: item.id})}}>{item.name}</Card.Title>
                            <Card.Divider />
                            <View
                                style={{
                                    position: "relative",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    style={{ width: 450, height: 200 }}
                                    resizeMode="contain"
                                    source={image}
                                />
                                <Text style={{marginTop:10}}>{item.nickname}</Text>
                                <Text style={{marginTop:10}}>{item.tipoDeConsulta}</Text>
                                <Text style={{marginTop:10}}>{item.numero}</Text>
                                <Text style={{marginTop:10}}>{item.correo}</Text>
                                <Text style={{marginTop:10,fontWeight: "bold"}} onPress={()=> navigation.navigate('DescripcionPsicologos',{userId: item.id})}>Leer más...</Text>

                            </View>
                        </Card>

                    </View>

                </ScrollView>

            </View>

        );
    }
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >

            <View style={{padding: 30}}>
                <FlatList
                    data={blogsList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
                <Button
                    title="Artículos"
                    buttonStyle={{
                        backgroundColor: '#00ADC7',
                    }}
                    onPress={() => navigation.navigate('Articulos')}
                />

            </View>
        </KeyboardAvoidingView>
    )

}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 20,
        alignItems: 'center',
        marginTop: 25,
    },
    cardContainer: {
        width: deviceWidth - 10,
        backgroundColor: '#fff',
        height: 250,
        borderRadius: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
    },
    imageStyle: {
        height: 130,
        width: deviceWidth - 10,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '800',
    },
    categoryStyle: {
        fontWeight: '200',
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    iconLabelStyle: {
        flexDirection: 'row',
        marginTop: 10,
    },
});

export default AreaPsicologia;
