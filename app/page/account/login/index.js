import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, DeviceEventEmitter, Alert, Image, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';

import Theme from '../../../util/theme';
import ThirdLogin from '../../../util/ThirdLogin'
import Api from '../../../util/api';
import Header from '../../../component/navBar';

import styleshd from '../../../css/header';

export default class Login extends Component {
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '个人中心', title: '登录', search: true }} navigation={navigation} />
                <View style={[Theme.content]}>
                    <ScrollView style={styles.content}>
                    
                        <View style={styles.LoginT}>
                            {
                                versionStatus == 1 ?
                                    null
                                    :
                                    <TouchableOpacity activeOpacity={0.7}
                                        style={{ alignItems: 'center', }}
                                        onPress={ThirdLogin._wechatlogin.bind(this, this)}
                                    >
                                        <Icon name={'ico-wechart'} size={50} color={'#4ACE49'} />
                                        <Text style={styles.LoginText}>微信登陆</Text>
                                    </TouchableOpacity>
                            }

                            <TouchableOpacity
                                style={versionStatus == 1 ? { marginLeft: 0, alignItems: 'center', } : { marginLeft: 50, alignItems: 'center', }}
                                activeOpacity={0.7}
                                onPress={ThirdLogin._qqlogin.bind(this, this)}
                            >
                                <Icon name={'ico-qq'} size={50} color={'#73c3ff'} />
                                <Text style={styles.LoginText}>QQ登陆</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </ScrollView>
                    <View style={styles.loginlogo}>
                            <Image source={require('../../../../resources/images/logoLogin.png')} style={{ width: 80, height: 80 }} />
                        </View>
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
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loginlogo: {
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    LoginT: {
        marginTop: 120,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginText: {
        paddingTop: 10,
        color: '#666',
        fontSize:14,
    }
})