import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import List from './list'

export default class TrustScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }} forceInset={{ bottom: 'never' }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '信托', title: '信托',search:true }} navigation={navigation} />
                    <View style={Theme.content}>
                        <List navigation={navigation} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
