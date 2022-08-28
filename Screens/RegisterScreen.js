import React, {useEffect, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {db, auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
export default function RegisterScreen() {
    const [email, setEmail  ] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigation = useNavigation()
    //CREAR CONFIRMACIÓN PARA VER QUE LAS 2 CONTRASEÑAS SEAN IGUALES BENJA
    /*-----------------------------------------------------------------*/
    //Confirmar que existe la sesión en la base de datos
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert(error.message))
    }
    //Se verifica si es que el usuario está logueado
    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
    }, [])

    return (
        <View>
            <Text style={styles.logoText}>Todo inicia y termina por ti</Text>
            <Input
                disabledInputStyle={{ background: "#ddd" }}
                value={email}
                onChangeText={(email) => setEmail(email)}
                leftIcon={<Icon name="account-outline" size={20} />}
                placeholder="Correo electrónico"
            />
            <Input
                disabledInputStyle={{ background: "#ddd" }}
                value={password}
                onChangeText={(password) => setPassword(password)}
                leftIcon={<Icon name="lock" size={20} />}
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <Input
                disabledInputStyle={{ background: "#ddd" }}
                value={passwordConfirm}
                onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                leftIcon={<Icon name="lock" size={20} />}
                placeholder="Confirma contraseña"
                secureTextEntry={true}
            />
            <View>
                <Button
                    buttonStyle={{ width: '100%',
                        backgroundColor: '#00a680',
                        borderRadius: 10,
                    }}
                    title="Regístrate"
                    onPress={handleSignUp}
                />
                <Text  style={{color:'#00a680', fontSize:15, marginTop:10, marginLeft:90, marginBottom:100}} onPress={()=>{navigation.navigate('LoginScreen')}}>¿Tienes cuenta? Inicia sesión</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: "center",
    },
});
