import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";

import TabBar from '../../component/tabBar';
import Theme from '../../util/theme';
import Api from '../../util/api';
import Util from '../../util/util';

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


export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tabNames: ['总览', '评级', '健康度', '数据', '舆情', '活动', '信息'],
            dataInfo: '',
            noBack: true,
            coverIsHidden: true,
        };
    }
    render() {
        const { navigation } = this.props;
        const { tabNames, dataInfo, noBack, coverIsHidden } = this.state;
        const { params } = navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={[styles.container]}>
                    <Header headerOpt={{ title: params.platName, noBack: noBack }} navigation={navigation} showActionSheet={this.showActionSheet.bind(this)} />
                    <ActionShare ref={'ActionShare'} />
                    {
                        coverIsHidden ?
                            null
                            :
                            <TouchableOpacity style={styles.detailCover}
                                onPress={() => {
                                    this.setState({
                                        coverIsHidden: true,
                                    })
                                }}
                            ></TouchableOpacity>
                    }
                    {
                        this.state.loading ?
                            null
                            :
                            <View style={styles.detailTop}>
                                {
                                    dataInfo.platstatus != 1 ?
                                        <Text style={styles.stateBlack}>黑名单，建议远离  |  更新：{dataInfo.updatetime}</Text>
                                        :
                                        dataInfo.negative_time == null ?
                                            <Text style={styles.stateNormal}>状态：正常运营  |  更新：{dataInfo.updatetime}</Text>
                                            :
                                            <Text style={styles.stateZhengyi}>争议中，需谨慎  |  更新：{dataInfo.updatetime}</Text>
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
                                        <Yuqing platInfo={{ id: params.id, platName: params.platName }} navigation={navigation} />
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
                    <Foot
                        id={params.id}
                        toastShow={this.toastShow.bind(this)}
                        toastHide={this.toastHide.bind(this)}
                        noBack={this.noBack.bind(this)}
                        coverIsShow={this.coverIsShow.bind(this)}
                        coverIsHidden={coverIsHidden}
                        navigation={navigation}
                    />
                    <Toast ref={'Toast'} />
                </View>
            </SafeAreaView>
        );
    }
    coverIsShow(flt) {
        this.setState({
            coverIsHidden: flt,
        })
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
        this.refs.ActionShare.show(this.state.dataInfo)
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
        fontSize: 10,
        color: '#707070',
    },
    stateZhengyi: {
        fontSize: 10,
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
        opacity: 0,
        paddingBottom: 10,
        zIndex: 998,
    },
})
