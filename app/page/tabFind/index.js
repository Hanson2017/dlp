import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import Fund from './fund';
import Activity from './activity';




export default class FindTab extends React.Component {
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
                    <Header headerOpt={{ back: '发现', title: '发现' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
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
                                    <Fund navigation={navigation} data={dataSource.fundcount} />
                                    <Activity navigation={navigation} data={dataSource.flmf} />
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
        let url = Api.findHome;
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