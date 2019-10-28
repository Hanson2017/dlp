import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Loading from '../../component/loading';
import Header from '../../component/navBar';
import Item from './item';
import Title from './title'

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
        const { loading, dataSource } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '热门活动', title: '热门活动', search: true }} openControlPanel={this.props.openControlPanel} loginState={this.props.loginState} navigation={navigation} />
                    <View style={[Theme.content,{paddingTop:10,}]}>
                        <ScrollView>
                            {
                                loading ?
                                    <Loading />
                                    :
                                    <View>
                                        <Title title={'网贷类返利'} iconBgC='#67cbdb' />
                                        {
                                            dataSource.map((item, i) => {

                                                if (item.activity.atype == 1) {
                                                    console.log(item.atype)
                                                    return (
                                                        <Item key={i} data={item} navigation={navigation} />
                                                    )
                                                }

                                            })
                                        }
                                        <Title title={'银行理财类返利'} iconBgC='#FF9900' />
                                        {
                                            dataSource.map((item, i) => {

                                                if (item.activity.atype == 4) {
                                                    console.log(item.atype)
                                                    return (
                                                        <Item key={i} data={item} navigation={navigation} />
                                                    )
                                                }

                                            })
                                        }
                                    </View>
                                // <FlatList
                                //     data={dataSource}
                                //     renderItem={this.renderItem.bind(this)}
                                //     refreshControl={
                                //         <RefreshControl
                                //             refreshing={this.state.isRefreshing}
                                //             onRefresh={this.onRefresh.bind(this)}
                                //         />
                                //     }
                                // />
                            }
                        </ScrollView>
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
        console.log(url)
        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
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