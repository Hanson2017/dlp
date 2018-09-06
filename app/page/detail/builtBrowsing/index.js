import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../../util/theme';
import Header from '../../../component/navBar/detail'
import Loading from '../../../component/loading'


export default class BuiltBrowsing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            url: params.url,
        })
    }
    render() {
        let navigation = this.props.navigation;
        let { url } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={Theme.container}>
                    <StatusBar
                        backgroundColor={'#1A1A1A'}
                        barStyle="light-content"
                    />
                    <Header headerOpt={{ title: '', noBack: true, search: true }} navigation={navigation} />
                    <View style={Theme.content}>
                        <WebView
                            source={{ uri: url }}
                            renderLoading={this.renderLoading.bind(this)}
                            scalesPageToFit={true}

                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    renderLoading() {
        return (
            <Loading />
        )
    }

}

const styles = StyleSheet.create({


})
