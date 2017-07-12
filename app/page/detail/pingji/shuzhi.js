import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import LineChart from '../../../echarts/line';
import Api from '../../../util/api';
import Title from '../../../component/Title';

export default class Shuzhi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [true, true, true, true, true, true, true],
            ref: false
        };
    }
    render() {
        var navigation = this.props.navigation;
        var data = this.props.data;
        var dataWdzj = data.wdzj;
        var dataP2peye = data.p2peye;
        var dataDlp = data.dlp;
        var dataR360 = data.rong360;
        var dataXinghuo = data.xinghuo;
        var dataYifei = data.yifei;
        var dataZh = data.database;
        var isHidden = this.state.isHidden;

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

        if (dataZh != null) {
            for (const i = 0; i < dataZh.dataview.length; i++) {
                echartDataZh.push(dataZh.dataview[i].datavalue);
                echartDataTimeZh.push(dataZh.dataview[i].date_str)
            }
        }

        if (dataWdzj != null) {
            for (const i = 0; i < dataWdzj.dataview.length; i++) {
                echartDataWdzj.push(dataWdzj.dataview[i].datavalue);
                echartDataTimeWdzj.push(dataWdzj.dataview[i].date_str)
            }
        }

        if (dataP2peye != null) {
            for (const i = 0; i < dataP2peye.dataview.length; i++) {
                echartDataP2peye.push(dataP2peye.dataview[i].datavalue);
                echartDataTimeP2peye.push(dataP2peye.dataview[i].date_str)
            }
        }

        if (dataDlp != null) {
            for (const i = 0; i < dataDlp.dataview.length; i++) {
                echartDataDlp.push(dataDlp.dataview[i].datavalue);
                echartDataTimeDlp.push(dataDlp.dataview[i].date_str)
            }
        }

        if (dataR360 != null) {
            for (const i = 0; i < dataR360.dataview.length; i++) {
                echartDataR360.push(dataR360.dataview[i].datavalue);
                echartDataTimeR360.push(dataR360.dataview[i].date_str)
                echartDataTextR360.push(dataR360.dataview[i].text)
            }
        }

        if (dataXinghuo != null) {
            for (const i = 0; i < dataXinghuo.dataview.length; i++) {
                echartDataXinghuo.push(dataXinghuo.dataview[i].datavalue);
                echartDataTimeXinghuo.push(dataXinghuo.dataview[i].date_str)
                echartDataTextXinghuo.push(dataXinghuo.dataview[i].text)
            }
        }

        if (dataYifei != null) {
            for (const i = 0; i < dataYifei.dataview.length; i++) {
                echartDataYifei.push(dataYifei.dataview[i].datavalue);
                echartDataTimeYifei.push(dataYifei.dataview[i].date_str)
            }
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ marginBottom: 20 }}>
                    {
                        data.score != 0 && data.score != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1, { color: '#2D3640' }]}>综合指数</Text>
                                    <Text style={[styles.td, styles.td2, { color: '#2D3640', fontWeight: 'bold', fontSize: 14, }]}>{data.score}</Text>
                                    <Text style={[styles.td, styles.td3]}>
                                        (统计{data.totalNum}家平台中排名<Text style={styles.num}>{data.ordernum}</Text>)
                                </Text>
                                </View>
                                {
                                    isHidden[0] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <Text style={styles.infoText}>较上月
                                            <Icon name={data.changnum >= 0 ? 'up' : 'down'} size={11} color={data.changnum >= 0 ? '#ff0063' : '#009963'} />
                                                {data.changnum >= 0 ? data.changnum : -data.changnum}%
                                        </Text>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('综合指数', '综合指数', echartDataTimeZh, echartDataZh)} height={180} />
                                            </View>
                                        </View>

                                }
                                <TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[0] = !this.state.isHidden[0];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[0] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>综合指数</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>
                            </View>
                    }

                    {/*综合指数 end*/}

                    {
                        dataWdzj != null && dataWdzj != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1]}>之家评级</Text>
                                    <Text style={[styles.td, styles.td2]}>{dataWdzj.fzzhishu}</Text>
                                    <Text style={[styles.td, styles.td3]}>(统计{dataWdzj.totalNum}家平台中排名<Text style={styles.num}>{dataWdzj.ordernum}</Text>)</Text>
                                </View>
                                {
                                    isHidden[1] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <Text style={styles.infoText}>较上月
                                            <Icon name={dataWdzj.changnum >= 0 ? 'up' : 'down'} size={11} color={dataWdzj.changnum >= 0 ? '#ff0063' : '#009963'} />
                                                {dataWdzj.changnum >= 0 ? dataWdzj.changnum : -dataWdzj.changnum}%
                                         </Text>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>成    交：{dataWdzj.chengjiao}</Text>
                                                <Text style={styles.infoText}>流动性：{dataWdzj.ldxing}</Text>
                                                <Text style={styles.infoText}>杠    杆：{dataWdzj.ganggan}</Text>
                                                <Text style={styles.infoText}>人  气：{dataWdzj.renqi}</Text>
                                                <Text style={styles.infoText}>透明度：{dataWdzj.tmdu}</Text>
                                                <Text style={styles.infoText}>分散度：{dataWdzj.fsdu}</Text>
                                            </View>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('之家评级', '之家评级', echartDataTimeWdzj, echartDataWdzj)} height={180} />
                                            </View>
                                        </View>
                                }
                                <TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[1] = !this.state.isHidden[1];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[1] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>之家评级</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>
                            </View>
                    }

                    {/*之家评级 end*/}

                    {
                        dataP2peye != null && dataP2peye != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1]}>天眼评级</Text>
                                    <Text style={[styles.td, styles.td2]}>{dataP2peye.level}  {dataP2peye.score}</Text>
                                    <Text style={[styles.td, styles.td3]}>(统计{dataP2peye.totalNum}家平台中排名<Text style={styles.num}>{dataP2peye.ordernum}</Text>)</Text>
                                </View>
                                {
                                    isHidden[2] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <Text style={styles.infoText}>较上月
                                             <Icon name={dataP2peye.changnum >= 0 ? 'up' : 'down'} size={11} color={dataP2peye.changnum >= 0 ? '#ff0063' : '#009963'} />
                                                {dataP2peye.changnum >= 0 ? dataP2peye.changnum : -dataP2peye.changnum}%
                                         </Text>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>偿兑性：{dataP2peye.claims}</Text>
                                                <Text style={styles.infoText}>成长性：{dataP2peye.standard}</Text>
                                                <Text style={styles.infoText}>期    限：{dataP2peye.limit_t}</Text>
                                                <Text style={styles.infoText}>投    资：{dataP2peye.investment}</Text>
                                                <Text style={styles.infoText}>流动性：{dataP2peye.liquidity}</Text>
                                                <Text style={styles.infoText}>利    率：{dataP2peye.rate}</Text>
                                                <Text style={styles.infoText}>运    营：{dataP2peye.operation}</Text>
                                                <Text style={styles.infoText}>地域性：{dataP2peye.regional}</Text>
                                                <Text style={styles.infoText}>借    款：{dataP2peye.borrowing}</Text>
                                            </View>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('天眼评级', '天眼评级', echartDataTimeP2peye, echartDataP2peye)} height={180} />
                                            </View>
                                        </View>
                                }
                                <TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[2] = !this.state.isHidden[2];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[2] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>天眼评级</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>

                            </View>
                    }
                    {/*天眼评级 end*/}

                    {
                        dataDlp != null && dataDlp != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1]}>贷罗盘指数</Text>
                                    <Text style={[styles.td, styles.td2]}>{dataDlp.score}</Text>
                                    <Text style={[styles.td, styles.td3]}>(统计{dataDlp.totalNum}家平台中排名<Text style={styles.num}>{dataDlp.ordernum}</Text>)</Text>
                                </View>
                                {
                                    isHidden[3] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <Text style={styles.infoText}>较上月
                                                <Icon name={dataDlp.changnum >= 0 ? 'up' : 'down'} size={11} color={dataDlp.changnum >= 0 ? '#ff0063' : '#009963'} />
                                                {dataDlp.changnum >= 0 ? dataDlp.changnum : -dataDlp.changnum}%
                                        </Text>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>资金流：{dataDlp.inamount}</Text>
                                                <Text style={styles.infoText}>人    气：{dataDlp.popularity}</Text>
                                                <Text style={styles.infoText}>收益率：{dataDlp.rate}</Text>
                                                <Text style={styles.infoText}>流动性：{dataDlp.mobility}</Text>
                                                <Text style={styles.infoText}>分散度：{dataDlp.dispersion}</Text>
                                                <Text style={styles.infoText}>忠诚度：{dataDlp.loyalty}</Text>
                                                <Text style={styles.infoText}>体    量：{dataDlp.stayStill}</Text>
                                                <Text style={styles.infoText}>成长性：{dataDlp.growth}</Text>

                                            </View>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('贷罗盘指数', '贷罗盘指数', echartDataTimeDlp, echartDataDlp)} height={180} />
                                            </View>
                                        </View>
                                }
                                <TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[3] = !this.state.isHidden[3];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[3] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>贷罗盘指数</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>
                            </View>
                    }
                    {/*贷罗盘指数 end*/}

                    {
                        dataR360 != null && dataR360 != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1]}>融360评级</Text>
                                    <Text style={[styles.td, styles.td2]}>{dataR360.level}</Text>
                                    <Text style={[styles.td, styles.td3]}>(统计{dataR360.totalNum}家平台中排名<Text style={styles.num}>{dataR360.ordernum}</Text>)</Text>
                                </View>
                                {
                                    isHidden[4] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>收    益：{dataR360.rate}</Text>
                                                <Text style={styles.infoText}>人    气：{dataR360.renqi}</Text>
                                            </View>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('融360评级', '融360评级', echartDataTimeR360, echartDataR360, echartDataTextR360)} height={180} />
                                            </View>
                                        </View>
                                }
                                <TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[4] = !this.state.isHidden[4];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[4] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>融360评级</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>
                            </View>
                    }

                    {/*融360评级 end*/}
                    {
                        dataXinghuo != null && dataXinghuo != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1]}>星火评级</Text>
                                    <Text style={[styles.td, styles.td2]}>{dataXinghuo.level}</Text>
                                    <Text style={[styles.td, styles.td3]}>(统计{dataXinghuo.totalNum}家平台中排名<Text style={styles.num}>{dataXinghuo.ordernum}</Text>)</Text>
                                </View>
                                {
                                    isHidden[5] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('星火评级', '星火评级', echartDataTimeXinghuo, echartDataXinghuo, echartDataTextXinghuo)} height={180} />
                                            </View>
                                        </View>
                                }
                                < TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[5] = !this.state.isHidden[5];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[5] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>星火评级</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>
                            </View>
                    }

                    {/*星火评级 end*/}

                    {
                        dataYifei != null && dataYifei != '' ?
                            <View>
                                <View style={styles.infoHead}>
                                    <Text style={[styles.td, styles.td1]}>羿飞评级</Text>
                                    <Text style={[styles.td, styles.td2]}>{dataYifei.score}</Text>
                                    <Text style={[styles.td, styles.td3]}>(统计{dataYifei.totalNum}家平台中排名<Text style={styles.num}>{dataYifei.ordernum}</Text>)</Text>
                                </View>
                                {
                                    isHidden[6] ?
                                        null
                                        :
                                        <View style={styles.infoBody}>
                                            <Text style={styles.infoText}>较上月
                                                <Icon name={dataYifei.changnum >= 0 ? 'up' : 'down'} size={11} color={dataYifei.changnum >= 0 ? '#ff0063' : '#009963'} />
                                                {dataYifei.changnum >= 0 ? dataYifei.changnum : -dataYifei.changnum}%
                                        </Text>
                                            <View style={styles.info}>
                                                <Text style={styles.infoText}>利率：{dataYifei.rate_level}</Text>
                                                <Text style={styles.infoText}>成交：{dataYifei.amount_level}</Text>
                                                <Text style={styles.infoText}>品牌：{dataYifei.brand_level}</Text>
                                                <Text style={styles.infoText}>周期：{dataYifei.period_level}</Text>
                                                <Text style={styles.infoText}>风控：{dataYifei.security_level}</Text>
                                                <Text style={styles.infoText}>投资人：{dataYifei.invest_level}</Text>
                                                <Text style={styles.infoText}>均投：{dataYifei.avg_invest_level}</Text>
                                                <Text style={styles.infoText}>均借：{dataYifei.avg_loan_level}</Text>
                                                <Text style={styles.infoText}>服务：{dataYifei.service_level}</Text>
                                                <Text style={styles.infoText}>增长：{dataYifei.increase_level}</Text>
                                            </View>
                                            <View style={{ marginTop: 5, }}>
                                                <Echarts option={LineChart.line1('羿飞评级', '羿飞评级', echartDataTimeYifei, echartDataYifei)} height={180} />
                                            </View>
                                        </View>
                                }
                                < TouchableOpacity
                                    style={styles.openBtn}
                                    activeOpacity={0.4}
                                    onPress={() => {
                                        this.state.isHidden[6] = !this.state.isHidden[6];
                                        this.setState({
                                            ref: !this.state.ref
                                        })
                                    }}
                                >
                                    <Text style={styles.openBtnText}>
                                        {this.state.isHidden[6] ? '详情' : '收起'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1]}>羿飞评级</Text>
                                <Text style={[styles.td, styles.null]}>无评级</Text>
                            </View>
                    }
                    <View style={styles.Title}>
                        <View style={styles.TitleIcon}></View>
                        <Text style={styles.TitleText}>"{this.props.platName}"用户还关注  <Text style={{ color: '#999', fontSize: 12, paddingLeft: 10, }}>绿色背景为“示范投资”进入平台</Text></Text>
                    </View>
                    <View style={styles.relatedList}>
                        {
                            this.props.replatData != null && this.props.replatData.length > 0 ?
                                this.props.replatData.map((text, i) => {
                                    return (
                                        <TouchableOpacity style={[styles.related, text.fundtype != 0 ? styles.relatedActive : null]} key={i}
                                            onPress={() => {
                                                navigation.navigate('Detail', { id: text.id_dlp, platName: text.plat_name })
                                            }}

                                        >
                                            <Text style={[styles.relatedText, text.fundtype != 0 ? styles.relatedTextActive : null]}>{text.plat_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <Text style={styles.null}>暂无用户关注</Text>
                        }
                    </View>
                    {/*羿飞评级 end*/}
                </ScrollView >
            </View>
        )
    }

}

const styles = StyleSheet.create({
    infoHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 44,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    td: {
        color: '#ABB7C4',
        fontSize: 12.5,
    },
    td1: {
        width: 70,
    },
    td2: {
        width: 80,
    },
    null: {
        color: '#ccc'
    },
    num: {
        color: '#2E99E8',
        fontWeight: 'bold',
        fontSize: 15,
    },
    infoBody: {

        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoText: {
        marginTop: 8,
        width: 116,
        fontSize: 12,
        color: '#ccc',
    },
    openBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor: '#f2f2f2',
    },
    openBtnText: {
        color: '#ABB7C4',
        fontSize: 12.5,
    },
    relatedList: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 10,
        paddingTop: 15,

    },
    related: {
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        height: 36,
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#e5e5e5',
    },
    relatedActive: {
        backgroundColor: '#00a400',
        borderColor: '#00a400',
    },
    relatedText: {
        color: '#444',
    },
    relatedTextActive: {
        color: '#fff',
    },
    Title: {
        marginTop:15,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        backgroundColor: '#dfe5ea'
    },
    TitleIcon: {
        marginRight: 8,
        width: 4,
        height: 16,
        backgroundColor: '#2c3641',
    },
    TitleText: {
        color: '#2D3640',
    },
})