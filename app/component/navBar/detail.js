import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import styles from '../../css/header';
import Util from '../../util/util';

export default class Header extends React.Component {
    render() {
        const {navigation,headerOpt,showActionSheet}=this.props;
        return (
            <View style={[styles.headerContainer,styless.headerContainer, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { headerOpt.noBack ? navigation.goBack() : null }}>
                    <Icon name={'triangle-left'} size={18} color={'#fff'} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{headerOpt.title}</Text>
                </View>
                {versionStatus == 1 || !showActionSheet ?
                    <View style={[styles.headerRight]}></View>
                    :
                    <TouchableOpacity style={[styles.headerRight, styles.headerRightShare]} onPress={() => { showActionSheet() }}>
                        <Icon name={'ico-share'} size={18} color={'#fff'} />
                    </TouchableOpacity>
                }

            </View>
        );
    }
}
const styless=StyleSheet.create({
    headerContainer:{
        backgroundColor: '#1A1A1A',
    },
})
