import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView } from 'react-native';
import Theme from '../../../util/theme';
import Header from '../../../component/navBar'
import Loading from '../../../component/loading'


export default class YulunDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
        };
    }
    componentWillMount() {
        this.setState({
            url: this.props.navigation.state.params.url
        })
    }
    render() {
        let navigation = this.props.navigation;
        let { url } = this.state;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '', title: ' ', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    <WebView
                        source={{ uri: url }}
                        renderLoading={this.renderLoading.bind(this)}
                        scalesPageToFit={true}
                        
                    />
                </View>
            </View>
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
