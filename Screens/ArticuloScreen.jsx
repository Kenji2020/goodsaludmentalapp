import React, {useState, useEffect, useRef} from 'react'
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput,
    FlatList
} from 'react-native'
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
// Packages
import {SharedElement} from 'react-navigation-shared-element';
import {AntDesign} from "@expo/vector-icons";
// Icons

import {Feather, FontAwesome} from '@expo/vector-icons'
import {auth, db} from '../firebase'
import {Button} from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";

const image = {uri: "https://reactjs.org/logo-og.png"};

const BlogPage = (props) => {
    const navigation = useNavigation()
    const initialState = {
        autor: "",
        id: "",
        name: "",
        description: "",
        tags: [],
        comments: "",
        nickname: "",
        commentValue: "",

    };
    const [Comments, SetComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');
    const [showComment, setShowComment] = useState(false);
    const InputRef = useRef();
    // Function to add comments to array
    const [blogsList, setBlogsList] = useState([]);
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const getUserById = async (id) => {
        const dbRef = db.collection('Articulo').doc(id)
        const doc = await dbRef.get()
        const user = doc.data()
        setUser({...user, id: doc.id});
        setLoading(false);
    }
    const [state, setState] = useState(initialState);

    useEffect(() => {
        getUserById(props.route.params.userId);

    }, []);
    const deleteUser = async () => {
        if (user.autor === auth.currentUser.email || auth.currentUser.email === "victor.ignacio.salgado2002@gmail.com" || auth.currentUser.email === "joakomask@gmail.com") {
            setLoading(true)
            const dbRef = db
                .collection("Articulo")
                .doc(props.route.params.userId);
            await dbRef.delete();
            setLoading(false)
            props.navigation.navigate("Home");
        } else {
            alert("No tienes permisos para eliminar este post")
        }

    };

    const {width, height} = Dimensions.get('window')
    const {data} = props.route.params;
    //access to data inside array of objects

    useEffect(() => {
        db.collection('Articulos').onSnapshot(querySnapshot => {
            const lista = []
            querySnapshot.docs.forEach(doc => {
            
                    const {name, description, tags, nickname} = doc.data()
                    lista.push({
                        id: doc.id, name, description, tags, nickname
                    })
                

            })
            setBlogsList([...lista])
            console.log(lista)
        })

    }, [])
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View>
                    <SharedElement>
                        <Image source={require('../assets/icon.png')} style={{
                            width: '100%',
                            height: height - 450,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10
                        }} resizeMode="cover"/>
                       
                        {auth.currentUser.email === user.autor || auth.currentUser.email === "victor.ignacio.salgado2002@gmail.com" || auth.currentUser.email === "joakomask@gmail.com"  || auth.currentUser.email === "benjamin.morales3@mail.udp.cl" ?
                        <>
                            <Button
                                title="Borrar"
                                onPress={deleteUser}
                                buttonStyle={{
                                    backgroundColor: '#F44336',
                                    borderRadius: 10,
                                    marginTop: 14
                                }}
                            />
                        </>
                            :<Text></Text>
                        }
                    </SharedElement>
                    <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 14, left: 10}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 20
                        }}>
                            <View>
                                <SharedElement>
                                    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}/>
                                </SharedElement>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{paddingHorizontal: 10, paddingTop: 14}}>
                    <SharedElement style={{width: width - 30, marginBottom: 14}}>
                        <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold', lineHeight: 32}}>{user.name}</Text>
                    </SharedElement>
                    <Text style={{fontSize: 14, lineHeight: 28, textAlign: 'justify', opacity: 0.5}}>
                        {user.description} 
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingRight: 20
                        }}>
                            <View>
                                <SharedElement>
                                    <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}/>
                                </SharedElement>
                                <SharedElement>
                                    <Text style={{color: 'black', fontSize: 12,}}>{user.nickname}</Text>
                                </SharedElement>
                               
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        )

};

export default BlogPage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },commentText: {
        fontSize: 14,
        lineHeight: 28,
        textAlign: 'justify',
        opacity: 0.5
    },commentsScroll: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20
    },commentsTitle: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },commentsNickname: {
        color: 'black',
        fontSize: 12,
    },showComment_container: {
        marginTop: 14,
        marginBottom:18,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
    }

});