import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import StorageLoginInfo from '../../config/storageLogin'

export default class Set extends React.Component {
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <Text style={styles.label}>当前帐号</Text>
                    <Text style={[styles.listR]}>{signState.r_username}
                        {
                            signState.r_fromtype == 'qq' ?
                                '（QQ登录）'
                                :
                                '（微信登录）'
                        }
                    </Text>
                </View>
                <TouchableOpacity style={styles.list} activeOpacity={0.5}
                    onPress={()=>{
                        navigation.navigate('Help')
                    }}
                >
                    <Text style={styles.label}>常见问题</Text>
                    <Icon name={'right'} size={16} color={'#ccc'} />
                </TouchableOpacity>
             
                <View style={[styles.list, { borderBottomColor: '#e4e4e4' }]}>
                    <Text style={styles.label}>版本号</Text>
                    <Text style={[styles.listR]}>1.0.1</Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn}
                    onPress={() => {
                        Alert.alert(
                            '',
                            '你确定要退出登录吗',
                            [
                                { text: '取消' },
                                { text: '确认', onPress: this.logout.bind(this) },
                            ]
                        )

                    }}
                >
                    <Text style={styles.logoutBtnText}>退出登录</Text>
                </TouchableOpacity>
            </View>
        )
    }
    logout() {
        let navigation = this.props.navigation;
        StorageLoginInfo.storageRemove()
        signState = null;
        window.EventEmitter.trigger('logout', '退出登陆')
        navigation.goBack()
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    list: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    label: {
        color: '#2D3640',
    },
    listR: {
        color: '#999',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4',
    },
    logoutBtnText: {
        color: '#2D3640',

    }

})