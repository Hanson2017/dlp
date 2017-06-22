import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import styles from '../css/header';

export default class Header extends React.Component {
    render() {
        const navigation = this.props.navigation;
        const headerOpt = this.props.headerOpt;
        let showActionSheet=this.props.showActionSheet;
        let fundType = null;

        switch (headerOpt.fund) {
            case 1:
                fundType = '示1'
                break;
            case 2:
                fundType = '示2'
                break;
            case 3:
                fundType = '示3'
                break;
            case 4:
                fundType = '活'
                break;
        }
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                    <Icon name={'back'} size={18} color={'#fff'} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{headerOpt.title}
                        {
                            headerOpt.fund != 0 ?
                                <Text style={{ color: '#009900' }}>({fundType})</Text>
                                :
                                null
                        }
                    </Text>
                    {
                        headerOpt.isflmf == 1 ?
                            <Image source={require('../../resources/images/redPacket.png')} style={{ width: 20, height: 20,marginLeft:8, }} />
                            :
                            null
                    }

                </View>
                <TouchableOpacity style={styles.headerRight} onPress={() => {showActionSheet()}}>
                    <Icon name={'share'} size={22} color={'#fff'} />
                </TouchableOpacity>
            </View>
        );
    }
}
