import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity,Image, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Util from '../../util/util';
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import TabTop from '../../component/tabTop';
import Title from '../../component/title';
import Mianze from '../mianze';

import List from './list';

import PjTemp from './list/temp/pj';
import HealthTemp from './list/temp/health';
import FlowTemp from './list/temp/flow';


var data = [
    { title: '机构评级', iconName: 'nav-pingjiJG', fontSize: 32, screenUrl: 'PingjiJG', tabId: null },
   
    { title: '健康度分析', iconName: 'nav-health', fontSize: 32, screenUrl: 'Health', tabId: null },
    { title: '流量监控', iconName: 'nav-flow', fontSize: 32, screenUrl: 'Flow', tabId: null },
];


export default class PingjiTab extends React.Component {
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
                    <Header headerOpt={{ back: '排行详情', title: '排行详情' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
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
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        Util.Linked('https://www.yinchengjinfu.com/ind/h5/act1.html?channel=dlp')
                                    }}>
                                        <Image
                                            style={{ width: Theme.screenWidth, height: Theme.screenWidth * (160 / 1000) }}
                                            source={{ uri: 'http://www.dailuopan.com/images/advertising/yinchengjinfu-dlpapp.png' }}
                                        />
                                    </TouchableOpacity>   
                                    <View style={[styles.container, Theme.box, Theme.mt10]}>
                                        <Title data={'机构评级概况'} navigation={navigation} screenUrlInfo={{ screenUrl: 'PingjiJG', tabId: null }} />
                                        <List navigation={navigation} data={dataSource.gradelist}>
                                            <PjTemp navigation={navigation} data={dataSource.gradelist} field={'score'} fieldText={'综合指数'} width={45} />
                                        </List>
                                       
                                    </View>

                                    <View style={[styles.container, Theme.box, Theme.mt10]}>
                                        <Title data={'健康度分析'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Health', tabId: null }} />
                                        <List navigation={navigation} data={dataSource.dlplist}>
                                            <PjTemp navigation={navigation} data={dataSource.dlplist} field={'score'} fieldText={'健康度综指'} width={50} />
                                        </List>
                                        
                                    </View>

                                    <View style={[styles.container, Theme.box, Theme.mt10]}>
                                        <Title data={'流量监控'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Flow', tabId: null }} />
                                        <List navigation={navigation} data={dataSource.flowlist}>
                                            <PjTemp navigation={navigation} data={dataSource.flowlist} field={'score'} fieldText={'综合流量指数'} width={53} />
                                        </List>                                       
                                    </View>
                                    <Mianze />
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
        let url = Api.gradeHome;
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
                                console.log(responseData)
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
    listBox: {
        paddingTop: 15,
        paddingLeft: 17,
    },
    hdContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hdText: {
        fontSize: 11,
        color: '#999',
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listNo: {
        paddingRight: 10,
        width: 34,
        alignItems: 'center',
    },
    listNoText: {
        fontSize: 12,
        color: '#333',
    },
    listplatName: {
        paddingRight: 6,
        width: Theme.screenWidth >= 375 ? 76 : 60,
    },
    listplatNameText: {
        fontSize: Theme.screenWidth >= 375 ? 12 : 11,
        color: '#333',
    },
    listscore: {
        width: Theme.screenWidth >= 375 ? 80 : 60,
    },
    listscoreText: {
        fontSize: Theme.screenWidth >= 375 ? 14 : 12,
        color: Theme.color,
        fontWeight: 'bold',
    },
    listKeywords: {
        flexDirection: 'row',
    },
    key: {
        width: 50,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BBE2FF',
        borderRadius: 3,
    },
    key2: {
        marginLeft: 5,
        width: 90,
    },
    keyNull: {
        backgroundColor: '#ddd',
    },
    keyText: {
        fontSize: 10,
        color: '#fff',
    },
})