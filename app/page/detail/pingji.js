import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView, DeviceEventEmitter } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../component/TabBar2';
import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Api from '../../util/api';

import Shuzhi from './pingji/shuzhi';
import Bijiao from './pingji/bijiao';
import Shifan from './pingji/shifan';


export default class DetailPjScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['评级数值', '评级比较', '示范投资'],
            loading: true,
            dataSource: null,
            isGuanzhu: false,
            disabled: false
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let dataSource = this.state.dataSource;
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                    </View>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            {
                                platInfo.platstatus == 1 ?
                                    <Shuzhi replatData={dataSource.replat} data={dataSource.dataDetail} platName={platInfo.platName} platId={platInfo.id} navigation={this.props.navigation} />
                                    :
                                    <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                            }

                        </View>
                        <View tabLabel='key2'>
                            {
                                platInfo.platstatus == 1 ?
                                    <Bijiao data={dataSource.gradecompare} platName={platInfo.platName} />
                                    :
                                    <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                            }

                        </View>
                        {versionStatus != 1 ?
                            <View tabLabel='key3'>
                                <Shifan data={dataSource.fundDetail} platName={platInfo.platName} navigation={this.props.navigation} />
                            </View>
                            :
                            null
                        }
                    </ScrollableTabView>
                    <TouchableOpacity style={styles.guanzhuBtn}
                        activeOpacity={0.4}
                        onPress={() => {
                            if (signState != null) {
                                if (this.state.isGuanzhu) {
                                    Alert.alert(
                                        '提示',
                                        '你确认要取消关注该平台吗',
                                        [
                                            { text: '取消' },
                                            { text: '确认', onPress: this.attentionDel.bind(this) },
                                        ]
                                    )
                                }
                                else {
                                    this.attentionAdd()
                                }
                            }
                            else {
                                Alert.alert(
                                    '提示',
                                    '请先登录后关注！',
                                    [
                                        { text: '取消' },
                                        { text: '确认', onPress: this.goLogin.bind(this) },
                                    ]
                                )
                            }
                        }}
                    >

                        {
                            this.state.isGuanzhu ?
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={[styles.adds, styles.cancel]}>
                                        <Text style={[styles.addsText]}>-</Text>
                                    </View>
                                    <Text style={[styles.guanzhuBtnText, styles.guanzhuBtnTextQuxiao]}>取消关注</Text>
                                </View>
                                :
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.adds}>
                                        <Text style={styles.addsText}>+</Text>
                                    </View>
                                    <Text style={[styles.guanzhuBtnText]}>关注</Text>
                                </View>
                        }

                    </TouchableOpacity>
                </View>
            )
        }

    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'all', id)

        this.subscription22 = DeviceEventEmitter.addListener('loginState', (data) => {
            setTimeout(() => {
                this.isAttention()
            }, 300)

        })

        if (signState != null) {
            this.isAttention()
        }

        if (versionStatus == 1) {
            this.setState({
                tabNames: ['评级数值', '评级比较'],
            })
        }

    }
    componentWillUnmount() {
        this.subscription22.remove();
    }
    goLogin() {
        let navigation = this.props.navigation;
        navigation.navigate('Login')
    }
    //是否关注了该平台
    isAttention() {
        let that = this;
        let id = this.props.platInfo.id;
        let memberid = signState.r_id;
        let url = Api.isAttention + '?id_dlp=' + id + '&memberid=' + memberid;
        that.setState({
            disabled: true
        })
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                if (responseData.data == 1) {
                                    that.setState({
                                        isGuanzhu: true,
                                        disabled: false
                                    })
                                }
                                else {
                                    that.setState({
                                        isGuanzhu: false,
                                        disabled: false
                                    })
                                }

                            }
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
    // 添加关注
    attentionAdd() {
        let that = this;
        let id = this.props.platInfo.id;
        let memberid = null;
        if (signState != null) {
            memberid = signState.r_id;
        }
        that.setState({
            disabled: true
        })
        that.props.noBack(false);
        let url = Api.attentionAdd + '?id_dlp=' + id + '&memberid=' + memberid;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    isGuanzhu: true,
                                    disabled: false
                                })
                                window.EventEmitter.trigger('isAttention', '已关注')
                                window.EventEmitter.trigger('isAttention2', '已关注')
                                that.props.toastShow('关注成功')

                                setTimeout(
                                    () => {
                                        this.props.noBack(true);
                                        this.props.toastHide()
                                    },
                                    1000
                                );
                            }
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
    // 取消关注
    attentionDel() {
        let that = this;
        let id = this.props.platInfo.id;
        let memberid = null;
        if (signState != null) {
            memberid = signState.r_id;
        }
        that.setState({
            disabled: true
        })
        that.props.noBack(false);
        let url = Api.attentionDel + '?id_dlp=' + id + '&memberid=' + memberid;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    isGuanzhu: false,
                                    disabled: false
                                })
                                window.EventEmitter.trigger('isAttention', '取消关注')
                                window.EventEmitter.trigger('isAttention2', '取消关注')
                                that.props.toastShow('取消关注成功')

                                setTimeout(
                                    () => {
                                        this.props.noBack(true);
                                        this.props.toastHide()
                                    },
                                    1000
                                );
                            }
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
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    black: {
        paddingLeft: 15,
        paddingTop: 10,
        color: '#ccc',
        fontSize: 15,
    },
    guanzhuBtn: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 40,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancel: {
        backgroundColor: '#984D3F',
    },
    guanzhuBtnText: {
        color: '#5EB555',
        fontSize: 16,
        fontWeight: 'bold',
    },
    guanzhuBtnTextQuxiao: {
        color: '#984D3F',
    },
    adds: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18,
        marginRight: 8,
        backgroundColor: '#5EB555',
        borderRadius: 6,
    },
    addsText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
})
