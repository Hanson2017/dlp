import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, StatusBar, TextInput, TouchableOpacity, ScrollView, Image, ListView, Alert, DeviceEventEmitter } from 'react-native';
import Header from '../component/Header'

import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';
import Api from '../util/api';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        var data = [
            // { title: '个人中心', iconName: 'user', iconColor: '#f15a4a', screenUrl: 'Account', tabId: null },
            { title: '综合评级', iconName: 'npingji', iconColor: '#29ab91', screenUrl: 'Pingji', tabId: null },
            { title: '示范投资', iconName: 'nshifan', iconColor: '#29ab91', screenUrl: 'Fund', tabId: null },
            { title: '优惠活动', iconName: 'nyouhui', iconColor: '#f39826', screenUrl: 'FlmfList', tabId: null },

            { title: '数据查询', iconName: 'nshuju', iconColor: '#29ab91', screenUrl: 'Data', tabId: null },
            { title: '健康指标', iconName: 'njiankang', iconColor: '#29ab91', screenUrl: 'Health', tabId: null },
            { title: '舆论监控', iconName: 'nyulun', iconColor: '#29ab91', screenUrl: 'Yulun', tabId: null },
            { title: '流量监控', iconName: 'nliuliang', iconColor: '#f15a4a', screenUrl: 'Flow', tabId: null },

            { title: '风投系平台', iconName: 'nfengtou', iconColor: '#f39826', screenUrl: 'Query', tabId: { tab1: 0, tab2: 0 } },
            { title: '上市系平台', iconName: 'nshangshi', iconColor: '#29ab91', screenUrl: 'Query', tabId: { tab1: 0, tab2: 1 } },
            { title: '国资系平台', iconName: 'nguozi', iconColor: '#f15a4a', screenUrl: 'Query', tabId: { tab1: 0, tab2: 2 } },
            { title: '银行系平台', iconName: 'nyinhang', iconColor: '#f15a4a', screenUrl: 'Query', tabId: { tab1: 0, tab2: 3 } },

            { title: '车贷类平台', iconName: 'nchedai', iconColor: '#29ab91', screenUrl: 'Query', tabId: { tab1: 1, tab2: 0 } },
            { title: '房贷类平台', iconName: 'nfangdai', iconColor: '#f15a4a', screenUrl: 'Query', tabId: { tab1: 1, tab2: 1 } },
            { title: '票据类平台', iconName: 'npiaoju', iconColor: '#f39826', screenUrl: 'Query', tabId: { tab1: 1, tab2: 2 } },
            { title: '个信类平台', iconName: 'ngexin', iconColor: '#f39826', screenUrl: 'Query', tabId: { tab1: 1, tab2: 3 } },

            { title: '企贷系平台', iconName: 'nqidai', iconColor: '#29ab91', screenUrl: 'Query', tabId: { tab1: 1, tab2: 4 } },
            { title: '网基类平台', iconName: 'nwangji', iconColor: '#29ab91', screenUrl: 'Query', tabId: { tab1: 1, tab2: 5 } },
            { title: '活期类平台', iconName: 'nhuoqi', iconColor: '#f15a4a', screenUrl: 'Query', tabId: { tab1: 1, tab2: 6 } },

            { title: '5年老平台', iconName: 'nfive', iconColor: '#f39826', screenUrl: 'FiveYears', tabId: null },

            { title: '黑名单', iconName: 'nblack', iconColor: '#000', screenUrl: 'Black' },
            { title: '争议名单', iconName: 'nzhengyi', iconColor: 'red', screenUrl: 'Zhengyi' }
        ];

        this.state = {
            dataList: data,
            searchList: [],
            searchText: '',
            ref: false
        };
    }

    render() {
        const navigation = this.props.navigation;
        let searchList = this.state.searchList;
        let loginState = this.props.loginState;
        return (

            <View style={Theme.container}>
                <StatusBar
                    backgroundColor="#000"
                    barStyle="light-content"
                />
                <Header headerOpt={{ back: 'home' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} />

                <View style={Theme.content}>
                    <ScrollView keyboardShouldPersistTaps={'handled'}>
                        <View style={styles.searchWarp}>
                            <Image source={require('../../resources/images/biaoyu.png')} style={{ width: 147, height: 30 }} />
                            <View style={{ marginTop: 30, marginBottom: 30, }}>
                                <TextInput
                                    placeholder='输入你关心平台的名称，如“陆金所”'
                                    style={styles.searchInput} underlineColorAndroid="transparent"
                                    returnKeyType={'search'}
                                    clearButtonMode={'while-editing'}
                                    onChangeText={(text) => {
                                        this.setState({
                                            searchText: text
                                        })
                                        if (text != '') {
                                            this.getSearch(text)
                                        }
                                        else {
                                            this.setState({
                                                searchList: []
                                            })
                                        }

                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.searchBtn}
                                onPress={() => {
                                    if (this.state.searchText != '') {
                                        if (searchList.length == 1) {
                                            navigation.navigate('Detail', { id: searchList[0].id_dlp, platName: searchList[0].plat_name })
                                        }
                                        else if (searchList.length > 1) {

                                            navigation.navigate('Search', { keywords: this.state.searchText })
                                        }
                                        else {
                                            Alert.alert(' ', '您搜索的平台不存在')
                                        }
                                    }
                                    else {
                                        Alert.alert(' ', '请输入你关心平台的名称')
                                    }
                                }}
                            >
                                <Text style={styles.searchBtnText}>搜索</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listViewContent}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    if (loginState) {
                                        navigation.navigate('Account')
                                    }
                                    else {
                                        navigation.navigate('Login')
                                    }

                                }}
                                style={styles.listRow}
                            >
                                <Icon name={'user'} size={25} color={'#f15a4a'} />
                                <Text style={styles.textStyle}>个人中心</Text>
                            </TouchableOpacity>
                            {this.state.dataList.map((column, i) => {
                                let screenUrl = column.screenUrl;
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.5}
                                        onPress={() => { navigation.navigate(screenUrl, { tabId: column.tabId }) }}
                                        style={styles.listRow}
                                        key={i}
                                    >
                                        <Icon name={column.iconName} size={25} color={column.iconColor} />
                                        <Text style={styles.textStyle}>{column.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }

    openControlPanel() {
        this.props.openControlPanel();
    }
    getSearch(keywords) {
        let that = this;
        let url = Api.search + '?keywords=' + keywords;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                searchList: responseData
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
}

const styles = StyleSheet.create({
    listViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    listRow: {
        width: 84,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
    },
    textStyle: {
        marginTop: 12,
        color: '#333',
        fontSize: 12
    },
    searchWarp: {
        paddingTop: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        padding: 10,
        width: 290,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        fontSize: 14,
    },
    searchBtn: {
        width: 290,
        height: 42,
        borderRadius: 6,
        backgroundColor: '#dd0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})



