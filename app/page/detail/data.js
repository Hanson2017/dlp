import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../component/TabBar2';
import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';

import Yunying from './data/yunying';
import UserInfo from './data/userInfo';
import Basic from './data/basic';

export default class DetailDataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['运营数据', '用户数据', '基础信息'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let dataSource = this.state.dataSource;
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                    </View>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            {
                                 platInfo.platstatus == 1 ?
                                 <Yunying data={dataSource.dataDetail} />
                                 :
                                  <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                            }
                            
                        </View>
                        <View tabLabel='key2'>
                            {
                                 platInfo.platstatus == 1 ?
                                  <UserInfo data={dataSource.userDetail} />
                                 :
                                  <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                            }
                          
                        </View>
                        <View tabLabel='key3'>
                           <Basic data={dataSource.comDetail} />
                        </View>
                    </ScrollableTabView>
                </View>
            )
        }
    }
     componentDidMount() {
        let id=this.props.platInfo.id;
        Util.getDataDetail(this, 'data', id)
    }

}
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    black: {
        paddingLeft: 15,
        paddingTop: 10,
        color: '#ccc',
        fontSize: 15,
    }
})

