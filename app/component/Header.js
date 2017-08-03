import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import styles from '../css/header';

export default class Header extends React.Component {
    render() {
        const navigation = this.props.navigation;
        const headerOpt = this.props.headerOpt;

        return (
            <View style={[styles.headerContainer,Platform.OS=='android'?{marginTop:0}:null]}>
                {
                    headerOpt.back == 'null' || (navigation.state.routeName == 'Main' && headerOpt.back != 'home') ?
                        <View style={{ width: 50 }}></View>
                        :
                        headerOpt.back == 'home' ?
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
                                        <Image source={require('../../resources/images/portrait2.png')} style={styles.avatar} />
                                }


                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                                <Icon name={'back'} size={18} color={'#fff'} />
                            </TouchableOpacity>
                }
                <View style={[styles.textContainer,headerOpt.title && Platform.OS=='android' ? null:styles.textContainerTx]}>
                    {
                        headerOpt.title ?
                            <Text style={styles.headerText}>{headerOpt.title} </Text>
                            :
                            <Image source={require('../../resources/images/logoico.png')} style={{ width: 24, height: 24 }} />
                    }
                </View>
                {
                    headerOpt.search ?
                        <View style={[styles.headerRight,Platform.OS=='android'?styles.headerRightAndorid:null]}></View>
                        :
                        <TouchableOpacity style={styles.headerRight} onPress={() => { navigation.navigate('Search') }}>
                            <Icon name={'search'} size={20.5} color={'#fff'} />
                        </TouchableOpacity>
                }

            </View>
        );
    }
}

