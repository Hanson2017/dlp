import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Util from '../../../../util/util'
import Theme from '../../../../util/theme';
import Loading from '../../../../component/loading';
import LineChart from '../../../../echarts/line';

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
                <View style={{flex:1,paddingTop:40,}}>
                    <Loading />
                </View>
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

                        data != null ?
                            <ScrollView contentContainerStyle={styles.container}>
                                <View style={[styles.topScore, Theme.box]}>
                                    <View style={styles.topScoreLeft}>
                                        <Text style={styles.topScoreLabel}>流量综合指数</Text>
                                        <Text style={styles.topScoreNum}>{data.score}</Text>
                                        <View style={styles.topScoreBijiao}>
                                            <Text style={styles.topScoreText}>较上月 </Text>
                                            <Icon name={data.changnum >= 0 ? 'up' : 'down'} size={11} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                            <Text style={[styles.topScoreText, data.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {Math.abs(data.changnum)}%</Text>
                                        </View>
                                    </View>
                                    <View style={styles.topScoreRight}>
                                        <Text style={styles.topScoreLabel}>流量排名</Text>
                                        <Text style={styles.topScoreNum}>{data.ordernum}</Text>
                                        <Text style={styles.topScoreText}>在统计的{data.totalNum}家平台中</Text>
                                    </View>
                                </View>

                                <View style={[Theme.mt10, styles.flowwp]}>
                                    <View style={styles.flowList}>
                                        <View style={styles.flowListName}>
                                            <Text style={styles.flowListNameText}>百度指数</Text>
                                        </View>
                                        <View style={styles.flowListChart}>
                                            <Echarts option={LineChart.line3('百度指数', zs_baidu)} height={20} />
                                        </View>
                                        <View style={styles.flowListNum}>
                                            <Text style={styles.zhishuName}>指数</Text>
                                            <Text style={styles.zhishuNum}>{data.zs_baidu}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.flowList}>
                                        <View style={styles.flowListName}>
                                            <Text style={styles.flowListNameText}>站长工具</Text>
                                        </View>
                                        <View style={styles.flowListChart}>
                                            <Echarts option={LineChart.line3('站长工具', pr_zz)} height={20} />
                                        </View>
                                        <View style={styles.flowListNum}>
                                            <Text style={styles.zhishuName}>权重</Text>
                                            <Text style={styles.zhishuNum}>{data.pr_zz}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.flowList}>
                                        <View style={styles.flowListName}>
                                            <Text style={styles.flowListNameText}>爱站网</Text>
                                        </View>

                                        <View style={styles.flowListChart}>
                                            <Echarts option={LineChart.line3('爱站网', pr_az)} height={20} />
                                        </View>
                                        <View style={styles.flowListNum}>
                                            <Text style={styles.zhishuName}>权重</Text>
                                            <Text style={styles.zhishuNum}>{data.pr_az}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.flowList}>
                                        <View style={styles.flowListName}>
                                            <Text style={styles.flowListNameText}>好搜指数</Text>
                                        </View>
                                        <View style={styles.flowListChart}>
                                            <Echarts option={LineChart.line3('好搜', zs_so)} height={20} />
                                        </View>
                                        <View style={styles.flowListNum}>
                                            <Text style={styles.zhishuName}>指数</Text>
                                            <Text style={styles.zhishuNum}>{data.zs_so}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView>
                            :
                            <View style={styles.null}>
                                <Text style={styles.nullText}>暂无数据</Text>
                            </View>
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
    container: {
        backgroundColor: Theme.bgColor,
    },

    topScore: {
        paddingTop: 20,
        paddingBottom: 25,
        flexDirection: 'row',
    },
    topScoreLeft: {
        alignItems: 'center',
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    topScoreRight: {
        alignItems: 'center',
        flex: 1
    },
    topScoreBijiao: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topScoreLabel: {
        fontSize: 12,
        color: '#999',
    },
    topScoreNum: {
        width:100,
        textAlign:'center',
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: 26,
        color: '#333',
        fontWeight: 'bold',
    },
    topScoreText: {
        fontSize: 10,
        color: '#999',
    },

    flowwp: {
        backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
    },
    flowList: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 65,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    flowListName: {
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 22,
        backgroundColor: '#bbb',
        borderRadius: 4,
    },
    flowListNameText: {
        color: '#fff',
        fontSize: 12,
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
        color: '#999',
        fontSize: 12,
    },
    zhishuNum: {
        width: 60,
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
    },
    null: {
        paddingTop: 15,
        paddingLeft: (Theme.screenWidth - 210) / 2,
        backgroundColor: '#fff',
    },
    nullText: {
        fontSize: 14,
        color: '#bbb',
    }

})
