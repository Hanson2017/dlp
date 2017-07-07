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
                    <Text style={styles.label}>当前帐号：</Text>
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
                    onPress={() => {
                        navigation.navigate('Help')
                    }}
                >
                    <Text style={styles.label}>常见问题</Text>
                    <Icon name={'right'} size={13} color={'#c7c7cc'} />
                </TouchableOpacity>

                <View style={[styles.list, { borderBottomColor: '#e4e4e4' }]}>
                    <Text style={styles.label}>版本号</Text>
                    <Text style={[styles.listR]}>2.0.1</Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn}
                    activeOpacity={0.6}
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
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#e1e6eb',
    },
    list: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e6eb',
    },
    label: {
        color: '#28323c',
        fontWeight: 'bold',
    },
    listR: {
        color: '#8c96a0',
        fontSize:13,
    },
    logoutBtn: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#e4e4e4',
        backgroundColor: '#fff',
    },
    logoutBtnText: {
        color: '#28323c',
        fontWeight: 'bold',
    }

})