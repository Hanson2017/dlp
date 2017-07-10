import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Header from '../component/HeaderDetail'
import Loading from '../component/Loading';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';
import Api from '../util/api';
import Util from '../util/util';
import Toast from '../component/Toast';

import ActionShare from '../component/ActionShare';

import Pingji from './detail/pingji';
import Health from './detail/health';
import Data from './detail/data';
import Flow from './detail/flow';
import Gudong from './detail/gudong';
import Yulun from './detail/yulun';
import Comment from './detail/comment';
import Activity from './detail/activity';


export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tabNames: ['评级', '健康度', '数据', '流量', '股东', '舆论', '评论', '活动'],
            dataInfo: {
                isflmf: 0,
                negative_time: null,
                platstatus: 1,
                uptime: null,
                updatetime: null,
                pre_id: null,
                plat_name: null
            }
        };
    }
    render() {
        const tabNames = this.state.tabNames;
        const navigation = this.props.navigation;
        const { params } = this.props.navigation.state;
        const dataInfo = this.state.dataInfo;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ title: params.platName, dataInfo: dataInfo }} navigation={navigation} showActionSheet={this.showActionSheet.bind(this)} />
                <ActionShare ref={'ActionShare'} />

                <View style={styles.detailTop}>
                    <Text style={[styles.detailTopText]}> 状态：
                    {
                            dataInfo.platstatus != 1 ?
                                <Text style={{ color: 'red' }}>黑名单，建议远离</Text>
                                :
                                dataInfo.negative_time == null ?
                                    <Text style={{ color: '#fff' }}>正常运营中</Text>
                                    :
                                    <Text style={{ color: '#FFFF00' }}>争议中，需谨慎</Text>
                        }
                    </Text>
                    <Text style={[styles.detailTopText]}>上线日期：{dataInfo.uptime != '1900-01-01' ? dataInfo.uptime : '未知'}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            if (dataInfo.acurl != null && dataInfo.acurl != '') {
                                Util.Linked(dataInfo.acurl)
                            }
                            else {
                                Util.Linked('http://' + dataInfo.siteurl)
                            }

                        }}
                    >
                        <Text style={[styles.detailTopText]}>访问官网</Text>
                    </TouchableOpacity>
                </View>
                <View style={Theme.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollableTabView
                                renderTabBar={() => <TabBar tabNames={tabNames} />}
                                locked={true}
                            >
                                <View style={styles.content} tabLabel='key1'>
                                    <Pingji
                                        platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime, platstatus: dataInfo.platstatus }}
                                        navigation={navigation}
                                        toastShow={this.toastShow.bind(this)}
                                        toastHide={this.toastHide.bind(this)}
                                    />
                                </View>
                                <View style={styles.content} tabLabel='key2'>
                                    <Health platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime, platstatus: dataInfo.platstatus }} />
                                </View>
                                <View style={styles.content} tabLabel='key3'>
                                    <Data platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime, platstatus: dataInfo.platstatus }} />
                                </View>
                                <View style={styles.content} tabLabel='key4'>
                                    <Flow platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime, platstatus: dataInfo.platstatus }} />
                                </View>
                                <View style={styles.content} tabLabel='key5'>
                                    <Gudong platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime }} />
                                </View>
                                <View style={styles.content} tabLabel='key6'>
                                    <Yulun platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime }} />
                                </View>
                                <View style={styles.content} tabLabel='key7'>
                                    <Comment platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime }} />
                                </View>
                                {versionStatus != 1 ?
                                    <View style={styles.content} tabLabel='key8'>
                                        <Activity platInfo={{ id: params.id, platName: params.platName, updatetime: dataInfo.updatetime }} />
                                    </View>
                                    :
                                    null
                                }

                            </ScrollableTabView>
                    }

                </View>
                <Toast ref={'Toast'} />
            </View>
        );
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
                tabNames: ['评级', '健康度', '数据', '流量', '股东', '舆论', '评论'],
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
    content: {
        flex: 1,
    },
    detailTop: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 12,
        paddingTop: 3,
        justifyContent: 'space-between'
    },
    detailTopText: {
        fontSize: 11.5,
        color: '#fff'
    }
})
