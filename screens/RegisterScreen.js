import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';

class RegisterTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            walletID:'',
            created: false,
            
        }
    }
    

    async createWallet(username)
    {
      var res = await fetch('https://api.streetcred.id/custodian/v1/api/wallets', {
       method: 'POST',
       headers: {
         Authorization: 'Bearer GWQuposGwBFIL43tzcfKPTTdEQrSitrqr4TJIsnB0-0',
         XStreetcredSubscriptionKey: 'e2203803a5d94c5dbb8236544c16edd9',
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           "ownerName": username
       }),
     })
     .then((res)=> res.json())
       .then((res)=>{
        //    console.log(JSON.stringify(res))
        //    console.log(res.walletId)
        this.setState({walletID:res.walletId});
        })
        .catch((error) => {
            console.error(error);
          })

    }
    
    async handleRegister() {
        var walletId = await this.createWallet(this.state.username);
        //console.log(this.state.walletID)
        AsyncStorage.setItem('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password,created:true,walletId:this.state.walletID }))
            .catch((error) => console.log('Could not save user info', error));

        this.props.navigation.dispatch(
                StackActions.replace('Root', {
                 
                })
              );       
        //    this.props.navigation.navigate('Root')
    }

    
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Input
                        placeholder=" Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder=" Password"
                        leftIcon={{ type: 'font-awesome', name: 'key' }}
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        secureTextEntry={true}
                    />
                    <Input
                        placeholder=" First Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => this.setState({ firstname })}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder=" Last Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => this.setState({ lastname })}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="E-Mail"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <View style={styles.formButton}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title=" Register"
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    size={24}
                                    color='white'
                                />
                            }
                            buttonStyle={{
                                backgroundColor: "#512DA8"
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});


 export default RegisterTab;