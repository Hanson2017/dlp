import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import LineChart from '../../../echarts/line';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';
import Title from '../../../component/title';


export default class DetailPingji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSource: '',
            isHidden: [true, true, true, true, true, true, true],
            ref: false,
        }
    }
    render() {
        const { platInfo } = this.props;
        const { loading, dataSource, isHidden } = this.state;
        console.log(dataSource)
        if (loading) {
            return (
                <Loading />
            )
        }
        else {
            const data = dataSource.dataDetail;
            const gradecompare = dataSource.gradecompare;
            const dataZh = data.database;
            const wdzj = data.wdzj;
            const p2peye = data.p2peye;
            const dlp = data.dlp;
            const rong360 = data.rong360;
            const xinghuo = data.xinghuo;
            const yifei = data.yifei;
            const yuanwang = data.yuanwang;

            var echartDataTimeZh = [];
            var echartDataZh = [];

            var echartDataTimeWdzj = [];
            var echartDataWdzj = [];

            var echartDataTimeP2peye = [];
            var echartDataP2peye = [];

            var echartDataTimeDlp = [];
            var echartDataDlp = [];

            var echartDataTimeR360 = [];
            var echartDataR360 = [];
            var echartDataTextR360 = [];

            var echartDataTimeXinghuo = [];
            var echartDataXinghuo = [];
            var echartDataTextXinghuo = [];

            var echartDataTimeYifei = [];
            var echartDataYifei = [];

            var gradecompareArr;
            if (gradecompare != '') {
                gradecompareArr = gradecompare.split(',');
            }

            if (dataZh != null) {
                for (const i = 0; i < dataZh.dataview.length; i++) {
                    echartDataZh.push(dataZh.dataview[i].datavalue);
                    echartDataTimeZh.push(dataZh.dataview[i].date_str)
                }
            }

            if (wdzj != null) {
                for (const i = 0; i < wdzj.dataview.length; i++) {
                    echartDataWdzj.push(wdzj.dataview[i].datavalue);
                    echartDataTimeWdzj.push(wdzj.dataview[i].date_str)
                }
            }

            if (p2peye != null) {
                for (const i = 0; i < p2peye.dataview.length; i++) {
                    echartDataP2peye.push(p2peye.dataview[i].datavalue);
                    echartDataTimeP2peye.push(p2peye.dataview[i].date_str)
                }
            }

            if (dlp != null) {
                for (const i = 0; i < dlp.dataview.length; i++) {
                    echartDataDlp.push(dlp.dataview[i].datavalue);
                    echartDataTimeDlp.push(dlp.dataview[i].date_str)
                }
            }

            if (rong360 != null) {
                for (const i = 0; i < rong360.dataview.length; i++) {
                    echartDataR360.push(rong360.dataview[i].datavalue);
                    echartDataTimeR360.push(rong360.dataview[i].date_str)
                    echartDataTextR360.push(rong360.dataview[i].text)
                }
            }

            if (xinghuo != null) {
                for (const i = 0; i < xinghuo.dataview.length; i++) {
                    echartDataXinghuo.push(xinghuo.dataview[i].datavalue);
                    echartDataTimeXinghuo.push(xinghuo.dataview[i].date_str)
                    echartDataTextXinghuo.push(xinghuo.dataview[i].text)
                }
            }

            if (yifei != null) {
                for (const i = 0; i < yifei.dataview.length; i++) {
                    echartDataYifei.push(yifei.dataview[i].datavalue);
                    echartDataTimeYifei.push(yifei.dataview[i].date_str)
                }
            }

            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={[Theme.box, { paddingTop: 10, }]}>
                        <Title data={'机构评级监控'} />
                        <View style={styles.content}>
                            <View style={styles.listContainer}>
                                <View style={styles.listHeader}>
                                    <Text style={[styles.name, styles.nameZh]}>综合指数</Text>
                                    {
                                        data.score != 0 && data.score != '' && data !== null && platInfo.platstatus == 1 ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={[styles.score, styles.scoreZh]}>{data.score}</Text>
                                                <Text style={[styles.totalNum, styles.totalNumZh]}>统计{data.totalNum}家平台中排名</Text>
                                                <Text style={[styles.ordernum, styles.ordernumZh]}>{data.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[0] = !this.state.isHidden[0];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[0] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[0] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[0] ?
                                        null
                                        :
                                        <View style={styles.listBody}>
                                            <View style={styles.bijiao}>
                                                <Text style={styles.bijiaoText}>较上月</Text>
                                                <Icon name={data.changnum >= 0 ? 'up' : 'down'} size={11} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                                <Text style={[styles.bijiaoText, data.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {data.changnum >= 0 ? data.changnum : -data.changnum}%</Text>
                                            </View>
                                            {
                                                gradecompare !== '' ?
                                                    <View style={styles.compareContainer}>
                                                        <View style={styles.compareLine}>
                                                            <View style={[styles.progress, { width: (Theme.screenWidth / 2) * (gradecompareArr[0] / gradecompareArr[2]), backgroundColor: '#4AB3FF', }]}></View>
                                                            <Text style={[styles.compareLineText, { color: '#4AB3FF' }]}>{platInfo.platName} {gradecompareArr[0]}</Text>
                                                        </View>
                                                        <View style={styles.compareLine}>
                                                            <View style={[styles.progress, { width: (Theme.screenWidth / 2) * (gradecompareArr[1] / gradecompareArr[2]) }]}></View>
                                                            <Text style={styles.compareLineText}>行业平均 {gradecompareArr[1]}</Text>
                                                        </View>
                                                        <View style={styles.compareLine}>
                                                            <View style={styles.progress}></View>
                                                            <Text style={styles.compareLineText}>行业最高 {gradecompareArr[2]}</Text>
                                                        </View>
                                                        <View style={styles.compareLine}>
                                                            <View style={[styles.progress, { width: (Theme.screenWidth / 2) * (gradecompareArr[3] / gradecompareArr[2]) }]}></View>
                                                            <Text style={styles.compareLineText}>行业最低 {gradecompareArr[3]}</Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    null
                                            }

                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('综合指数', '综合指数', echartDataTimeZh, echartDataZh)} height={160} />
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 综合评级 end */}
                            <View style={styles.listContainer}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>之家评级</Text>
                                    {
                                        wdzj !== null ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{wdzj.fzzhishu}</Text>
                                                <Text style={styles.totalNum}>统计{wdzj.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{wdzj.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[1] = !this.state.isHidden[1];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[1] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[1] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[1] ?
                                        null
                                        :
                                        <View style={styles.listBody}>
                                            <View style={styles.bijiao}>
                                                <Text style={styles.bijiaoText}>较上月</Text>
                                                <Icon name={wdzj.changnum >= 0 ? 'up' : 'down'} size={11} color={wdzj.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                                <Text style={[styles.bijiaoText, wdzj.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {wdzj.changnum >= 0 ? wdzj.changnum : -wdzj.changnum}%</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>成    交：{wdzj.chengjiao}</Text>
                                                <Text style={styles.infoText}>人  气：{wdzj.renqi}</Text>
                                                <Text style={styles.infoText}>合    规：{wdzj.ganggan}</Text>
                                                <Text style={styles.infoText}>品    牌：{wdzj.ldxing}</Text>
                                                <Text style={styles.infoText}>分散度：{wdzj.fsdu}</Text>
                                                <Text style={styles.infoText}>透明度：{wdzj.tmdu}</Text>
                                            </View>
                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('之家评级', '之家评级', echartDataTimeWdzj, echartDataWdzj)} height={160} />
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 网贷之家 end */}
                            <View style={styles.listContainer}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>天眼评级</Text>
                                    {
                                        p2peye !== null ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{p2peye.level} {p2peye.score}</Text>
                                                <Text style={styles.totalNum}>统计{p2peye.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{p2peye.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[2] = !this.state.isHidden[2];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[2] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[2] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[2] ?
                                        null
                                        :
                                        <View style={styles.listBody}>
                                            <View style={styles.bijiao}>
                                                <Text style={styles.bijiaoText}>较上月</Text>
                                                <Icon name={p2peye.changnum >= 0 ? 'up' : 'down'} size={11} color={p2peye.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                                <Text style={[styles.bijiaoText, p2peye.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {p2peye.changnum >= 0 ? p2peye.changnum : -p2peye.changnum}%</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>信    披：{p2peye.xscore}</Text>
                                                <Text style={styles.infoText}>合    规：{p2peye.hscore}</Text>
                                                <Text style={styles.infoText}>期    限：{p2peye.limit_t}</Text>
                                                <Text style={styles.infoText}>利    率：{p2peye.rate}</Text>
                                                <Text style={styles.infoText}>偿兑性：{p2peye.claims}</Text>

                                                <Text style={styles.infoText}>运    营：{p2peye.operation}</Text>
                                                <Text style={styles.infoText}>地域性：{p2peye.regional}</Text>
                                                <Text style={styles.infoText}>资金流：{p2peye.standard}</Text>
                                                <Text style={styles.infoText}>投    资：{p2peye.investment}</Text>
                                                <Text style={styles.infoText}>借    款：{p2peye.borrowing}</Text>
                                                <Text style={styles.infoText}>流动性：{p2peye.liquidity}</Text>
                                            </View>
                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('天眼评级', '天眼评级', echartDataTimeP2peye, echartDataP2peye)} height={160} />
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 网贷天眼 end */}

                            <View style={styles.listContainer}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>贷罗盘指数</Text>
                                    {
                                        dlp !== null && platInfo.platstatus == 1 ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{dlp.score}</Text>
                                                <Text style={styles.totalNum}>统计{dlp.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{dlp.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[3] = !this.state.isHidden[3];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[3] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[3] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[3] ?
                                        null
                                        :
                                        <View style={styles.listBody}>
                                            <View style={styles.bijiao}>
                                                <Text style={styles.bijiaoText}>较上月</Text>
                                                <Icon name={dlp.changnum >= 0 ? 'up' : 'down'} size={11} color={dlp.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                                <Text style={[styles.bijiaoText, dlp.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {dlp.changnum >= 0 ? dlp.changnum : -dlp.changnum}%</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>资金流：{dlp.inamount}</Text>
                                                <Text style={styles.infoText}>人    气：{dlp.popularity}</Text>
                                                <Text style={styles.infoText}>收益率：{dlp.rate}</Text>
                                                <Text style={styles.infoText}>流动性：{dlp.mobility}</Text>
                                                <Text style={styles.infoText}>分散度：{dlp.dispersion}</Text>
                                                <Text style={styles.infoText}>忠诚度：{dlp.loyalty}</Text>
                                                <Text style={styles.infoText}>体    量：{dlp.stayStill}</Text>
                                                <Text style={styles.infoText}>成长性：{dlp.growth}</Text>
                                            </View>
                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('贷罗盘指数', '贷罗盘指数', echartDataTimeDlp, echartDataDlp)} height={160} />

                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 贷罗盘 end */}

                            <View style={[styles.listContainer, { borderBottomWidth: 0, }]}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>融360评级</Text>
                                    {
                                        rong360 !== null ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{rong360.level}</Text>
                                                <Text style={styles.totalNum}>统计{rong360.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{rong360.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[4] = !this.state.isHidden[4];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[4] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[4] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[4] ?
                                        null
                                        :
                                        <View style={styles.listBody}>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>收    益：{rong360.rate}</Text>
                                                <Text style={styles.infoText}>人    气：{rong360.renqi}</Text>
                                            </View>
                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('融360评级', '融360评级', echartDataTimeR360, echartDataR360, echartDataTextR360)} height={160} />
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 融360 end */}


                        </View>
                    </View>

                    <View style={[Theme.box, Theme.mt10]}>
                        <Title data={'媒体评级监控'} />
                        <View style={styles.content}>
                            <View style={styles.listContainer}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>羿飞评级</Text>
                                    {
                                        yifei !== null ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{yifei.score}</Text>
                                                <Text style={styles.totalNum}>统计{yifei.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{yifei.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[6] = !this.state.isHidden[6];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[6] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[6] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[6] ?
                                        null
                                        :
                                        <View style={styles.listBody}>
                                            <View style={styles.bijiao}>
                                                <Text style={styles.bijiaoText}>较上月</Text>
                                                <Icon name={yifei.changnum >= 0 ? 'up' : 'down'} size={11} color={yifei.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                                <Text style={[styles.bijiaoText, yifei.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {yifei.changnum >= 0 ? yifei.changnum : -yifei.changnum}%</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>利率：{yifei.rate_level}</Text>
                                                <Text style={styles.infoText}>成交：{yifei.amount_level}</Text>
                                                <Text style={styles.infoText}>品牌：{yifei.brand_level}</Text>
                                                <Text style={styles.infoText}>周期：{yifei.period_level}</Text>
                                                <Text style={styles.infoText}>风控：{yifei.security_level}</Text>
                                                <Text style={styles.infoText}>投资人：{yifei.invest_level}</Text>
                                                <Text style={styles.infoText}>均投：{yifei.avg_invest_level}</Text>
                                                <Text style={styles.infoText}>均借：{yifei.avg_loan_level}</Text>
                                                <Text style={styles.infoText}>服务：{yifei.service_level}</Text>
                                                <Text style={styles.infoText}>增长：{yifei.increase_level}</Text>
                                            </View>
                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('羿飞评级', '羿飞评级', echartDataTimeYifei, echartDataYifei)} height={160} />
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 羿飞评级 end */}

                            <View style={[styles.listContainer]}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>远望评级</Text>
                                    {
                                        yuanwang !== null ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{yuanwang.level}</Text>
                                                <Text style={styles.totalNum}>统计{yuanwang.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{yuanwang.ordernum}</Text>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                            </View>
                            {/* 融360 end */}
                            <View style={[styles.listContainer, { borderBottomWidth: 0, }]}>
                                <View style={styles.listHeader}>
                                    <Text style={styles.name}>星火评级</Text>
                                    {
                                        xinghuo !== null ?
                                            <View style={styles.listHeaderCon}>
                                                <Text style={styles.score}>{xinghuo.level}</Text>
                                                <Text style={styles.totalNum}>统计{xinghuo.totalNum}家平台中排名</Text>
                                                <Text style={styles.ordernum}>{xinghuo.ordernum}</Text>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.state.isHidden[5] = !this.state.isHidden[5];
                                                        this.setState({
                                                            ref: !this.state.ref
                                                        })
                                                    }}
                                                >
                                                    <Icon name={isHidden[5] ? 'triangleCircle-down' : 'triangleCircle-up'} size={23} color={isHidden[5] ? '#bbb' : '#4AB3FF'} />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无</Text>
                                    }
                                </View>
                                {
                                    isHidden[5] ?
                                        null
                                        :
                                        <View style={styles.listBody}>

                                            <View style={styles.echartContainer}>
                                                <Echarts option={LineChart.line1('星火评级', '星火评级', echartDataTimeXinghuo, echartDataXinghuo, echartDataTextXinghuo)} height={180} />
                                            </View>
                                        </View>
                                }
                            </View>
                            {/* 星火评级 end */}
                        </View>
                    </View>
                </ScrollView>
            )
        }

    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'all', id)
    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'all', id)
    }
}

const styles = StyleSheet.create({
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    listContainer: {

        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listHeader: {
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,

    },
    listHeaderCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        width: 65,
        fontSize: 11,
        color: '#999',
    },
    score: {
        width: Theme.screenWidth >= 375 ? 70 : 55,
        fontSize: Theme.screenWidth >= 375 ? 14 : 12,
        color: '#666',
    },
    totalNum: {
        width: Theme.screenWidth >= 375 ? 134 : 128,
        fontSize: 11,
        color: '#999',
    },
    ordernum: {
        width: Theme.screenWidth >= 375 ? 50 : 35,
        fontSize: Theme.screenWidth >= 375 ? 14 : 13,
        color: Theme.color,
    },
    nameZh: {
        fontSize: 12,
        color: '#303030',
    },
    scoreZh: {
        fontSize: Theme.screenWidth >= 375 ? 18 : 16,
        color: '#333',
        fontWeight: 'bold',
    },
    totalNumZh: {
        fontSize: 12,
    },
    ordernumZh: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bijiao: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bijiaoText: {
        color: '#707070',
        fontSize: 12,
    },

    info: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoText: {
        color: '#707070',
        fontSize: 12,
        width: (Theme.screenWidth - 62) / 3,
        lineHeight: 20,
    },
    echartContainer: {
        marginTop: 10,
        paddingLeft: 5,
    },
    compareContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    compareLine: {
        marginTop: 7,
        flexDirection: 'row',
        alignItems: 'center',
        height: 16,
    },
    progress: {
        width: Theme.screenWidth / 2,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#ddd',
    },
    compareLineText: {
        paddingLeft: 5,
        fontSize: 11,
        color: '#999',
    },
    null: {
        fontSize: 12,
        color: '#ccc',
    },
})