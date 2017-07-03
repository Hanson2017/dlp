import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import Api from '../util/api';
import Loading from '../component/Loading';

export default class ControlPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            pageSize: 10
        };
    }
    render() {
        let screenProps = this.props.screenProps;
        let loginState = screenProps.loginState;
        let navigation = screenProps.navigation;
        return (
            <View style={styles.ControlPanelWp}>

                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.ControlPaneHeaderNologin}
                        onPress={() => {
                            if (loginState) {
                                navigation.navigate('Account', { tab: 1 })
                            }
                            else {
                                navigation.navigate('Login')
                            }

                        }}
                    >
                        <View style={styles.ControlPaneHeaderNologinPortrait}>
                            {
                                loginState ?
                                    <Image source={{ uri: signState.r_avatar_img }} style={styles.avatar} />
                                    :
                                    <Image source={require('../../resources/images/portrait.png')} style={styles.avatar} />
                            }
                            <Text style={styles.loginText}>{loginState ? signState.r_username : '登录'}</Text>
                        </View>

                        <Icon name={'right'} size={16} color={'#616367'} />
                    </TouchableOpacity>

                    {
                        loginState ?
                            <View style={styles.platTop}>
                                <View style={styles.platTopL}>
                                    <Icon name={'set'} size={16} color={'#808a95'} />
                                    <Text style={styles.platTopLText}>关注平台列表</Text>
                                </View>
                                <TouchableOpacity style={styles.platTopMore}
                                    onPress={() => {
                                        navigation.navigate('Account', { tab: 0 })
                                    }}
                                >
                                    {
                                        this.state.dataSource.length != 0 ?
                                            <Text style={styles.platTopMoreText}>更多</Text>
                                            :
                                            null
                                    }
                                </TouchableOpacity>
                            </View>
                            : null
                    }

                    <View style={styles.ControlPaneBody}>
                        {
                            loginState ?
                                this.state.loading ?
                                    <Loading />
                                    :
                                    this.state.dataSource.length != 0 ?
                                        <FlatList
                                            data={this.state.dataSource}
                                            renderItem={this.renderItem.bind(this)}
                                        />
                                        :
                                        <Text style={styles.null}>暂无关注平台</Text>
                                : null
                        }

                    </View>
                    {
                        loginState ?
                            <View style={styles.ControlPanefooter}>
                                <TouchableOpacity style={styles.platTopL}
                                    onPress={() => {
                                        navigation.navigate('Account', { tab: 1 })
                                    }}
                                >
                                    <Icon name={'set'} size={16} color={'#808a95'} />
                                    <Text style={styles.platTopLText}>设置</Text>
                                </TouchableOpacity>
                                <View style={styles.ControlPaneLogo}>
                                    <Image source={require('../../resources/images/logo2.png')} style={{ width: 68, height: 18 }} />
                                </View>
                            </View>
                            :
                            null
                    }

                </View>


            </View>
        )
    }
    renderItem({ item, index }) {
        let fundType = null;
        let navigation = this.props.screenProps.navigation;
        switch (item.fundtype) {
            case 1:
                fundType = '1号'
                break;
            case 2:
                fundType = '2号'
                break;
            case 3:
                fundType = '3号'
                break;
            case 4:
                fundType = '活期'
                break;
            default:
                fundType = null
        }
        return (
            <TouchableOpacity style={styles.list}
                onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
            >
                <View style={styles.listhd}>
                    <Text style={[styles.hdText, styles.platName]}>{item.plat_name}</Text>
                    {
                        item.platstatus == 1 ?
                            <Text style={[styles.hdText, styles.state]}>（正常）</Text>
                            :
                            item.platstatus == 3 ?
                                <Text style={[styles.hdText, styles.state, styles.stateZhengyi]}>（争议中）</Text>
                                :
                                <Text style={[styles.hdText, styles.state, styles.stateBlack]}>（黑名单）</Text>

                    }
                    {
                        fundType != null ?
                            <Text style={[styles.hdText, styles.shifan]}>（示范投资{fundType}）</Text>
                            : null
                    }
                </View>
                <View style={styles.listbd}>
                    <Text style={[styles.bdText, styles.paiming]}>
                        综合排名：
                        {
                            item.ordernum != 0 ?
                                item.ordernum
                                :
                                '暂无'
                        }
                    </Text>
                    <Text style={[styles.bdText, styles.jiantou]}>
                        {
                            item.ordernum != 0 ?
                                <Icon name={item.changnum > 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                :
                                null
                        }
                    </Text>
                    <Text style={[styles.bdText, styles.yulun]}>本周新舆论：{item.infonum}条</Text>
                </View>
            </TouchableOpacity>
        )
    }
    loginData() {
        setTimeout(() => {
            if (signState != null) {
                this.getData()
            }
        }, 1000)
    }
    componentDidMount() {
        let that = this;
        setTimeout(() => {
            if (signState != null) {
                that.getData()
            }
        }, 1000)
        window.EventEmitter.on('isAttention2', (data) => {
            that.getData();
        })

    }
    componentWillUnmount() {
        window.EventEmitter.off('isAttention2')
    }
    getData() {
        let that = this;
        let memberid = signState.r_id;
        let url = Api.attentionList + '?memberid=' + memberid + '&page=1&pagesize=' + this.state.pageSize;
        console.log(url)
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    dataSource: responseData.dataList,
                                    loading: false,
                                })
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
    ControlPanelWp: {
        flex: 1,
        padding: 20,
        paddingTop: 23,
    },
    ControlPaneHeaderNologin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        height: 50,
    },
    ControlPaneHeaderNologinPortrait: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
    },
    loginText: {
        paddingLeft: 10,
        color: '#fff',
    },
    ControlPaneHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#2e3438',
    },
    ControlPaneHeaderName: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },
    platTop: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
    },
    platTopL: {
        flexDirection: 'row',
    },
    platTopLText: {
        paddingLeft: 10,
        color: '#ABB7C4',
    },
    platTopMoreText: {
        color: '#666',
    },
    ControlPaneBody: {
        flex: 1,
    },
    ControlPanefooter: {
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#2e3438',
        height: 80,
        justifyContent: 'space-between',
    },
    list: {
        marginBottom: 25,
    },
    listhd: {
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hdText:{
        fontSize:13,
    },
    platName: {
        width: 90,
        color: '#fff',
    },
    state: {
        width: 68,
        color: '#009900'
    },
    shifan: {
        color: '#009900'
    },
    listbd: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bdText: {
        color: '#666',
        fontSize:13,
    },
    paiming: {
        width: 100,
    },
    jiantou: {
        width: 30,
    },
    stateZhengyi: {
        color: '#FFFF00'
    },
    stateBlack: {
        color: 'red'
    },
    null: {
        paddingLeft: 25,
        color: '#393f44'
    },
    ControlPaneLogo: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    }
})