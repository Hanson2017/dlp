import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, FlatList, DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import Api from '../../util/api';
import Theme from '../../util/theme';
import Loading from '../../component/loading';
import ThirdLogin from '../../util/ThirdLogin'

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
                    <View style={styles.ControlPaneHeader}>
                        {
                            loginState ?
                                <TouchableOpacity style={styles.ControlPaneHeaderlogin}
                                    onPress={() => {
                                        navigation.navigate('Account', { tabId: 3 })
                                    }}
                                >
                                    <View style={styles.ControlPaneHeaderloginPortrait}>
                                        <Image source={{ uri: signState.r_avatar_img }} style={styles.avatar} />
                                        <Text numberOfLines={1} style={[styles.userName]}>{signState.r_username}</Text>
                                    </View>
                                    <Icon name={'triangle-right22'} size={16} color={'#fff'} />
                                </TouchableOpacity>
                                :
                                <View style={styles.ControlPaneHeaderNologin}>
                                    <Text style={styles.ControlPaneHeaderNologinText}>未登录</Text>
                                    <Text style={styles.ControlPaneHeaderNologinText2}>请先登录，享受更好的体验</Text>
                                </View>
                        }

                    </View>
                    <View style={styles.ControlPaneBody}>
                        <ScrollView>
                            {
                                loginState ?
                                    <View style={styles.guanzhuListContainer}>
                                        <TouchableOpacity style={styles.guanzhuListHeader}
                                            onPress={() => {
                                                navigation.navigate('Account', { tabId: 0 })
                                            }}
                                        >
                                            <Text style={styles.guanzhuListHeaderText}>关注平台</Text>
                                            <View>
                                                <Icon name={'triangle-right22'} size={16} color={'#BFBFBF'} />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.listContainer}>
                                            {this.state.loading ?
                                                <View style={{paddingTop:50,}}>
                                                    <Loading />
                                                </View>
                                                :
                                                this.state.dataSource.length != 0 ?
                                                    <FlatList
                                                        data={this.state.dataSource}
                                                        renderItem={this.renderItem.bind(this)}
                                                    />
                                                    :
                                                    <Text style={styles.null}>暂无关注平台</Text>
                                            }
                                        </View>
                                    </View>
                                    :
                                    <View style={styles.loginContainer}>
                                        {
                                            versionStatus == 1 ?
                                                null
                                                :
                                                <TouchableOpacity activeOpacity={0.7}
                                                    style={{ alignItems: 'center', }}
                                                    onPress={ThirdLogin._wechatlogin.bind(this, this)}
                                                >
                                                    <Icon name={'ico-wechart'} size={50} color={'#4ACE49'} />
                                                    <Text style={styles.loginText}>微信登陆</Text>
                                                </TouchableOpacity>
                                        }

                                        <TouchableOpacity
                                            style={versionStatus == 1 ? { marginLeft: 0, alignItems: 'center', } : { marginLeft: 50, alignItems: 'center', }}
                                            activeOpacity={0.7}
                                            onPress={ThirdLogin._qqlogin.bind(this, this)}
                                        >
                                            <Icon name={'ico-qq'} size={50} color={'#73c3ff'} />
                                            <Text style={styles.loginText}>QQ登陆</Text>
                                        </TouchableOpacity>
                                    </View>
                            }

                        </ScrollView>
                    </View>
                    {
                        loginState ?
                            <View style={styles.ControlPanefooter}>
                                <TouchableOpacity style={[styles.ControlPanefooterBtn]}
                                    onPress={() => {
                                        navigation.navigate('Account', { tabId: 3 })
                                    }}
                                >
                                    <Icon name={'ico-set'} size={18} color={Theme.color2} />
                                    <Text style={styles.ControlPanefooterBtnText}>设置</Text>
                                </TouchableOpacity>
                                {
                                    versionStatus == 1 ?
                                        null :
                                        <TouchableOpacity
                                            style={styles.ControlPanefooterBtn}
                                            onPress={() => {
                                                let screenProps = this.props.screenProps;
                                                let loginState = screenProps.loginState;
                                                let data = {
                                                    type: 'news',
                                                    title: '推荐一个我天天用的网贷数据APP给你。你试试看！',
                                                    description: "我是" + signState.r_username + "，我在用贷罗盘，网贷行业最专业的数据分析工具，一起来用吧。",
                                                    webpageUrl: 'http://m.dailuopan.com/about/appdown',
                                                    imageUrl: 'http://dailuopan.com/images/shareDlp.png',

                                                }

                                                navigation.navigate('FriendsShare', { data: data })
                                            }}
                                        >
                                            <Icon name={'ico-share'} size={18} color={Theme.color2} />
                                            <Text style={styles.ControlPanefooterBtnText}>推荐给好友</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                            :
                            <View style={styles.ControlPanefooterNoLogin}>
                                <Image source={require('../../../resources/images/logoside.png')} style={{ width: 120.5, height: 48 }} />
                                {
                                    versionStatus == 1 ?
                                        null :
                                        <TouchableOpacity
                                            onPress={() => {
                                                let screenProps = this.props.screenProps;
                                                let data = {
                                                    type: 'news',
                                                    title: '推荐一个我天天用的网贷数据APP给你。你试试看！',
                                                    description: '我在用贷罗盘，网贷行业最专业的数据分析工具，一起来用吧。',
                                                    webpageUrl: 'http://m.dailuopan.com/about/appdown',
                                                    imageUrl: 'http://dailuopan.com/images/shareDlp.png',
                                                }

                                                navigation.navigate('FriendsShare', { data: data })
                                            }}
                                        >
                                            <Icon name={'ico-share'} size={24} color={'#999'} />
                                        </TouchableOpacity>
                                }

                            </View>
                    }




                </View>
            </View>
        )
    }
    renderItem({ item, index }) {

        let navigation = this.props.screenProps.navigation;
        return (
            <TouchableOpacity style={styles.list}
                onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
            >
                <View style={styles.listFundIcon}>
                    {
                        item.fundtype ?
                            <Icon name={'fund-icon'} size={17} color={Theme['fund' + item.fundtype + 'Color']} />
                            :
                            null
                    }
                </View>
                <View style={styles.listRight}>
                    <View style={styles.listPlatName}>

                        <Text style={[styles.platNameText]}>{item.plat_name}</Text>
                        {
                            item.platstatus == 1 ?
                                <Text style={[styles.stateText]}>正常运营</Text>
                                :
                                item.platstatus == 3 ?
                                    <View style={styles.stateZhengyi}>
                                        <Text style={[styles.stateZhengyiText]}>争议中</Text>
                                    </View>
                                    :
                                    <View style={styles.stateBlack}>
                                        <Text style={[styles.stateBlackText]}>黑名单</Text>
                                    </View>

                        }
                    </View>
                    <View style={styles.listOrder}>
                        <Text style={styles.listLabelText}>综合排名</Text>
                        <View style={styles.lisPmNo}>
                            {
                                item.ordernum != 0 ?
                                    <Text style={[styles.listNoText, styles.lisPmNoText]}>{item.ordernum}</Text>
                                    :
                                    <Text style={styles.listNull}>暂无</Text>
                            }

                            {
                                item.ordernum != 0 ?
                                    <Icon name={item.changnum > 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                    :
                                    null
                            }

                        </View>

                    </View>
                    <View style={styles.listYulun}>
                        <Text style={styles.listLabelText}>本周新舆论</Text>
                        <Text style={[styles.listNoText, styles.listYulunText]}>{item.infonum}</Text>
                    </View>
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
        window.EventEmitter.on('isAttention33', (data) => {
            that.getData();
        })

    }
    componentWillUnmount() {
        window.EventEmitter.off('isAttention2')
        window.EventEmitter.off('isAttention33')
    }
    getData() {
        let that = this;
        let memberid = signState.r_id;
        let url = Api.attentionList + '?memberid=' + memberid + '&page=1&pagesize=' + this.state.pageSize;
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
    goBackSuccee() {
        let screenProps = this.props.screenProps;
        let navigation = screenProps.navigation;
        window.EventEmitter.trigger('loginState', '登录好了')
        DeviceEventEmitter.emit('loginState', '登录好了')
        navigation.goBack()
    }
}

const styles = StyleSheet.create({
    ControlPanelWp: {
        flex: 1,
    },
    ControlPaneHeader: {
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 85,
        backgroundColor: Theme.color2,
    },
    ControlPaneHeaderlogin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ControlPaneHeaderloginPortrait: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    userName: {
        width:200,
        flex: 1,
        paddingLeft: 10,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    ControlPaneBody: {
        paddingTop: 5,
        flex: 1,
    },
    guanzhuListContainer: {

    },
    guanzhuListHeader: {
        paddingLeft: 24,
        paddingRight: 10,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    guanzhuListHeaderText: {
        color: Theme.color2,
        fontSize: 16,
    },

    listContainer: {
        paddingTop: 5,
    },
    list: {
        paddingTop: 15,
        flexDirection: 'row',

    },

    listFundIcon: {
        paddingLeft: 5,
        width: 24,

    },
    listRight: {
        paddingBottom: 10,
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listPlatName: {
        width: 110,
    },
    platNameText: {
        paddingBottom:6,
        fontSize: 14,
        color: '#666',
    },
    stateText: {

        fontSize: 11,
        color: '#bbb',
    },
    stateZhengyi:{

       width:50,
       height:16,
       backgroundColor:'#A81616', 
       alignItems: 'center',
       justifyContent: 'center',
    },
    
    stateZhengyiText:{
        fontSize:11,
        color:'#fff',
    },
    stateBlack:{
        width:50,
        height:16,
        backgroundColor:'#1A1A1A', 
        alignItems: 'center',
        justifyContent: 'center',
    },
    stateBlackText:{
        fontSize:11,
        color:'#fff',
    },
    listOrder: {
        width: 80,
    },
    listLabelText: {
        fontSize: 11,
        color: '#666',
    },
    listNoText: {
        fontSize: 14,
        color: '#303030',
        fontWeight: 'bold',
    },
    lisPmNo: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    lisPmNoText: {
        width: 35,
    },
    listNull: {
        fontSize: 11,
        color: '#ccc',
    },
    listYulunText: {
        width: 50,
        paddingTop: 6,
    },
    ControlPanefooter: {
        paddingLeft: 24,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ControlPanefooterBtn: {
        marginRight: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ControlPanefooterBtnText: {
        paddingLeft: 5,
        fontSize: 14,
        color: '#666',
    },

    ControlPaneHeaderNologin: {
        paddingLeft: 25,
    },
    ControlPaneHeaderNologinText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    ControlPaneHeaderNologinText2: {
        paddingTop: 6,
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },
    loginContainer: {
        paddingTop: 120,
        paddingLeft: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        paddingTop: 10,
        fontSize: 14,
        color: '#666',
    },
    ControlPanefooterNoLogin: {
        paddingLeft: 40,
        paddingRight: 30,
        height: 76,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    null: {
        padding: 24,
        color: '#ccc',
    },


})