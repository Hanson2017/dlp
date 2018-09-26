import React, { Component } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";
import Util from '../../util/util';
import Theme from '../../util/theme';
import Api from '../../util/api';
import Loading from '../../component/loading';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';

import All from './temp/all';
import All2 from './temp/all2';
import List from './temp/list';


export default class FundScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['总览', '1号 稳健型', '2号 平衡型', '3号 收益型'],
            loading: true,
            dataSource: null,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { tabNames, dataSource, updatetime } = this.state;
        const { navigation } = this.props;
        const { params } = navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '示范投资', title: '示范投资' }} navigation={navigation} />
                    <View style={styles.update}>
                        <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                    </View>
                    <View style={Theme.content}>
                        {
                            this.state.loading ?
                                <Loading />
                                :
                                <All2 data={dataSource} navigation={navigation} />
                                // <ScrollableTabView
                                //     renderTabBar={() => <TabBar tabNames={tabNames} />}
                                //     initialPage={params.tabId ? params.tabId : 0}
                                // >
                                //     <View style={styles.content} tabLabel='key1'>
                                //         <All data={dataSource} navigation={navigation} />
                                //     </View>
                                //     <View style={styles.content} tabLabel='key2'>
                                //         <List data={dataSource.fund1} fundType={1} navigation={navigation}  echartColor={['#4847bf', '#7f7fff', '#006699', '#94c4e2', '#4d9dcf']} />
                                //     </View>
                                //     <View style={styles.content} tabLabel='key3'>
                                //         <List data={dataSource.fund2} fundType={2} navigation={navigation} echartColor={['#ffc55c', '#e88613', '#9c6c33', '#e2b394', '#c69c6d']}  />
                                //     </View>
                                //     <View style={styles.content} tabLabel='key4'>
                                //         <List data={dataSource.fund3} fundType={3} navigation={navigation}echartColor={['#b19deb', '#9c45de', '#4d226d', '#8557a7', '#662d91', '#9a308d', '#9686ae', '#9b9fc3', '#8f71a6', '#6264d6']} />
                                //     </View>
                                // </ScrollableTabView>
                        }

                    </View>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        let that = this;
        let url = Api.fund+'?type=firm';
        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData,
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
    content: {
        flex: 1,
    },
    update: {
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 10,
        color: '#83CAFF',
    }
})

