import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
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
            <SafeAreaView style={{ flex: 1, backgroundColor: '#8F6546' }}>
                <View style={Theme.container}>
                    <StatusBar
                        backgroundColor={'#8F6546'}
                        barStyle="light-content"
                    />
                    <View style={styles.headerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.headerText}>贷罗盘论坛</Text>
                        </View>
                        <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                            <Text style={styles.backBtnText}>返回APP</Text>
                        </TouchableOpacity>

                    </View>
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
    headerContainer:{
        height: 42,
        backgroundColor: '#8F6546',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        paddingLeft:70,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText:{
        color: '#fff',
        fontSize: 16.5,
        fontWeight: 'bold',
    },
    backBtn:{
        marginRight:10,
        width:60,
        height:22,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#fff',
        borderRadius:5,
    },
    backBtnText:{
        fontSize:12,
        color:'#fff',
    },

})
