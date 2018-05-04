import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { List, Radio, Flex, Toast } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
import Header from '../../component/Header'
import Theme from '../../util/theme';
import Api from '../../util/api';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            value: ''
        };
    }
    render() {
        let navigation = this.props.navigation;
        const data = [
            { value: 1, label: '好评' },
            { value: 2, label: '中评' },
            { value: 3, label: '差评' },
        ];
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '', title: '评论', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    <List>
                        {
                            data.map((val, i) => {
                                return (
                                    <RadioItem key={i} checked={this.state.type === val.value} onChange={() => this.onChange(val.value)}>
                                        {val.label}
                                    </RadioItem>
                                )
                            })
                        }
                    </List>
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
    onChange = (type) => {
        this.setState({
            type,
        });
    }
    onSubmit() {
        const { params } = this.props.navigation.state;
        const cid = params.cid;
        const type = this.state.type;
        const value = this.state.value;
        const userid = signState.r_id;
        const username = signState.r_username;

        if (type == null) {
            Toast.fail('请选择评论类型', 1)
            return false;
        }
        if (value == '') {
            Toast.fail('评论内容不能为空', 1)
            return false;
        }

        let formData = new FormData();

        formData.append("cid", cid);// 平台ID 
        formData.append("type", type);// 评论类型 
        formData.append("detail", value);// 评论内容 
        formData.append("userid", userid);// 登录用户ID
        formData.append("username", username);// 登录用户名 

        let opt = {
            method: 'POST',
            body: formData
        }

        const url = Api.commentAdd;
   
        fetch(url,opt)
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