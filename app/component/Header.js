import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import styles from '../css/header';

export default class Header extends React.Component {
    render() {
        const navigation = this.props.navigation;
        const headerOpt = this.props.headerOpt;

        return (
            <View style={styles.headerContainer}>
                {
                    headerOpt.back == 'null' || (navigation.state.routeName == 'Main' && headerOpt.back != 'home') ?
                        <View style={{ width: 50 }}></View>
                        :
                        headerOpt.back == 'home' ?
                            <TouchableOpacity
                                activeOpacity={0.4}
                                style={styles.portrait}
                                onPress={() => {
                                    this.props.openControlPanel()
                                }}
                            >
                                {
                                    this.props.loginState ?
                                        <Image source={{ uri: signState.r_avatar_img }} style={styles.avatar} />
                                        :
                                        <Image source={require('../../resources/images/portrait.png')} style={styles.avatar} />
                                }


                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                                <Icon name={'back'} size={18} color={'#fff'} />
                            </TouchableOpacity>
                }
                <View style={styles.textContainer}>
                    {
                        headerOpt.title ?
                            <Text style={styles.headerText}>{headerOpt.title} </Text>
                            :
                            <Image source={require('../../resources/images/logo.png')} style={{ width: 83, height: 22 }} />
                    }
                </View>
                {
                    headerOpt.search ?
                        <View style={styles.headerRight}></View>
                        :
                        <TouchableOpacity style={styles.headerRight} onPress={() => { navigation.navigate('Search') }}>
                            <Icon name={'search'} size={18} color={'#fff'} />
                        </TouchableOpacity>
                }

            </View>
        );
    }
}

