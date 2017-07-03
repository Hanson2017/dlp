import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

import Loading from '../../component/Loading';
import Title from '../../component/Title';
import Util from '../../util/util'
import Theme from '../../util/theme';
import stylesList from '../../css/listData';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import LineChart from '../../echarts/line';

export default class Flow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: null
        };
    }
    render() {
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            let data = this.state.dataSource.dataDetail;
            if (data != null) {
                var zs_baidu = [];
                var zs_so = [];
                var zs_76676 = [];
                var pr_zz = [];
                var pr_az = [];

                if (data.zs_baidu_str != 0) {
                    zs_baidu = data.zs_baidu_str.split(',');
                }
                if (data.zs_so_str != 0) {
                    zs_so = data.zs_so_str.split(',');
                }
                if (data.zs_76676_str != 0) {
                    zs_76676 = data.zs_76676_str.split(',');
                }
                if (data.pr_zz_str != 0) {
                    pr_zz = data.pr_zz_str.split(',');
                }
                if (data.pr_az_str != 0) {
                    pr_az = data.pr_az_str.split(',');
                }
            }
            return (
                <View>
                    {
                        platInfo.platstatus == 1 ?
                            data != null ?
                                <ScrollView>

                                    <View style={stylesList.update}>
                                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                                    </View>
                                    <View style={{ paddingBottom: 10, }}>
                                        <View style={styles.infoHead}>
                                            <Text style={[styles.td, styles.td1, { color: '#2D3640' }]}>综合指数</Text>
                                            <Text style={[styles.td, styles.td2, { color: '#2D3640', fontWeight: 'bold', fontSize: 14, }]}>{data.score}</Text>
                                            <Text style={[styles.td, styles.td3]}>
                                                (统计{data.totalNum}家平台中排名<Text style={styles.num}>{data.ordernum}</Text>)
                                 </Text>
                                        </View>
                                        <Text style={styles.bijiao}>较上月
                              <Icon name={data.changnum >= 0 ? 'up' : 'down'} size={11} color={data.changnum >= 0 ? '#ff0063' : '#009963'} />
                                            {data.changnum >= 0 ? data.changnum : -data.changnum}%
                             </Text>
                                    </View>
                                    <View style={styles.flowwp}>
                                        <View style={styles.flowList}>
                                            <Text style={styles.flowListName}>百度指数</Text>
                                            <View style={styles.flowListChart}>
                                                <Echarts option={LineChart.line3('百度指数', zs_baidu)} height={20} />
                                            </View>
                                            <View style={styles.flowListNum}>
                                                <Text style={styles.zhishuName}>指数</Text>
                                                <Text style={styles.zhishuNum}>{data.zs_baidu}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.flowList}>
                                            <Text style={styles.flowListName}>站长工具</Text>
                                            <View style={styles.flowListChart}>
                                                <Echarts option={LineChart.line3('站长工具', pr_zz)} height={20} />
                                            </View>
                                            <View style={styles.flowListNum}>
                                                <Text style={styles.zhishuName}>权重</Text>
                                                <Text style={styles.zhishuNum}>{data.pr_zz}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.flowList}>
                                            <Text style={styles.flowListName}>爱站网</Text>
                                            <View style={styles.flowListChart}>
                                                <Echarts option={LineChart.line3('爱站网', pr_az)} height={20} />
                                            </View>
                                            <View style={styles.flowListNum}>
                                                <Text style={styles.zhishuName}>权重</Text>
                                                <Text style={styles.zhishuNum}>{data.pr_az}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.flowList}>
                                            <Text style={styles.flowListName}>好搜</Text>
                                            <View style={styles.flowListChart}>
                                                <Echarts option={LineChart.line3('好搜', zs_so)} height={20} />
                                            </View>
                                            <View style={styles.flowListNum}>
                                                <Text style={styles.zhishuName}>指数</Text>
                                                <Text style={styles.zhishuNum}>{data.zs_so}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.flowList}>
                                            <Text style={styles.flowListName}>76676</Text>
                                            <View style={styles.flowListChart}>
                                                <Echarts option={LineChart.line3('76676', zs_76676)} height={20} />
                                            </View>
                                            <View style={styles.flowListNum}>
                                                <Text style={styles.zhishuName}>指数</Text>
                                                <Text style={styles.zhishuNum}>{data.zs_76676}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </ScrollView>
                                :
                                <Text style={styles.null}>暂无数据</Text>
                            :
                            <Text style={styles.black}>黑名单平台，已停止流量监控</Text>
                    }
                </View>

            )
        }

    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'flow', id)
    }

}


const styles = StyleSheet.create({

    infoHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
        height: 20,
    },
    td: {
        color: '#ABB7C4',
        fontSize:12.5
    },
    td1: {
        width: 65,
    },
    td2: {
        width: 80,
    },
    num: {
        color: '#2E99E8',
        fontWeight: 'bold',
        fontSize: 15,
    },
    bijiao: {
        marginTop: 10,
        paddingLeft: 15,
        color: '#ccc',
        fontSize: 12,
    },

    null: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        color: '#ccc',
    },
    flowwp: {
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        marginTop: 15,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    flowList: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    flowListName: {
        width: 80,
        color: '#abb7c4'
    },
    flowListChart: {
        position: 'relative',
        width: 110,
    },
    flowListNum: {
        marginLeft: 20,
        flexDirection: 'row',
    },
    zhishuName: {
        width: 40,
        color: '#abb7c4'
    },
    zhishuNum: {
        color: '#666',
        fontWeight: 'bold',
    },
    black: {
        paddingLeft: 15,
        paddingTop: 20,
        color: '#ccc',
        fontSize: 15,
    }
})
