import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from "react-navigation";

import Api from '../../util/api';
import Theme from '../../util/theme';
import Loading from '../../component/loading'
import Header from '../../component/navBar'
import Title from '../../component/title'

class List extends React.Component {

    render() {
        const { titleText, navigation, navList, n ,borderNot} = this.props;
        return (
            <View style={[styles.listContainer,borderNot?{borderBottomWidth:0}:null]}>
                <Text style={styles.listText}>{titleText}</Text>
                <View style={styles.listBody}>
                    {
                        navList.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} style={[styles.nav, { width: (Theme.screenWidth - 30) / n }]}
                                    onPress={() => { navigation.navigate('Query', { tabId: item.tabId }) }}
                                >
                                    <Text style={styles.nameText}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

var beijingNav = [
    { name: '风投系', tabId: { tab1: 0, tab2: 0 } },
    { name: '上市系', tabId: { tab1: 0, tab2: 1 } },
    { name: '国资系', tabId: { tab1: 0, tab2: 2 } },
    { name: '银行系', tabId: { tab1: 0, tab2: 3 } },
    { name: '民营系', tabId: { tab1: 0, tab2: 4 } },
];
var yewuNav = [
    { name: '车贷', tabId: { tab1: 1, tab2: 0 } },
    { name: '房贷', tabId: { tab1: 1, tab2: 1 } },
    { name: '票据', tabId: { tab1: 1, tab2: 2 } },
    { name: '个信', tabId: { tab1: 1, tab2: 3 } },
    { name: '企业', tabId: { tab1: 1, tab2: 4 } },
    { name: '网基', tabId: { tab1: 1, tab2: 5 } },
    { name: '活期', tabId: { tab1: 1, tab2: 6 } },
    { name: '其他', tabId: { tab1: 1, tab2: 7 } },
];

var cunguanNav = [
    { name: '银行直连', tabId: { tab1: 4, tab2: 0 } },
    { name: '直接存管', tabId: { tab1: 4, tab2: 1 } },
    { name: '联合存管', tabId: { tab1: 4, tab2: 2 } },
]



export default class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            ref: false,
            loading: true,
            diquNav: [],
            dateTimeNav: [],
        };
    }
    render() {
        const { navigation } = this.props;
        const { dataSource, loading, diquNav, dateTimeNav } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '多维度分析', title: '多维度分析' }} navigation={navigation} />
                    <View style={styles.content}>
                        <ScrollView>
                            <Title data={'多维度分析'} />
                            {
                                loading ?
                                    <View style={{ paddingTop: 60, }}>
                                        <Loading />
                                    </View>
                                    :
                                    <View style={styles.navContainer}>
                                        <List titleText={'按背景'} navigation={navigation} navList={beijingNav} n={6} />
                                        <List titleText={'按业务类型'} navigation={navigation} navList={yewuNav} n={8} />
                                        <List titleText={'按地区'} navigation={navigation} navList={diquNav} n={Theme.screenWidth >= 375 ? 8 : 6} />
                                        <List titleText={'按时间'} navigation={navigation} navList={dateTimeNav} n={5} />
                                        <List titleText={'按银行存管'} navigation={navigation} navList={cunguanNav} n={4} borderNot={true} />
                                    </View>
                            }
                        </ScrollView>
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
        let url = Api.query;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                var diquNavNew = [];
                                var dateTimeNavNew = [];
                                for (let i = 0; i < responseData.data.diqu.length; i++) {
                                    diquNavNew.push({ name: responseData.data.diqu[i].name, tabId: { tab1: 2, tab2: i } }, )
                                }
                                for (let j = 0; j < responseData.data.shijian.length; j++) {
                                    dateTimeNavNew.push({ name: responseData.data.shijian[j].name + '年', tabId: { tab1: 3, tab2: j } }, )
                                }

                                that.setState({
                                    dataSource: responseData.data,
                                    loading: false,
                                    diquNav: diquNavNew,
                                    dateTimeNav: dateTimeNavNew
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
    content: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    navContainer: {
        marginTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    listContainer: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listText: {
        fontSize: 16,
        color: Theme.color2,
    },
    listBody: {
        paddingTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nav: {
        marginBottom: 12,
    },
    nameText: {
        fontSize: 13,
        color: '#666',
    }
})
