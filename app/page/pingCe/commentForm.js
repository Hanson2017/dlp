import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Toast } from 'antd-mobile';
import Header from '../../component/Header'
import Theme from '../../util/theme';
import Api from '../../util/api';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '', title: '评论', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    <TextInput style={styles.textInput} placeholder={'输入评论'} multiline={true} onChangeText={(value) => this.setState({ value })} />
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        this.onSubmit()
                    }}>
                        <Text>提交评论</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    onSubmit() {
        const { params } = this.props.navigation.state;
        const cid = params.cid;
        const value = this.state.value;
        const userid = signState.r_id;
        const username = signState.r_username;

        if (value == '') {
            Toast.fail('评论内容不能为空', 1)
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
                            console.log(responseData)
                        }))
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => { console.error(error) })
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 150,
        borderWidth: 1,
        borderColor: '#999',
    },
    submitBtn: {
        width: 300,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    }
})