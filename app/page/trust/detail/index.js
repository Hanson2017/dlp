import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, TouchableOpacity, Modal } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";

import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';

import TabBar from '../../../component/tabBar';
import Header from '../../../component/navBar/detail'
import Loading from '../../../component/loading';

import Zonglan from './zonglan';
import Pingji from './pingji';
import Yulun from './yuqing/yulun';
import Info from './info';

export default class TrustDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: 0,
            name: '',
            data: '',
            updatetime: Util.setDate2(new Date()),
            tabNames: ['总览', '评级', '舆论', '信息'],
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            id: params.id,
            name: params.name
        })
    }
    render() {
        const { navigation } = this.props;
        const { loading, id,name,data, updatetime, tabNames } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }} forceInset={{ bottom: 'never' }}>
                <StatusBar
                    backgroundColor={'#1A1A1A'}
                    barStyle="light-content"
                />
                <View style={[styles.container]}>
                    <Header headerOpt={{ title: name, noBack: true, search: true }} navigation={navigation} />
                    <View style={styles.detailTop}>
                        <Text style={styles.stateNormal}>状态：正常运营  |  更新：{updatetime}</Text>
                    </View>
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollableTabView
                                    renderTabBar={() => <TabBar tabNames={tabNames} black={true} />}
                                    locked={true}
                                >
                                    <View style={styles.content} tabLabel='key0'>
                                        <Zonglan data={data} navigation={navigation} />
                                    </View>
                                    <View style={styles.content} tabLabel='key0'>
                                        <Pingji data={data} navigation={navigation} />
                                    </View>
                                    <View style={styles.content} tabLabel='key0'>
                                        <Yulun id={id} navigation={navigation} />
                                    </View>
                                    <View style={styles.content} tabLabel='key0'>
                                        <Info data={data} navigation={navigation} />
                                    </View>
                                </ScrollableTabView>
                        }


                    </View>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount(){
        this.getData()
    }
    getData() {
        const { id } = this.state;
        let that = this
        let url = Api.trustDetail + '?id=' + id;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()

                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    data: responseData.data,
                                    loading: false
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    content: {
        flex: 1,
    },
    detailTop: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 12,
        paddingTop: 3,
        justifyContent: 'center',
    },
    detailTopText: {
        fontSize: 10,
        color: '#707070',
    },
    stateNormal: {
        fontSize: 11,
        color: '#707070',
    },
})