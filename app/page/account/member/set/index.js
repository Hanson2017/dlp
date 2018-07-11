import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import StorageLoginInfo from '../../../../config/storageLogin'
import Loading from '../../../../component/loading'
import Theme from '../../../../util/theme'
import Util from '../../../../util/util'
import Api from '../../../../util/api'



export default class Set extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            qqInfo: ''
        }
    }
    render() {
        let navigation = this.props.navigation;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            var data = {
                type: 'news',
                title: '推荐一个我天天用的网贷数据APP给你。你试试看！',
                description: "我是" + signState.r_username + "，我在用贷罗盘，网贷行业最专业的数据分析工具，一起来用吧。",
                webpageUrl: 'http://m.dailuopan.com/about/appdown',
                imageUrl: 'http://dailuopan.com/images/shareDlp.png',
            }
            var time = Date.parse(new Date());
            var day = null;
            if (signState.r_regtime) {
                var lasttime = Date.parse(Util.formatDate(signState.r_regtime));
                day = parseInt((time - lasttime) / (1000 * 60 * 60 * 24));
            }
            return (
                <ScrollView style={Theme.content}>
                    <View style={[styles.setTopContainer, Theme.box]}>
                        <Image source={{ uri: signState.r_avatar_img }} style={styles.avatar} />
                        <Text style={styles.userNameText}>{signState.r_username}</Text>
                        {
                            day != null ?
                                <Text style={styles.regDayText}>玩转罗盘 {day} 天</Text>
                                :
                                null
                        }

                    </View>
                    <View style={[styles.setBodyContainer, Theme.box, Theme.mt10]}>
                        <TouchableOpacity style={styles.list} activeOpacity={0.5}
                            onPress={() => {
                                navigation.navigate('Help')
                            }}
                        >
                            <Text style={styles.label}>常见问题</Text>
                            <Icon name={'triangle-right22'} size={13} color={'#c7c7cc'} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.list} activeOpacity={0.5}
                            onPress={() => {
                                let key = this.state.qqInfo.qqqun_key;
                                let linkUrl = "mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3D" + key;
                                Util.Linked(linkUrl)
                            }}
                        >
                            <Text style={styles.label}>意见反馈</Text>
                            <Text style={[styles.listR]}>QQ群：{this.state.qqInfo.qqqun_num}</Text>
                        </TouchableOpacity>
                        {
                            versionStatus != 1 ?
                                <TouchableOpacity style={styles.list} activeOpacity={0.5}
                                    onPress={() => {
                                        navigation.navigate('FriendsShare', { data: data })
                                    }}
                                >
                                    <Text style={styles.label}>推荐 贷罗盘</Text>
                                    <Icon name={'triangle-right22'} size={13} color={'#c7c7cc'} />
                                </TouchableOpacity>
                                :
                                null
                        }

                        <TouchableOpacity style={[styles.list, { borderBottomWidth: 0 }]} activeOpacity={0.5}
                            onPress={() => {
                                navigation.navigate('About')
                            }}
                        >
                            <Text style={styles.label}>关于 贷罗盘</Text>
                            <View style={{ flexDirection: 'row', }}>
                                <Text style={[styles.listR]}>v3.0.1 </Text>
                                <Icon name={'triangle-right22'} size={13} color={'#c7c7cc'} />
                            </View>
                        </TouchableOpacity>
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
                </ScrollView>
            )
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData() {
        let that = this;
        let url = Api.getqqun;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                qqInfo: responseData.data
                            })
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
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
    setTopContainer: {
        paddingTop: 20,
        paddingBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userNameText: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 16,
        color: '#101010',
    },
    regDayText: {
        fontSize: 12,
        color: '#73C3FF',
    },
    setBodyContainer: {
        paddingLeft: 15,
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
        borderBottomColor: '#eee',
    },
    label: {
        color: '#666',
        fontSize: 16,
    },
    listR: {
        color: '#999',
        fontSize: 11,
    },
    logoutBtn: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        backgroundColor: '#fff',
    },
    logoutBtnText: {
        color: '#666',
        fontSize: 16,
    }

})