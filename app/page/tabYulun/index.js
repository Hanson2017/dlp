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

var data = [
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
        };
    }
    render() {
        const { navigation, loginState } = this.props;
        const { loading, dataSource } = this.state;
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
                                    <Pingce navigation={navigation} data={dataSource.mplist} />
                                    <Yulun navigation={navigation} data={dataSource.sentlist} />
                                    <Comment navigation={navigation} data={dataSource.commentlist} />
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
}