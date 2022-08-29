import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Input, Button,Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db, auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
    //Confirmar que existe la sesión en la base de datos
    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert('Datos incorrectos, intenta nuevamente'))
    }
    //Se verifica si es que el usuario está logueado
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
    }, [])
    //Se redirecciona al usuario a la pantalla de registro
    const handleRegister = () => {
        navigation.replace("RegisterScreen")
    }
    return (
        <View style={{backgroundColor:'#eeeeee'}}>
            <View style={{backgroundColor:'#eeeeee'}}>
            <Text style={styles.logoText}>Cuéntanos lo que callas</Text>
            <Input
                value={email}
                onChangeText={(email) => setEmail(email)}
                leftIcon={<Icon name="account-outline" size={20} />}
                placeholder="Correo electrónico"
            />
            <Input
                value={password}
                onChangeText={(password) => setPassword(password)}
                leftIcon={<Icon name="lock" size={20} />}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            </View>
            <View style={{backgroundColor:'#eeeeee'}}>
            <Button
                buttonStyle={{marginLeft:'25%',marginRight:'50%',
                    backgroundColor: '#00a680',
                    borderRadius: 10,
                    height:75, width:200
                }}
                onPress={handleLogin}
                title="Iniciar sesión"
            />
                <Text onPress={()=>{navigation.navigate('RegisterScreen')}} style={{colomper:'#00a680', fontSize:15, marginTop:10, marginLeft:90, marginBottom:100}}>¿No tienes cuenta?, Regístrate</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: "center",
        fontFamily: "Noteworthy-Bold"
    },
});
