import { View, Text, Button, StyleSheet } from "react-native";
import React, { Component } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
class Login extends Component{
        constructor(props){
            super(props);
            this.state = {
                username:'',
                password:'',
                remember:false
            }
        }

        componentDidMount(){
            SecureStore.getItemAsync('userinfo')
                .then((userdata)=>{
                    let userinfo = JSON.parse(userdata);
                    this.setState({
                        username: userinfo.username,
                        password: userinfo.password,
                        remember: userinfo.remember
                    })
                })
        }
        handleLogin(){
            console.log(JSON.stringify(this.state));
            if(this.state.remember){
                SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                .catch(error=>console.log('Could not save user info', error));
            }
            else{
                SecureStore.deleteItemAsync('userinfo')
                .catch((error) => console.log('Could not delete user info', error));
            }
        }

        static navigationOptions = {
            title:'Login'
        }
    render(){
        return(
            <View style={styles.container}>
            <Input
                placeholder="Username"
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                containerStyle={styles.formInput}
                />
            <Input
                placeholder="Password"
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                containerStyle={styles.formInput}
                />
            <CheckBox title="Remember Me"
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => this.handleLogin()}
                    title="Login"
                    color="#512DA8"
                    />
            </View>
        </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        justifyContent: 'center'
    }
})

export default Login;