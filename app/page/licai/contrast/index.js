import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from "react-navigation";

import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Header from '../../../component/navBar/detail'
import Loading from '../../../component/loading';

var fields = [
    {
        name: '产品名称',
        val: 'cpms',
        isShow: true
    },
    {
        name: '募集结束日期',
        val: 'mjjsrq',
        isShow: true
    },
    {
        name: '期限类型',
        val: 'qxms',
        isShow: true
    },
    {
        name: '业绩比较基准',
        val: 'yjbjjz',
        isShow: true
    },
    {
        name: '发行机构',
        val: 'fxjgms',
        isShow: true
    },
    {
        name: '登记编码',
        val: 'cpdjbm',
        isShow: false
    },
    {
        name: '募集方式',
        val: 'mjfsms',
        isShow: false
    },
    {
        name: '运作模式',
        val: 'cplxms',
        isShow: false
    },
    {
        name: '投资性质',
        val: 'cptzxzms',
        isShow: false
    },
    {
        name: '募集币种',
        val: 'mjbz',
        isShow: false
    },
    {
        name: '风险等级',
        val: 'fxdjms',
        isShow: false
    },
    {
        name: '募集起始日期',
        val: 'mjqsrq',
        isShow: false
    },
    {
        name: '产品起始日期',
        val: 'cpqsrq',
        isShow: false
    },
    {
        name: '产品终止日期',
        val: 'cpyjzzrq',
        isShow: false
    },
    {
        name: '业务起始日',
        val: 'kfzqqsr',
        isShow: false
    },
    {
        name: '业务结束日',
        val: 'kfzqjsr',
        isShow: false
    },
    {
        name: '实际天数',
        val: 'cpqx',
        isShow: false
    },
    {
        name: '初始净值',
        val: 'csjz',
        isShow: false
    },
    {
        name: '产品净值',
        val: 'cpjz',
        isShow: false
    },
    {
        name: '累计净值',
        val: 'ljjz',
        isShow: false
    },
    {
        name: '最近一次兑付收益率',
        val: 'syl',
        isShow: false
    },
    {
        name: '收益类型',
        val: 'cpsylxms',
        isShow: false
    },
    {
        name: '投资资产类型',
        val: 'tzlxms',
        isShow: false
    },
    {
        name: '预期最高收益率',
        val: 'yjkhzgnsyl',
        isShow: false
    },
    {
        name: '预期最低收益率',
        val: 'yjkhzdnsyl',
        isShow: false
    }

]


export default class LicaiContrastScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: 0,
            dataSource: null
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        const contrastList = params.contrastList;
        const ids = []

        for (let i = 0; i < contrastList.length; i++) {
            ids.push(contrastList[i].id)
        }

        this.setState({
            id: ids.toString()
        }, () => {
            console.log(this.state.id)
        })
    }
    render() {
        const { navigation } = this.props;
        const { loading, dataSource } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }} forceInset={{ bottom: 'never' }}>
                <View style={[styles.container]}>
                    <StatusBar
                        backgroundColor={'#1A1A1A'}
                        barStyle="light-content"
                    />
                    <Header headerOpt={{ title: '银行产品对比', noBack: true, search: true }} navigation={navigation} />
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollView contentContainerStyle={styles.contentContainer}>
                                    <View style={[styles.containerList]}>
                                        <View style={styles.leftContainer}>
                                            {
                                                fields.map((item, i) => {

                                                    return (
                                                        <View style={[styles.item, item.val == 'cpms' ? styles.itemCpms : null]} key={i}>
                                                            <Text style={[styles.itemLabelText,item.val == 'cpms' ? styles.itemCpmsText : null]}>{item.name}：</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View style={[styles.rightContainer]}>
                                            <ScrollView horizontal={true}>
                                                {
                                                    dataSource.listdata.map((list, i) => {
                                                        return (
                                                            <View style={styles.listTab}>
                                                                {
                                                                    fields.map((item, j) => {
                                                                        if (item.val == 'cpms') {
                                                                            return (
                                                                                <TouchableOpacity style={[styles.item, styles.itemInfo, styles.itemCpms]} onPress={() => {
                                                                                    navigation.navigate('LicaiDetail', { id: list.id, })
                                                                                }}>
                                                                                    <Text style={[styles.itemText,styles.itemCpmsText]} numberOfLines={2}>{list[item.val]}</Text>
                                                                                    <View style={styles.itemType}>
                                                                                        <Text style={styles.itemTypeText}>{list.cpztms}</Text>
                                                                                    </View>
                                                                                </TouchableOpacity>
                                                                            )
                                                                        }
                                                                        return (
                                                                            <View style={[styles.item, styles.itemInfo]} key={j}>
                                                                                <Text style={styles.itemText} numberOfLines={1}>
                                                                                    {list[item.val] !== '' && list[item.val] !== 'N/A' ? (list[item.val] + '').indexOf("/Date") == -1 ? list[item.val] : Util.formatDate2(list[item.val]) : '--'}
                                                                                </Text>
                                                                            </View>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                    <Text style={styles.source}>[数据来源: 中国理财网]</Text>                    
                                </ScrollView>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.getData();
    }
    getData() {

        const that = this
        const url = Api.licaiContrast + '?id=' + this.state.id;

        console.log(url)

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()

                        .then((responseData) => {
                            console.log(responseData)
                            if (responseData.result == 1) {
                                that.setState({
                                    dataSource: responseData.data,
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
    contentContainer:{
        paddingBottom:20,
        backgroundColor: '#fff',
    },
    containerList: {
        paddingTop:20,
        flexDirection: 'row',
        position: 'relative',
      
    },
    leftContainer: {
        // position: 'absolute',
        // left: 0,
        // top: 0,
        zIndex: 99,
        width: 120,
    },
    rightContainer: {
        paddingLeft: 10,
        flex: 1,

    },
    listTab: {
        width: 140,
    },
    item: {
        height: 40,
        justifyContent: 'center',
    },
    itemInfo: {
        paddingRight: 15,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    itemCpms: {
        height: 70,
        justifyContent: 'flex-start',
    },
    itemLabelText: {
        textAlign: 'right',
        color: '#707070',
        fontSize: 12,
    },
    itemText: {
        color: '#101010',
        fontSize: 12,
    },
    itemType: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 20,
        backgroundColor: '#D9A958',
        borderRadius: 8,
    },
    itemTypeText: {
        fontSize: 12,
        color: '#fff',
    },
    itemCpmsText:{
        height:40,
        lineHeight:18,
    },
    source:{
        marginTop:25,
        textAlign:'center',
        color:'#bbb',
        fontSize:12,
    }
})