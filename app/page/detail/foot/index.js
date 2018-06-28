import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Util from '../../../util/util'
import Api from '../../../util/api';


export default class DetailFoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGuanzhu: false,
            disabled: false,
            isHidden: true,
        };
    }
    render() {
        const { isGuanzhu, isHidden } = this.state;
        const {coverIsHidden,navigation}=this.props;
        return (
            <View style={styles.container}>
                {
                    coverIsHidden ?
                        null
                        :
                        <View style={styles.menu}>
                            <View style={styles.triangDown}>
                                <View style={styles.triangDownN}></View>
                            </View>
                            <TouchableOpacity style={styles.menuItem}
                                onPress={() => {
                                    navigation.navigate('Main')
                                }}
                            >
                                <Text style={styles.menuText}>首页</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}
                                 onPress={() => {
                                    navigation.navigate('PingjiJG')
                                }}
                            >
                                
                                <Text style={styles.menuText}>机构评级</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}
                                 onPress={() => {
                                    navigation.navigate('Health')
                                }}
                            >
                               
                                <Text style={styles.menuText}>健康度分析</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}
                                 onPress={() => {
                                    navigation.navigate('Query',{tabId: { tab1: 0, tab2: 0 }})
                                }}
                            >
                               
                                <Text style={styles.menuText}>多维度查询</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0, }]}
                                 onPress={() => {
                                    navigation.navigate('Data')
                                }}
                            >
                               
                                <Text style={styles.menuText}>数据详情</Text>
                            </TouchableOpacity>
                        </View>
                }

                <TouchableOpacity style={[styles.btn, styles.btnGuanzhu]}
                    onPress={() => {
                        this.onPressGuanzhu()
                    }
                    }
                >
                    <Icon name={'ico-start'} size={22} color={isGuanzhu ? '#FFA500' : '#666'} />
                    <Text style={[styles.text]}>{isGuanzhu ? '取消关注' : '加关注'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnMenu]}
                    onPress={()=>{
                        this.showMenu();
                    }}
                >
                    <Icon name={'ico-menu'} size={20} color={'#666'} />
                    <Text style={styles.text}>快捷菜单</Text>
                </TouchableOpacity>
            </View>
        )
    }
    showMenu(){
        this.props.coverIsShow(!this.props.coverIsHidden)
    }
    componentDidMount() {
        let id = this.props.id;

        this.subscription22 = DeviceEventEmitter.addListener('loginState', (data) => {
            setTimeout(() => {
                this.isAttention()
            }, 300)

        })

        if (signState != null) {
            this.isAttention()
        }

    }
    componentWillUnmount() {
        this.subscription22.remove();
    }
    goLogin() {
        let navigation = this.props.navigation;
        navigation.navigate('Account')
    }
    onPressGuanzhu() {
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
    }
    //是否关注了该平台
    isAttention() {
        let that = this;
        let id = this.props.id;
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
        let id = this.props.id;
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
                                        that.props.noBack(true);
                                        that.props.toastHide()
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
        let id = this.props.id;
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
                                that.props.toastShow('已取消关注')

                                setTimeout(
                                    () => {
                                        that.props.noBack(true);
                                        that.props.toastHide()
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
    container: {
        position: 'relative',
        paddingTop: 6,
        paddingBottom: 6,
        height: 46,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',
        zIndex: 999,
    },
    menu: {
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        top: -243,
        right: 22,
        width: 150,
        height: 225,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    triangDown: {
        position: 'absolute',
        bottom: -14,
        left: 61,
        borderTopWidth: 14,
        borderLeftWidth: 14,
        borderRightWidth: 14,
        borderTopColor: '#bbb',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',

    },
    triangDownN: {
        position: 'absolute',
        left: -13,
        top: -15,
        borderTopWidth: 13,
        borderLeftWidth: 13,
        borderRightWidth: 13,
        borderTopColor: '#fff',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    menuItem: {
        paddingLeft: 5,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        paddingLeft: 5,
        color: '#666',
        fontSize: 14,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnGuanzhu: {
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    text: {
        paddingLeft: 8,
        fontSize: 14,
        color: '#666',
    },
})