import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Loading from '../../component/loading';
import Header from '../../component/navBar';
import Item from './item';

export default class ActivityListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            page: 1,
            pageSize: 20,
            dataSource: [],
            totalNum: 0,
        };
    }
    render() {
        const { navigation } = this.props;
        const { loading,dataSource } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '热门活动', title: '热门活动', search: true }} openControlPanel={this.props.openControlPanel} loginState={this.props.loginState} navigation={navigation} />
                    <View style={Theme.content}>                   
                        {
                            loading ?
                                <Loading />
                                :
                                <FlatList
                                    data={dataSource}
                                    renderItem={this.renderItem.bind(this)}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                />
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    renderItem({ item, index }) {
        const { navigation } = this.props;
        return (
            <Item data={item} navigation={navigation} />
        )
    }
    componentDidMount() {
        this.getData()
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData()
    }
    getData() {
        const that = this;
        const { page, pageSize } = this.state;
        const url = Api.activitylist + 'page=' + page + '&pagesize=' + pageSize;
        
        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            
                            that.setState({
                                loading: false,
                                isRefreshing: false,
                                dataSource: responseData.data,
                                totalNum: responseData.totalNum,
                                page: responseData.page,
                                pageSize: responseData.pageSize,
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
   
})