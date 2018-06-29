import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import TabTop from '../../component/tabTop';
import Data from './data';
import Query from './query';
import Report from './report';

var data = [
    { title: '数据详情', iconName: 'nav-data', fontSize: 24, screenUrl: 'Data', tabId: null },
    { title: '多维度查询', iconName: 'nav-query', fontSize: 24, screenUrl: 'QueryNav', tabId: null },
    { title: '数据报表', iconName: 'nav-report', fontSize: 24, screenUrl: 'ReportsList' },
    { title: '争议名单', iconName: 'nav-zhengyi', fontSize: 24, screenUrl: 'Zhengyi' },
    { title: '黑名单', iconName: 'nav-black', fontSize: 24, screenUrl: 'Black' },
];

export default class DataTab extends React.Component {
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
                    <Header headerOpt={{ back: '排行详情', title: '行业数据' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
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
                                    <Data navigation={navigation} data={dataSource.datalist} />
                                    <Query navigation={navigation} />
                                    <Report navigation={navigation} data={dataSource.reportslist} />
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
        let url = Api.dataHome;
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