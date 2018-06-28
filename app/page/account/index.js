import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';


import Member from './member';
import Login from './login';

export default class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ref: false
        };
    }
    render() {

        const { navigation } = this.props;
        if (signState === null) {
            return <Login navigation={navigation} />;
        }
        else {
            return <Member navigation={navigation} />;
        }
    }
}
