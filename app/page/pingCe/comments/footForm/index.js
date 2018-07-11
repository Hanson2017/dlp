import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, DeviceEventEmitter, Platform, Alert } from 'react-native';
import { Toast } from 'antd-mobile';
import { SafeAreaView } from "react-navigation";
import Header from '../../../../component/navBar/index';
import Theme from '../../../../util/theme';
import Api from '../../../../util/api';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    render() {
        const navigation = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={[Theme.container]}>
                    <Header headerOpt={{ title: '我要点评', search: 'null' }} navigation={navigation} />
                    <View style={styles.content}>
                        <View style={styles.textInputContainer}>
                            <TextInput style={styles.textInput} placeholder={'输入评论'} placeholderTextColor={'#666'} underlineColorAndroid="transparent" multiline={true} onChangeText={(value) => this.setState({ value })} />
                        </View>
                        <TouchableOpacity style={styles.submitBtn} activeOpacity={0.6} onPress={() => {
                            this.onSubmit()
                        }}>
                            <Text style={styles.submitBtnText}>提交评论</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
    onSubmit() {
        const that = this;
        const navigation = this.props.navigation;
        const { params } = navigation.state;
        const cid = params.cid;
        const value = this.state.value;
        const userid = signState.r_id;
        const username = signState.r_username;

        if (value == '') {
            if (Platform.OS == 'android') {
                Alert.alert('请输入评论')
            }
            else {
                Toast.fail('请输入评论', 1)
            }

            return false;
        }

        let formData = new FormData();

        formData.append("cid", cid);// 评测ID
        formData.append("detail", value);// 评测内容 
        formData.append("userid", userid);// 登录用户ID 
        formData.append("username", username);// username 登录用户名 

        let opt = {
            method: 'POST',
            body: formData
        }

        const url = Api.pingCeCommentAdd;

        fetch(url, opt)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData => {
                            if (responseData.result == 1) {
                                if (Platform.OS == 'android') {
                                    Alert.alert('提交成功!')
                                }
                                else {
                                    Toast.success('提交成功!')
                                }

                                setTimeout(
                                    () => {
                                        that.goBackSuccee();
                                    },
                                    1000
                                );

                            }
                            else {
                                if (Platform.OS == 'android') {
                                    Alert.alert(responseData.resultmsg)
                                }
                                else {
                                    Toast.fail(responseData.resultmsg)
                                }

                            }

                        }))
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => { console.error(error) })
    }
    goBackSuccee() {
        let navigation = this.props.navigation;
        const { params } = navigation.state;
        const cid = params.cid;
        const routeName = params.routeName;
        window.EventEmitter.trigger('commentAddPC', '提交成功')
        window.EventEmitter.trigger('commentAddPC222', '提交成功')
        DeviceEventEmitter.emit('commentAddPC', '提交成功')
        if (routeName == 'PingCeDetail') {
            navigation.replace('PingCeCommentList', { cid: cid })
        }
        else if (routeName == 'PingCeCommentList') {
            navigation.goBack();
        }


    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    content: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    textInputContainer: {
        padding: 10,
        paddingTop: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    textInput: {
        padding: 0,
        margin: 0,
        height: 180,
        fontSize: 14,
        textAlignVertical: 'top',
    },
    submitBtn: {
        marginTop: 20,
        width: Theme.screenWidth - 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.color,
        borderRadius: 8,
    },
    submitBtnText: {

        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
})