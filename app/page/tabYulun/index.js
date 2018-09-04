import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import TabTop from '../../component/tabTop';

import Pingce from './pingce';
import Yulun from './yulun';
import Comment from './comment';
import BBS from './bbs';
import Mianze from '../mianze';

var data = [
    { title: '贷罗盘论坛', iconName: 'ios-people', fontSize: 40, screenUrl: 'BBs', tabId: null,Ionicons:true,top:-7 },
    { title: '评测监控', iconName: 'nav-pingce', fontSize: 30, screenUrl: 'PingCe', tabId: null },
    { title: '舆论监控', iconName: 'nav-yulun', fontSize: 30, screenUrl: 'Yulun', tabId: null },
    { title: '平台点评', iconName: 'nav-dianping', fontSize: 30, screenUrl: 'CommentPlat', tabId: null },
];

export default class YulunTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            ref: false,
            loading: true,
            isRefreshing: false,
            bbsHejList: [],
            bbsBgtList: [],
            bbsHejthread: 0,
            bbsBgtthread: 0,
            bbsHejtoday: 0,
            bbsBgttoday: 0,
        };
    }
    render() {
        const { navigation, loginState } = this.props;
        const { loading, dataSource ,bbsHejList,bbsBgtList,bbsHejthread,bbsBgtthread,bbsHejtoday,bbsBgttoday} = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '网贷行业舆情', title: '网贷行业舆情' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <TabTop navigation={navigation} data={data} />
                                    <BBS navigation={navigation} data={{bbsHejList:bbsHejList,bbsBgtList:bbsBgtList,bbsHejthread:bbsHejthread,bbsBgtthread:bbsBgtthread,bbsHejtoday:bbsHejtoday,bbsBgttoday:bbsBgttoday}}  />
                                    <Pingce navigation={navigation} data={dataSource.mplist} />
                                    <Yulun navigation={navigation} data={dataSource.sentlist} />
                                    <Comment navigation={navigation} data={dataSource.commentlist} />
                                    <Mianze />
                                </ScrollView>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    openControlPanel() {
        this.props.openControlPanel();
    }
    componentDidMount() {
        this.getData()
        this.getDataBBS();
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData();

    }
    getData() {
        let that = this;
        let url = Api.sentHome;
        this.setState({
            loading: true,
            isRefreshing: true,
        })
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    dataSource: responseData.data,
                                    loading: false,
                                    isRefreshing: false,
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
    getDataBBS() {
        let that = this;
        let url = Api.bbs + 'gettype=yqhome&getnum=5';
        this.setState({
            loading: true,
            isRefreshing: true,
        })
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.state == 200) {
                                that.setState({
                                    loading: false,
                                    isRefreshing: false,
                                    bbsHejList: responseData.forum1list,
                                    bbsBgtList: responseData.forum2list,
                                    bbsHejthread: responseData.forum1today,
                                    bbsBgtthread: responseData.forum2today,
                                    bbsHejtoday: responseData.forum1today,
                                    bbsBgttoday: responseData.forum2today,
                                })
                            }
                            console.log(responseData)
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