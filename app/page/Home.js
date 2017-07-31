import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, StatusBar, TextInput, TouchableOpacity, ScrollView, Image, ImageBackground, ListView, Alert, DeviceEventEmitter, Platform } from 'react-native';
import Header from '../component/Header'

import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';
import Api from '../util/api';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        var data = [
            { title: '综合评级', iconName: 'hpingji', screenUrl: 'Pingji', tabId: null },
            { title: '示范投资', iconName: 'hfund', screenUrl: 'Fund', tabId: null },
            { title: '优惠活动', iconName: 'hhuodong', screenUrl: 'FlmfList', tabId: null },
            { title: '数据查询', iconName: 'hshuju', screenUrl: 'Data', tabId: null },
            { title: '健康指标', iconName: 'hjiankang', screenUrl: 'Health', tabId: null },
            { title: '舆论监控', iconName: 'hyulun', screenUrl: 'Yulun', tabId: null },
            { title: '流量监控', iconName: 'hliuliang', screenUrl: 'Flow', tabId: null },
            { title: '风投系平台', iconName: 'hfengtou', screenUrl: 'Query', tabId: { tab1: 0, tab2: 0 } },
            { title: '上市系平台', iconName: 'hshangshi', screenUrl: 'Query', tabId: { tab1: 0, tab2: 1 } },
            { title: '国资系平台', iconName: 'hguozi', screenUrl: 'Query', tabId: { tab1: 0, tab2: 2 } },
            { title: '银行系平台', iconName: 'hyinhang', screenUrl: 'Query', tabId: { tab1: 0, tab2: 3 } },
            { title: '车贷类平台', iconName: 'hchedai', screenUrl: 'Query', tabId: { tab1: 1, tab2: 0 } },
            { title: '房贷类平台', iconName: 'hfangdai', screenUrl: 'Query', tabId: { tab1: 1, tab2: 1 } },
            { title: '票据类平台', iconName: 'hpiaoju', screenUrl: 'Query', tabId: { tab1: 1, tab2: 2 } },
            { title: '个信类平台', iconName: 'hgexin', screenUrl: 'Query', tabId: { tab1: 1, tab2: 3 } },
            { title: '企贷系平台', iconName: 'hqiye', screenUrl: 'Query', tabId: { tab1: 1, tab2: 4 } },
            { title: '网基类平台', iconName: 'hwangji', screenUrl: 'Query', tabId: { tab1: 1, tab2: 5 } },
            { title: '活期类平台', iconName: 'hhuoqi', screenUrl: 'Query', tabId: { tab1: 1, tab2: 6 } },
            { title: '5年老平台', iconName: 'hfive', screenUrl: 'FiveYears', tabId: null },
            { title: '黑名单', iconName: 'hblack', screenUrl: 'Black' },
            { title: '争议名单', iconName: 'hzhengyi', screenUrl: 'Zhengyi' },
            { title: '数据报表', iconName: 'hbaobiao', screenUrl: 'ReportsList' }
        ];

        if (versionStatus == 1) {
            data = [
                { title: '综合评级', iconName: 'hpingji', screenUrl: 'Pingji', tabId: null },
                { title: '数据查询', iconName: 'hshuju', screenUrl: 'Data', tabId: null },
                { title: '健康指标', iconName: 'hjiankang', screenUrl: 'Health', tabId: null },
                { title: '舆论监控', iconName: 'hyulun', screenUrl: 'Yulun', tabId: null },
                { title: '流量监控', iconName: 'hliuliang', screenUrl: 'Flow', tabId: null },
                { title: '风投系平台', iconName: 'hfengtou', screenUrl: 'Query', tabId: { tab1: 0, tab2: 0 } },
                { title: '上市系平台', iconName: 'hshangshi', screenUrl: 'Query', tabId: { tab1: 0, tab2: 1 } },
                { title: '国资系平台', iconName: 'hguozi', screenUrl: 'Query', tabId: { tab1: 0, tab2: 2 } },
                { title: '银行系平台', iconName: 'hyinhang', screenUrl: 'Query', tabId: { tab1: 0, tab2: 3 } },
                { title: '车贷类平台', iconName: 'hchedai', screenUrl: 'Query', tabId: { tab1: 1, tab2: 0 } },
                { title: '房贷类平台', iconName: 'hfangdai', screenUrl: 'Query', tabId: { tab1: 1, tab2: 1 } },
                { title: '票据类平台', iconName: 'hpiaoju', screenUrl: 'Query', tabId: { tab1: 1, tab2: 2 } },
                { title: '个信类平台', iconName: 'hgexin', screenUrl: 'Query', tabId: { tab1: 1, tab2: 3 } },
                { title: '企贷系平台', iconName: 'hqiye', screenUrl: 'Query', tabId: { tab1: 1, tab2: 4 } },
                { title: '网基类平台', iconName: 'hwangji', screenUrl: 'Query', tabId: { tab1: 1, tab2: 5 } },
                { title: '活期类平台', iconName: 'hhuoqi', screenUrl: 'Query', tabId: { tab1: 1, tab2: 6 } },
                { title: '5年老平台', iconName: 'hfive', screenUrl: 'FiveYears', tabId: null },
                { title: '黑名单', iconName: 'hblack', screenUrl: 'Black' },
                { title: '争议名单', iconName: 'hzhengyi', screenUrl: 'Zhengyi' },
                { title: '数据报表', iconName: 'hbaobiao', screenUrl: 'ReportsList' }
            ];
        }
        this.state = {
            dataList: data,
            searchList: [],
            searchHotList: [],
            searchDemoList: [],
            searchText: '',
            ref: false,
            scrollEnabled: true,
            isSearchListHide: false,
            loading: true
        };
    }
    render() {
        const navigation = this.props.navigation;
        let searchList = this.state.searchList;
        let loginState = this.props.loginState;
        var searchDemoList = ''
        if (!this.state.loading) {
            for (var index = 0; index < this.state.searchDemoList.length; index++) {
                searchDemoList += '"' + this.state.searchDemoList[index].plat_name + '"'
            }
        }
        return (
            <View style={Theme.container}>
                <StatusBar
                    backgroundColor="#000"
                    barStyle="light-content"
                />
                <Header headerOpt={{ back: 'home' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
                <View style={Theme.content}>
                    <Image source={require('../../resources/images/s-bg.jpg')} style={{ width: Theme.screenWidth,  height: Theme.screenHeight - (Platform.OS != 'android' ?100:130)}} >
                        <ScrollView
                            keyboardShouldPersistTaps={'handled'}
                            scrollEnabled={this.state.scrollEnabled}
                        >
                            <View style={[styles.searchWarp, { position: 'relative', zIndex: 9999, }]}>
                                <View style={styles.biaoyuView}
                                    onTouchStart={() => {
                                        this.setState({
                                            isSearchListHide: true
                                        })
                                    }}
                                >
                                    <Image source={require('../../resources/images/s-logo2.png')} style={{ width: 100, height: 100 }} />
                                </View>
                                <View style={{ position: 'relative', zIndex: 9999, }}>
                                    <TextInput
                                        placeholder={'输入你关心平台的名称，如' + searchDemoList}
                                        style={styles.searchInput} underlineColorAndroid="transparent"
                                        returnKeyType={'search'}
                                        clearButtonMode={'while-editing'}
                                        onChangeText={(text) => {
                                            this.setState({
                                                searchText: text,
                                                isSearchListHide: false
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
                                        onFocus={() => {
                                            this.setState({
                                                isSearchListHide: false
                                            })
                                        }}
                                        onSubmitEditing={this.onSubmit.bind(this)}
                                    />

                                    <TouchableOpacity style={styles.searchBtn}
                                        onPress={this.onSubmit.bind(this)}
                                    >
                                        <Text style={styles.searchBtnText}>搜索</Text>
                                    </TouchableOpacity>
                                    {
                                        searchList.length > 0 && this.state.isSearchListHide != true ?
                                            <View style={styles.searchListWp}>
                                                <ScrollView
                                                    onTouchStart={() => {

                                                        console.log('onTouchStart')


                                                        this.setState({
                                                            scrollEnabled: false,
                                                            isSearchListHide: false
                                                        })



                                                    }}
                                                    onTouchEnd={() => {
                                                        console.log('onTouchEnd')
                                                        if (Platform.OS != 'android') {
                                                            this.setState({
                                                                scrollEnabled: true
                                                            })
                                                        }

                                                    }}
                                                    onScrollEndDrag={() => {
                                                        console.log('onScrollEndDrag')
                                                        if (Platform.OS == 'android') {
                                                            this.setState({
                                                                scrollEnabled: true
                                                            })
                                                        }
                                                    }}




                                                >
                                                    <View style={styles.searchListCon}>
                                                        {
                                                            searchList.map((text, i) => {
                                                                return (
                                                                    <TouchableOpacity
                                                                        key={i}
                                                                        style={styles.searchListlist}
                                                                        onPress={() => { navigation.navigate('Detail', { id: text.id_dlp, platName: text.plat_name }) }}
                                                                    >
                                                                        <Text>{text.plat_name}</Text>
                                                                    </TouchableOpacity>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </ScrollView>
                                            </View>
                                            :
                                            null
                                    }
                                </View>

                            </View>
                            <View style={styles.hotsearch}>
                                <Text style={styles.hotsearchTextT}>热门搜索：</Text>
                                {
                                    !this.state.loading ?
                                        this.state.searchHotList.map((item, i) => {
                                            return (
                                                <TouchableOpacity style={styles.hotsearchList}
                                                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                                                >
                                                    <Text style={styles.hotsearchText}>{item.plat_name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.listViewContent}
                                onTouchStart={() => {
                                    this.setState({
                                        isSearchListHide: true
                                    })
                                }}
                            >
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
                                    style={[styles.listRow, { backgroundColor: 'rgba(52,52,52,0)' }]}
                                >
                                    <Icon name={'hzhanghu'} size={25} color={'#4d93e1'} />
                                    <Text style={styles.textStyle}>个人中心</Text>
                                </TouchableOpacity>
                                {this.state.dataList.map((column, i) => {
                                    let screenUrl = column.screenUrl;
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => { navigation.navigate(screenUrl, { tabId: column.tabId }) }}
                                            style={[styles.listRow, { backgroundColor: 'rgba(52,52,52,0)' }]}
                                            key={i}
                                        >
                                            <Icon name={column.iconName} size={25} color={'#4d93e1'} />
                                            <Text style={[styles.textStyle]}>{column.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </ScrollView>
                    </Image>
                </View>

            </View>

        );
    }
    componentDidMount() {
        this.getHotSearch()
    }
    openControlPanel() {
        this.props.openControlPanel();
    }
    onSubmit() {
        let navigation = this.props.navigation;
        let searchList = this.state.searchList;
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
    getHotSearch() {
        let that = this;
        let url = Api.getSearchTop;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()

                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                searchHotList: responseData.hotplat,
                                searchDemoList: responseData.replat,
                                loading: false
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
        paddingBottom: 30,
        paddingLeft: 10,
    },
    listRow: {
        paddingRight: 25,
        width: (Theme.screenWidth - 20) / 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    textStyle: {
        marginTop: 12,
        color: '#30333b',
        fontSize: 13,
    },
    searchWarp: {
        paddingTop: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        padding: 10,
        width: Theme.screenWidth * 0.78,
        height: 40,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderRadius: 4,
        fontSize: 14,
        backgroundColor: '#fff'
    },
    searchBtn: {
        marginTop: 30,
        width: Theme.screenWidth * 0.78,
        height: 42,
        borderRadius: 6,
        backgroundColor: '#4d93e1',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
    searchBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchListWp: {
        position: 'absolute',
        left: 0,
        top: 40,
        width: 290,
        maxHeight: 200,
        zIndex: 999,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderTopWidth: 0,
        backgroundColor: '#fff',
    },
    searchList: {


    },
    searchListlist: {
        paddingLeft: 10,
        height: 44,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',

    },
    biaoyuView: {
        paddingBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 130,
        width: Theme.screenWidth,
    },
    hotsearch: {
        marginTop: 15,
        paddingLeft: Theme.screenWidth * 0.11,
        backgroundColor: 'rgba(52,52,52,0)',
        flexDirection: 'row',
    },
    hotsearchList: {
        marginRight: 15,
    },
    hotsearchTextT: {
        fontSize: 13,
        color: '#cdcdcd',
    },
    hotsearchText: {
        color: '#b1b9c2',
        fontSize: 13,
    }
})



