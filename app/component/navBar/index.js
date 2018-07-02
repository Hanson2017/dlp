import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../util/theme';

export default class Header extends React.Component {
    render() {
        const {navigation,headerOpt,black}=this.props;
        return (
            <View style={[styles.headerContainer,Platform.OS=='android'?{marginTop:0}:null,black?{backgroundColor:'#1A1A1A'}:null]}>
                {
                    headerOpt.back == 'null' ?
                        <View style={{ width: 50 }}></View>
                        :
                        navigation.state.routeName == 'Main' ?
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={[styles.portrait,Platform.OS=='android'?styles.headerRightAndorid:null]}
                                onPress={() => {
                                    this.props.openControlPanel()
                                }}
                            >
                                {
                                    this.props.loginState ?
                                        <Image source={{ uri: signState.r_avatar_img }} style={styles.avatar} />
                                        :
                                        <Image source={require('../../../resources/images/portrait2.jpg')} style={styles.avatar} />
                                }


                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                                <Icon name={'triangle-left'} size={18} color={'#fff'} />
                            </TouchableOpacity>
                }
                <View style={[styles.textContainer,headerOpt.title && Platform.OS=='android' ? null:styles.textContainerTx]}>
                    {
                        headerOpt.title ?
                            <Text style={styles.headerText}>{headerOpt.title}</Text>
                            :
                            <Image source={require('../../../resources/images/logo.png')} style={{ width: 90.85, height: 24 }} />
                    }
                </View>
                {
                    headerOpt.search ?
                        <View style={[styles.headerRight,Platform.OS=='android'?styles.headerRightAndorid:null]}></View>
                        :
                        <TouchableOpacity style={styles.headerRight} onPress={() => { navigation.navigate('Search') }}>
                            <Icon name={'ico-search'} size={20.5} color={'#fff'} />
                        </TouchableOpacity>
                }

            </View>
        );
    }
}


const styles = StyleSheet.create({
    headerContainer: {
       
        height: 42,
        backgroundColor: Theme.color2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    portrait: {
        paddingTop: 1,
        width: 54,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainerTx: {
        paddingTop: 7,
        alignItems: 'flex-start',
    },
    headerText: {
        color: '#fff',
        fontSize: 16.5,
        fontWeight: 'bold',
    },
    headerRight: {
        paddingTop: 8,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerRightShare:{
        height:28,
    },
    headerRightAndorid: {
        alignItems: 'center',
        paddingTop: 0,
        justifyContent: 'center',
    },
    avatar: {
        width: 33,
        height: 33,
        borderRadius: 16.5,
    }
})

