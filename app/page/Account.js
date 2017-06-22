import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';


import Account from './account/account';
import Login from './Login';

export default class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: false
        };
    }
    render() {
        let navigation = this.props.navigation;
        let loginState = this.props.loginState
        if (loginState) {
            return (
                <Account navigation={navigation} />
            )
        }
        else {
            return (
                <Login navigation={navigation} />
            )
        }
    }
}
