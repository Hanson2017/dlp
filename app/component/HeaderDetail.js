import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import styles from '../css/header';
import Util from '../util/util';

export default class Header extends React.Component {
    render() {
        const navigation = this.props.navigation;
        const headerOpt = this.props.headerOpt;
        let dataInfo = headerOpt.dataInfo
        let showActionSheet = this.props.showActionSheet;
        let fundType = null;
        switch (dataInfo.fundtype) {
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
            <View style={[styles.headerContainer, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => { headerOpt.noBack ? navigation.goBack() : null }}>
                    <Icon name={'back'} size={18} color={'#fff'} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>{headerOpt.title}
                        {
                            dataInfo.fundtype != 0 ?
                                <Text style={{ color: '#009900' }}>({fundType})</Text>
                                :
                                null
                        }
                    </Text>
                    {
                        dataInfo.isflmf == 1 && versionStatus != 1 ?
                            <TouchableOpacity
                                onPress={() => {
                                    let url = 'http://m.fanlimofang.com/Activity/Detail/' + dataInfo.flmllist[0].activityid;
                                    Util.Linked(url)
                                }}
                            >
                                <Image source={require('../../resources/images/redPacket.png')} style={{ width: 26, height: 26, marginLeft: 8, }} />
                            </TouchableOpacity>
                            :
                            null
                    }

                </View>
                {versionStatus == 1 ?
                    <View style={[styles.headerRight]}></View>
                    :
                    <TouchableOpacity style={[styles.headerRight, styles.headerRightShare]} onPress={() => { showActionSheet() }}>
                        <Icon name={'share'} size={18} color={'#fff'} />
                    </TouchableOpacity>
                }

            </View>
        );
    }
}
