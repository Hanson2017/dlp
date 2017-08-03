import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, DeviceEventEmitter, Alert, Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Header from '../component/Header';
import Theme from '../util/theme';
import Api from '../util/api';
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';
import ThirdLogin from '../util/ThirdLogin'
import styleshd from '../css/header';

export default class Login extends Component {
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                {/*<Header headerOpt={{ back: '个人中心', title: ' ', search: true }} navigation={navigation} />*/}
                <View style={[styleshd.headerContainer, { backgroundColor: '101113', justifyContent: 'flex-start', }]}>
                    {
                        navigation.state.routeName == 'Main' ?
                            <View style={{ width: 50 }}></View>
                            :
                            <TouchableOpacity style={styleshd.backBtn} onPress={() => { navigation.goBack() }}>
                                <Icon name={'back'} size={18} color={'#fff'} />
                            </TouchableOpacity>
                    }

                </View>
                <View style={[Theme.content, { backgroundColor: '#101113' }]}>
                    <ScrollView style={styles.content}>
                        <View style={styles.loginlogo}>
                            <Image source={require('../../resources/images/logo.png')} style={{ width: 170, height: 45 }} />
                        </View>

                        <View style={styles.LoginT}>
                            {
                                versionStatus == 1 ?
                                    null
                                    :
                                    <TouchableOpacity activeOpacity={0.7}
                                        style={{ alignItems: 'center', }}
                                        onPress={ThirdLogin._wechatlogin.bind(this, this)}
                                    >
                                        <Icon name={'wechat'} size={60} color={'#606060'} />
                                        <Text style={styles.LoginText}>微信登陆</Text>
                                    </TouchableOpacity>
                            }

                            <TouchableOpacity
                                style={versionStatus == 1 ? { marginLeft: 0, alignItems: 'center', } : { marginLeft: 80, alignItems: 'center', }}
                                activeOpacity={0.7}
                                onPress={ThirdLogin._qqlogin.bind(this, this)}
                            >
                                <Icon name={'qq'} size={60} color={'#606060'} />
                                <Text style={styles.LoginText}>QQ登陆</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
    goBackSuccee() {
        let navigation = this.props.navigation;
        window.EventEmitter.trigger('loginState', '登录好了')
        DeviceEventEmitter.emit('loginState', '登录好了')
        navigation.goBack()
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101113',
    },
    loginlogo: {
        paddingTop: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginT: {
        marginTop: 80,
        marginBottom: 90,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginText: {
        paddingTop: 12,
        color: '#777'
    }
})