import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Modal } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";

import TabBar from '../../component/tabBar';
import Theme from '../../util/theme';
import Api from '../../util/api';

import Header from '../../component/navBar/detail'
import Loading from '../../component/loading';
import Toast from '../../component/toast';
import ActionShare from '../../component/actionShare';


import Foot from './foot';
import All from './zonglan';
import Pingji from './pingji/index';
import Health from './health/index';
import Data from './data/index';
import Yuqing from './yuqing/index';
import Activity from './activity/index';
import Info from './info';
import Menu from './foot/menu';


export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tabNames: ['总览', '评级', '健康度', '数据', '舆情', '活动', '信息'],
            dataInfo: '',
            noBack: true,
            footNot: 0,
            menuHide:true,
        };
    }
    isFootNot(index) {
        this.setState({
            footNot: index,
        })
    }
    changeMenuHide(fn){
        this.setState({
            menuHide: fn,
        })
    }
    render() {
        const { navigation } = this.props;
        const { tabNames, dataInfo, noBack ,menuHide} = this.state;
        const { params } = navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={[styles.container]}>
                    <Header headerOpt={{ title: params.platName, noBack: noBack }} navigation={navigation} showActionSheet={this.showActionSheet.bind(this)} />
                    <ActionShare ref={'ActionShare'} />
                    <Menu ref={'Menu'}  navigation={navigation} that={this} menuHide={menuHide} />
                    {
                        this.state.loading ?
                            null
                            :
                            <View style={styles.detailTop}>
                                {
                                    dataInfo.platstatus != 1 ?
                                        <Text style={styles.stateZhengyi}><Text style={styles.bold}>黑名单，建议远离</Text>  |  更新：{dataInfo.updatetime}</Text>
                                        :
                                        dataInfo.negative_time == null ?
                                            <Text style={styles.stateNormal}>状态：正常运营  |  更新：{dataInfo.updatetime}</Text>
                                            :
                                            <Text style={styles.stateZhengyi}><Text style={styles.bold}>争议中，需谨慎</Text>  |  更新：{dataInfo.updatetime}</Text>
                                }
                            </View>
                    }

                    <View style={Theme.content}>
                        {
                            this.state.loading ?
                                <Loading />
                                :
                                <ScrollableTabView
                                    renderTabBar={() => <TabBar tabNames={tabNames} black={true} />}
                                    locked={true}
                                    onChangeTab={(obj) => {
                                        this.isFootNot(obj.i)
                                    }}
                                >
                                    <View style={styles.content} tabLabel='key0'>
                                        <All platInfo={{ id: params.id, platName: params.platName, platstatus: dataInfo.platstatus }} dataInfo={dataInfo} navigation={navigation} />
                                    </View>
                                    <View style={styles.content} tabLabel='key1'>
                                        <Pingji platInfo={{ id: params.id, platName: params.platName, platstatus: dataInfo.platstatus }} />
                                    </View>
                                    <View style={styles.content} tabLabel='key2'>
                                        <Health platInfo={{ id: params.id, platName: params.platName, platstatus: dataInfo.platstatus }} />
                                    </View>
                                    <View style={styles.content} tabLabel='key3'>
                                        <Data platInfo={{ id: params.id, platName: params.platName, platstatus: dataInfo.platstatus }} navigation={navigation} />
                                    </View>

                                    <View style={styles.content} tabLabel='key5'>
                                        <Yuqing platInfo={{ id: params.id, platName: params.platName }} navigation={navigation} isFootNot={this.isFootNot.bind(this)} />
                                    </View>
                                    {
                                        versionStatus != 1 ?
                                            <View style={styles.content} tabLabel='key4'>
                                                <Activity platInfo={{ id: params.id, platName: params.platName }} navigation={navigation} />
                                            </View>
                                            :
                                            null
                                    }

                                    <View style={styles.content} tabLabel='key6'>
                                        <Info platInfo={{ id: params.id, platName: params.platName }} navigation={navigation} />
                                    </View>

                                </ScrollableTabView>
                        }

                    </View>

                    {
                        this.state.footNot == 'null' ?
                            null
                            :
                            <Foot
                                id={params.id}
                                that={this}                              
                                navigation={navigation}
                                menuHide={menuHide}
                            />

                    }

                    <Toast ref={'Toast'} />

                </View>
            </SafeAreaView>
        );
    }
   
    noBack(flt) {
        this.setState({
            noBack: flt,
        })
    }
    toastShow(data) {
        this.refs.Toast.show(data)
    }
    toastHide() {
        this.refs.Toast.cancel();
    }
    showActionSheet() {
        const { params } = this.props.navigation.state;
        let dataInfo = this.state.dataInfo;
        let data = {
            type: 'news',
            title: dataInfo.plat_name + '评级／数据／健康度／流量（每日更新）',
            description: '包含：1.各个主流评级机构对' + dataInfo.plat_name + '的评级数据；2.' + dataInfo.plat_name + '运营数据监控、分析、诊断及未来趋势预测；' + '3.' + dataInfo.plat_name + '网站流量分析',
            webpageUrl: 'http://m.dailuopan.com/detail/' + params.id,
            imageUrl: 'http://dailuopan.com/images/shareDlp.png',
        }
        this.refs.ActionShare.show(data)
    }
    showMenu(){     
        this.refs.Menu.show()
    }
    hideMenu(){     
        this.refs.Menu.cancel()
    }
    componentDidMount() {
        this.getData()
        if (versionStatus == 1) {
            this.setState({
                tabNames: ['总览', '评级', '健康度', '数据', '舆情', '信息'],
            })
        }
    }
    getData() {
        const { params } = this.props.navigation.state;
        let that = this
        let url = Api.detail + '?type=head' + '&id_dlp=' + params.id

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                dataInfo: responseData,
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
    stateZhengyi: {
        fontSize: 11,
        color: '#E51C23',
    },
    stateBlack: {
        fontSize: 10,
        color: '#fff',
    },
    detailCover: {
        position: "absolute",
        width: Theme.screenWidth,
        height: Theme.screenHeight,
        left: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        backgroundColor: "#ccc",
        opacity: 1,
        paddingBottom: 10,
        zIndex: 998,
    },
    bold: {
        fontWeight: 'bold',
    },
})
