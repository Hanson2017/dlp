import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../../../util/api';

export default class HelpDetailFoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollection: false,
            disabled: false,
        }
    }

    render() {
        const { navigation, cid, commentcount, routeName } = this.props;
        const { isCollection } = this.state;
        return (
            <View style={[styles.container]}>
                <TouchableOpacity style={styles.inputBtn}
                    onPress={() => {
                        if (signState != null) {
                            navigation.navigate('PingCeCommentForm', { cid: cid, routeName: routeName })
                        }
                        else {
                            Alert.alert(
                                '提示',
                                '请先登录后评论！',
                                [
                                    { text: '取消' },
                                    { text: '确认', onPress: this.goLogin.bind(this) },
                                ]
                            )
                        }

                    }}
                >
                    <Text style={styles.inputBtnText}>我也要发表评论</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.Btn, styles.reviewsBtn]}
                    onPress={() => {
                        navigation.navigate('PingCeCommentList', { cid: cid })

                    }}
                >

                    <Icon name={commentcount !== 0 ? 'ico-reviews' : 'ico-reviewsNo'} size={24} color={'#737373'} />
                    {
                        commentcount !== 0 ?
                            <Text style={styles.reviewsBtnText}>{commentcount}</Text>
                            :
                            null
                    }
                </TouchableOpacity>
                <TouchableOpacity style={[styles.Btn]}
                    onPress={() => {
                        this.onPressCollection()
                    }
                    }
                >
                    <Icon name={isCollection ? 'ico-collectionAl' : 'ico-collection'} size={24} color={isCollection ? '#FFA500' : '#737373'} />

                </TouchableOpacity>
                <TouchableOpacity style={styles.Btn}
                    onPress={() => {
                        this.props.that.showActionSheet();
                    }}
                >
                    <Icon name={'ico-share2'} size={21} color={'#737373'} />
                </TouchableOpacity>

            </View>
        )
    }
    componentDidMount() {

        if (signState != null) {
            this.isCollection()
        }

    }
    goLogin() {
        this.props.navigation.navigate('Account')
    }
    //是否已收藏
    isCollection() {
        let that = this;
        let cid = this.props.cid;
        let memberid = signState.r_id;
        let url = Api.isCollection + '?cid=' + cid + '&memberid=' + memberid;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                if (responseData.data == 1) {
                                    that.setState({
                                        isCollection: true,
                                    })
                                }
                                else {
                                    that.setState({
                                        isCollection: false,
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

    //点击收藏    
    onPressCollection() {
        if (signState != null) {
            if (this.state.isCollection) {
                Alert.alert(
                    '提示',
                    '是否取消收藏?',
                    [
                        { text: '取消' },
                        { text: '确认', onPress: this.collectionDel.bind(this) },
                    ]
                )
            }
            else {
                this.collectionAdd()
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
    // 添加关注
    collectionAdd() {
        let that = this;
        let thatt = this.props.that;
        let cid = this.props.cid;
        let memberid = null;
        if (signState != null) {
            memberid = signState.r_id;
        }
        that.setState({
            disabled: true
        })
        // that.props.noBack(false);
        let url = Api.collectionAdd + '?cid=' + cid + '&memberid=' + memberid;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    isCollection: true,
                                    disabled: false
                                })
                                window.EventEmitter.trigger('isCollection', '已收藏')
                                window.EventEmitter.trigger('isCollection2', '已收藏')
                                thatt.toastShow('收藏成功')

                                setTimeout(
                                    () => {
                                        // that.props.noBack(true);
                                        thatt.toastHide()
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
    collectionDel() {
        let that = this;
        let thatt = this.props.that;
        let cid = this.props.cid;
        let memberid = null;
        if (signState != null) {
            memberid = signState.r_id;
        }
        that.setState({
            disabled: true
        })
        // that.props.noBack(false);
        let url = Api.collectiondel + '?cid=' + cid + '&memberid=' + memberid;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    isCollection: false,
                                    disabled: false
                                })
                                window.EventEmitter.trigger('isCollection', '取消收藏')
                                window.EventEmitter.trigger('isCollection2', '取消收藏')
                                thatt.toastShow('已取消收藏')

                                setTimeout(
                                    () => {
                                        // that.props.noBack(true);
                                        thatt.toastHide()
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
        padding: 10,
        paddingLeft: 15,
        paddingRight: 10,
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#fdfdfd',
        flexDirection: 'row',
        alignItems: 'center',
    },

    inputBtn: {
        flex: 1,
        marginRight: 15,
        paddingLeft: 10,
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 15,
        justifyContent: 'center',
    },
    inputBtnText: {
        fontSize: 12,
        color: '#bbb',
    },
    Btn: {
        width: 48,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewsBtn: {
        position: 'relative',
    },
    reviewsBtnText: {
        position: 'absolute',
        top: 2,
        left: 26,
        fontSize: 11,
        color: '#737373',
    },
})