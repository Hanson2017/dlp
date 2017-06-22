'use strict';
import Api from './api';
import StorageLoginInfo from '../config/storageLogin'
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';

module.exports = {
    _qqlogin(that) {
        QQAPI.login()
            .then((result) => {
                let access_token = result.access_token;
                let oauth_consumer_key = result.oauth_consumer_key;
                let openid = result.openid;
                let url = 'https://graph.qq.com/user/get_user_info?access_token=' + access_token + '&oauth_consumer_key=' + oauth_consumer_key + '&openid=' + openid;
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((responseData) => {
                                    if (responseData.ret == 0) {
                                        let urlN = Api.getUserinfo + '?fromtype=qq&connectid=' + result.openid + '&username=' + responseData.nickname;
                                        fetch(urlN)
                                            .then((res) => {
                                                if (res.ok) {
                                                    res.json()
                                                        .then((resData) => {
                                                            if (resData.result == 1) {
                                                                StorageLoginInfo.storageSave(resData);
                                                                that.goBackSuccee();
                                                            }
                                                            else {
                                                                alert('提示', resData.resultmsg)
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
                                })
                        }
                        else {
                            console.log('网络请求失败')
                        }
                    })
                    .catch((error) => {
                        console.log('error:', error)
                    })
            })
            .catch((error) => { console.log('error is', error) });
    },
    _wechatlogin(that) {
        WechatAPI.login()
            .then((result) => {
                let appid = result.appid;
                let secret = 'a8255c5e58fd6ed391b811432069e77c'
                let code = result.code;
                let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code';
                fetch(url)
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((res) => {
                                    let access_token = res.access_token;
                                    let openid = res.openid;
                                    let urlInfo = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid;
                                    fetch(urlInfo)
                                        .then((resInfo) => {
                                            if (resInfo.ok) {
                                                resInfo.json()
                                                    .then((resInfo) => {
                                                        let urlN = Api.getUserinfo + '?fromtype=wx&connectid=' + openid + '&username=' + resInfo.nickname;
                                                        fetch(urlN)
                                                            .then((ress) => {
                                                                if (ress.ok) {
                                                                    ress.json()
                                                                        .then((ressData) => {
                                                                            if (ressData.result == 1) {
                                                                                StorageLoginInfo.storageSave(ressData);
                                                                                that.goBackSuccee();
                                                                            }
                                                                            else {
                                                                                alert('提示', resData.resultmsg)
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
                                                    })
                                            }
                                            else {
                                                console.log('网络请求失败')
                                            }
                                        })
                                        .catch((error) => {
                                            console.log('error:', error)
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
            })
            .catch((error) => { console.log('error is', error) });
    }
}