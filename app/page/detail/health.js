import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../component/TabBar2';
import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Title from '../../component/Title';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import LineChart from '../../echarts/line';
import BarChart from '../../echarts/bar';
import RadarChart from '../../echarts/radar';

class Hexin extends React.Component {
    render() {
        let data = this.props.data;

        if (data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataInamount = []   //资金流
            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataInamount.push(data.listdata[i].inamount)
            }

        }

        if (data.dataDetail != null && data.dataDetail != '') {
            var inamountInfo = data.dataDetail.inamount;  //资金流基本信息 
            var brand = data.dataDetail.brand //品牌基本信息
        }

        return (
            <ScrollView>
                <View style={styles.healthTop}>
                    <Text style={styles.healthTopText}>核心指标为安全性指标，是平台运营的核心指标，建议重点关注。</Text>
                    <Text style={styles.healthTopText}>数据说明：极强 > 强 > 偏强 > 正常 > 偏弱 > 弱 > 极弱</Text>
                </View>
                <Title titleText={'概述'} />
                {
                    data.dlpDetail != null ?
                        <View style={{ paddingBottom: 10, }}>
                            <View style={styles.infoHead}>
                                <Text style={[styles.td, styles.td1, { color: '#2D3640' }]}>综合指数</Text>
                                <Text style={[styles.td, styles.td2, { color: '#2D3640', fontWeight: 'bold', fontSize: 14, }]}>{data.dlpDetail.score}</Text>
                                <Text style={[styles.td, styles.td3]}>
                                    (统计{data.dlpDetail.totalNum}家平台中排名<Text style={styles.num}>{data.dlpDetail.ordernum}</Text>)
                                 </Text>
                            </View>
                            <Text style={styles.bijiao}>较上月
                              <Icon name={data.dlpDetail.changnum >= 0 ? 'up' : 'down'} size={11} color={data.dlpDetail.changnum >= 0 ? '#ff0063' : '#009963'} />
                                {data.dlpDetail.changnum >= 0 ? data.dlpDetail.changnum : -data.dlpDetail.changnum}%
                             </Text>
                        </View>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }

                {/*概述 end*/}
                <Title titleText={'资金流诊断'} />
                {
                    data.listdata.length > 0 ?
                        <View style={styles.diagnoseBox}>

                            <Text style={styles.diagnoseText}>{inamountInfo.info}</Text>
                            <View style={styles.diagnoseState}>
                                <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                    状态：
                            <Text style={[styles.state,
                                    inamountInfo.status == '强' || inamountInfo.status == '偏强' || inamountInfo.status == '极强' || inamountInfo.status == '正常' ?
                                        styles.good
                                        :
                                        inamountInfo.status == '偏弱' ?
                                            styles.normal
                                            :
                                            styles.bad

                                    ]}>{inamountInfo.status}</Text>
                                </Text>
                                <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={inamountInfo.change == 'up' ? 'up' : 'down'} size={11} color={inamountInfo.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                            </View>
                            <Echarts option={BarChart.bar2('资金流(万元)','资金流',dateTimeAll, dataInamount,52)} height={180} />
                            <View style={styles.diagnoseInstruction}>
                                <Text style={styles.diagnoseInstructionText}>说明：1. 如资金流长期处于正流入状态，则资金链健康；</Text>
                                <Text style={styles.diagnoseInstructionText}>           2. 如资金流长期处于负流出状态，则可能引起资金链断裂。</Text>
                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }
                {/*资金流诊断 end*/}
                <Title titleText={'品牌诊断'} />
                {
                    data.dataDetail != null && data.dataDetail.brand != null ?
                        <View style={styles.diagnoseBox}>
                            <View style={styles.pinpaiList}>
                                <Text style={styles.pinpaiListDt}>股东背景</Text>
                                <View style={[styles.pinpaiListDd, brand.platback == '民营' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '民营' ? styles.selectedText : null]}>民营</Text></View>
                                <View style={[styles.pinpaiListDd, brand.platback == '国资' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '国资' ? styles.selectedText : null]}>国资</Text></View>
                                <View style={[styles.pinpaiListDd, brand.platback == '上市公司' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '上市公司' ? styles.selectedText : null]}>上市</Text></View>
                                <View style={[styles.pinpaiListDd, brand.platback == '银行' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '银行' ? styles.selectedText : null]}>银行</Text></View>
                            </View>
                            <View style={styles.pinpaiList}>
                                <Text style={styles.pinpaiListDt}>融资背景</Text>
                                <View style={[styles.pinpaiListDd, brand.financing == '暂无融资' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == '暂无融资' ? styles.selectedText : null]}>暂无</Text></View>
                                <View style={[styles.pinpaiListDd, brand.financing == '天使' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == '天使' ? styles.selectedText : null]}>天使</Text></View>
                                <View style={[styles.pinpaiListDd, brand.financing == 'A' || brand.financing == 'Pre-A' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'A' || brand.financing == 'Pre-A' ? styles.selectedText : null]}>A轮</Text></View>
                                <View style={[styles.pinpaiListDd, brand.financing == 'B' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'B' ? styles.selectedText : null]}>B轮</Text></View>
                                <View style={[styles.pinpaiListDd, brand.financing == 'C' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'C' ? styles.selectedText : null]}>C轮</Text></View>
                                <View style={[styles.pinpaiListDd, brand.financing == 'D' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'D' ? styles.selectedText : null]}>D轮</Text></View>
                                <View style={[styles.pinpaiListDd, brand.financing == 'IPO' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'IPO' ? styles.selectedText : null]}>IPO</Text></View>
                            </View>
                            <View style={styles.pinpaiList}>
                                <Text style={styles.pinpaiListDt}>银行存管</Text>
                                <View style={[styles.pinpaiListDd, styles.selected]}><Text style={[styles.pinpaiListDdText, styles.selectedText]}>{brand.Deposittype}</Text></View>
                            </View>
                            <View style={styles.rongziInfo}>
                                {
                                    brand.financing_info.split('<br />').map((text) => {
                                        return (
                                            <Text style={styles.rongziInfoText}>{text}</Text>
                                        )
                                    })
                                }
                            </View>
                            <View style={styles.diagnoseInstruction}>
                                <Text style={styles.diagnoseInstructionText}>说明： 品牌背书是平台安全性的重要保障。</Text>
                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }

                {/*品牌诊断 end*/}
                <Title titleText={'负面事件诊断'} />
                {
                    data.dataDetail != null ?
                        <View style={styles.diagnoseBox}>
                            {
                                data.dataDetail.negative != '' && data.dataDetail.negative != null ?
                                    data.dataDetail.negative.split('<p>').map((text) => {
                                        let list = text.split('<href>');
                                        return (
                                            <TouchableOpacity style={styles.fumianList}
                                                onPress={() => {
                                                    {
                                                        list[1] ?
                                                            Util.Linked(list[1])
                                                            :
                                                            null
                                                    }
                                                }}
                                            >
                                                <Text style={styles.fumianListText}>{list[0]}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    <Text style={styles.fumianNull}>暂无负面信息</Text>
                            }

                            <View style={styles.diagnoseInstruction}>
                                <Text style={styles.diagnoseInstructionText}>说明： 不断有负面信息的平台，往往是出事的前兆。</Text>
                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无负面数据</Text>
                }
            </ScrollView>
        )
    }

}

class Fuzhu extends React.Component {
    render() {

        let data = this.props.data;

        if (data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataLoanPeriod = [] //流动性
            var dataAvgBorrowMoney = []  //分散度
            var dataBidderNum = []     //人气
            var dataStayStillOfTotal = []     //体量
            var dataAvgBidMoney = []  //忠诚度
            var dataBidderWaitNum = []  //成长性
            var dataRate = []   //收益率

            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataLoanPeriod.push(data.listdata[i].loanPeriod)
                dataAvgBorrowMoney.push(data.listdata[i].avgBorrowMoney)
                dataBidderNum.push(data.listdata[i].bidderNum)
                dataStayStillOfTotal.push(data.listdata[i].stayStillOfTotal)
                dataAvgBidMoney.push(data.listdata[i].avgBidMoney)
                dataBidderWaitNum.push(data.listdata[i].bidderWaitNum)
                dataRate.push(data.listdata[i].rate)
            }

        }

        if (data.dataDetail != null && data.dataDetail != '') {
            var mobility = data.dataDetail.mobility; //流动性基本信息
            var dispersion = data.dataDetail.dispersion; //分散度基本信息
            var popularity = data.dataDetail.popularity; //人气基本信息
            var stayStill = data.dataDetail.stayStill; //体量基本信息
            var loyalty = data.dataDetail.loyalty; //忠诚度基本信息
            var growth = data.dataDetail.growth; //成长性基本信息
            var rate = data.dataDetail.rate; //收益率基本信息
        }

        return (
            <View>
                {
                    data.listdata.length > 0 ?
                        <ScrollView>
                            <View style={styles.healthTop}>
                                <Text style={styles.healthTopText}>辅助指标为参考性指标，可辅助判断。</Text>
                                <Text style={styles.healthTopText}>数据说明：极强 > 强 > 偏强 > 正常 > 偏弱 > 弱 > 极弱</Text>
                            </View>
                            <Title titleText={'流动性诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{mobility.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        mobility.status == '强' || mobility.status == '偏强' || mobility.status == '极强' || mobility.status == '正常' ?
                                            styles.good
                                            :
                                            mobility.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{mobility.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={mobility.change == 'up' ? 'up' : 'down'} size={11} color={mobility.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('借款期限(月)','借款期限', dateTimeAll, dataLoanPeriod, 30)} height={180} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：1. 借款期限数值越低代表流动性越好，资金的灵活性越高;</Text>
                                    <Text style={styles.diagnoseInstructionText}>           2. 借款期限数值越高代表流动性越差，资金的灵活性越低。</Text>
                                </View>
                            </View>
                            {/*资金流诊断 end*/}

                            <Title titleText={'分散度诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{dispersion.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        dispersion.status == '强' || dispersion.status == '偏强' || dispersion.status == '极强' || dispersion.status == '正常' ?
                                            styles.good
                                            :
                                            dispersion.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{dispersion.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={dispersion.change == 'up' ? 'up' : 'down'} size={11} color={dispersion.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('人均借款金额(万元)','人均借款金额', dateTimeAll, dataAvgBorrowMoney, 30)} height={180} />            
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：1. 借款金额数值越低代表分散度越好，系统性风险越低;</Text>
                                    <Text style={styles.diagnoseInstructionText}>           2. 借款金额数值越高代表分散度越差，系统性风险越高。</Text>
                                </View>
                            </View>
                            {/*分散度诊断 end*/}

                            <Title titleText={'人气诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{popularity.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        popularity.status == '强' || popularity.status == '偏强' || popularity.status == '极强' || popularity.status == '正常' ?
                                            styles.good
                                            :
                                            popularity.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{popularity.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={popularity.change == 'up' ? 'up' : 'down'} size={11} color={popularity.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('投资人数(人)','投资人数', dateTimeAll, dataBidderNum, 50)} height={180} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：1. 投资人数数值越高代表人气越好;</Text>
                                    <Text style={styles.diagnoseInstructionText}>           2. 投资人数数值越低代表人气越差。</Text>
                                </View>
                            </View>
                            {/*人气诊断 end*/}

                            <Title titleText={'体量诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{stayStill.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        stayStill.status == '强' || stayStill.status == '偏强' || stayStill.status == '极强' || stayStill.status == '正常' ?
                                            styles.good
                                            :
                                            stayStill.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{stayStill.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={stayStill.change == 'up' ? 'up' : 'down'} size={11} color={stayStill.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('累计待还金额(万元)', '累计待还金额', dateTimeAll, dataStayStillOfTotal, 75)} height={180} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：1. 累计待还金额数值越高代表体量越大，系统性风险越低;</Text>
                                    <Text style={styles.diagnoseInstructionText}>           2. 累计待还金额数值越低代表体量越低，系统性风险越高。</Text>
                                </View>
                            </View>
                            {/*体量诊断 end*/}

                            <Title titleText={'忠诚度诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{loyalty.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        loyalty.status == '强' || loyalty.status == '偏强' || loyalty.status == '极强' || loyalty.status == '正常' ?
                                            styles.good
                                            :
                                            loyalty.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{loyalty.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={loyalty.change == 'up' ? 'up' : 'down'} size={11} color={loyalty.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('人均投资金额(万元)', '人均投资金额', dateTimeAll, dataAvgBidMoney, 35)} height={180} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：1. 人均投资金额越高代表用户忠诚度越高，平台越健康;</Text>
                                    <Text style={styles.diagnoseInstructionText}>           2. 人均投资金额越低代表用户忠诚度越低，平台越不健康。</Text>
                                </View>
                            </View>
                            {/*忠诚度诊断 end*/}

                            <Title titleText={'成长性诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{growth.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        growth.status == '强' || growth.status == '偏强' || growth.status == '极强' || growth.status == '正常' ?
                                            styles.good
                                            :
                                            growth.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{growth.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={growth.change == 'up' ? 'up' : 'down'} size={11} color={growth.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('待收投资人数(人)', '待收投资人数', dateTimeAll, dataBidderWaitNum, 60)} height={180} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：1. 待收投资人数数值越高代表用户体量健康，成长性越好;</Text>
                                    <Text style={styles.diagnoseInstructionText}>           2. 待收投资人数数值越低代表用户体量萎靡，成长性越差。</Text>
                                </View>
                            </View>
                            {/*成长性诊断 end*/}

                            <Title titleText={'收益率诊断'} />
                            <View style={styles.diagnoseBox}>
                                <Text style={styles.diagnoseText}>{rate.info}</Text>
                                <View style={styles.diagnoseState}>
                                    <Text style={[styles.diagnoseStateText, { marginRight: 30, }]}>
                                        状态：
                            <Text style={[styles.state,
                                        rate.status == '强' || rate.status == '偏强' || rate.status == '极强' || rate.status == '正常' ?
                                            styles.good
                                            :
                                            rate.status == '偏弱' ?
                                                styles.normal
                                                :
                                                styles.bad

                                        ]}>{rate.status}</Text>
                                    </Text>
                                    <Text style={styles.diagnoseStateText}>后续趋势预判：<Icon name={rate.change == 'up' ? 'up' : 'down'} size={11} color={rate.change == 'up' ? '#ff0063' : '#009963'} /></Text>
                                </View>
                                <Echarts option={BarChart.bar2('利率(%)', '利率', dateTimeAll, dataRate, 38)} height={180} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：利率数据高低与平台安全性没有直接关系，仅作为数据参考</Text>
                                </View>
                            </View>
                            {/*收益率诊断 end*/}
                        </ScrollView>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }
            </View>

        )
    }

}

class Other extends React.Component {
    render() {
        let data = this.props.data;

        if (data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataAmount = []  //成交量走势
            var dataBorrowerNum = []  //每日借款人数走势
            var dataBorrowWaitNum = []  //待还借款人数
            var dataFullloanTime = []   //满标用时

            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataAmount.push(data.listdata[i].amount)
                dataBorrowerNum.push(data.listdata[i].borrowerNum)
                dataBorrowWaitNum.push(data.listdata[i].borrowWaitNum)
                dataFullloanTime.push(data.listdata[i].fullloanTime)
            }
        }

        return (
            <View>
                {
                    data.listdata.length > 0 ?
                        <ScrollView>
                            <Title titleText={'成交量走势'} />
                            <View style={styles.diagnoseBox}>
                                <Echarts option={BarChart.bar2('成交量走势(万元)', '成交量走势', dateTimeAll, dataAmount, 70)} height={180} />
                            </View>
                            <Title titleText={'每日借款人数走势'} />
                            <View style={styles.diagnoseBox}>
                                <Echarts option={BarChart.bar2('每日借款人数走势(人)', '每日借款人数走势', dateTimeAll, dataBorrowerNum, 70)} height={180} />
                            </View>
                            <Title titleText={'待还借款人数走势'} />
                            <View style={styles.diagnoseBox}>
                                <Echarts option={BarChart.bar2('待还借款人数走势(人)', '待还借款人数走势', dateTimeAll, dataBorrowWaitNum, 70)} height={180} />
                            </View>
                            <Title titleText={'满标用时走势'} />
                            <View style={styles.diagnoseBox}>
                                <Echarts option={BarChart.bar2('满标用时走势(分钟)', '满标用时走势', dateTimeAll, dataFullloanTime, 70)} height={180} />
                            </View>
                        </ScrollView>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }
            </View>
        )
    }
}

class Model extends React.Component {
    render() {

        let data = this.props.data;
        let platName = this.props.platName;

        if (data.dlpDetail != null && data.industryDetail != null) {
            var dlpDetail = data.dlpDetail;
            var industryDetail = data.industryDetail;

            var platdata = [dlpDetail.inamount, dlpDetail.dispersion, dlpDetail.mobility, dlpDetail.rate, dlpDetail.popularity, dlpDetail.stayStill, dlpDetail.loyalty, dlpDetail.growth]
            var platdata_ind = [industryDetail.inamount, industryDetail.dispersion, industryDetail.mobility, industryDetail.rate, industryDetail.popularity, industryDetail.stayStill, industryDetail.loyalty, industryDetail.growth]
        }
        return (
            <ScrollView>
                {
                    data.dlpDetail != null && data.industryDetail != null ?
                        <Echarts option={RadarChart.radar(platName, platdata, platdata_ind)} height={300} />
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }
            </ScrollView>
        )
    }
}

export default class DetailPjScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['核心指标', '辅助指标', '其他指标', '健康度模型'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let dataSource = this.state.dataSource;
        let platInfo = this.props.platInfo;

        return (
            <View style={{ flex: 1 }}>
                {
                    !this.state.loading ?
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
                                            <Hexin data={this.state.dataSource} />
                                            :
                                            <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                                    }

                                </View>
                                <View tabLabel='key2'>
                                    {
                                        platInfo.platstatus == 1 ?
                                            <Fuzhu data={this.state.dataSource} />
                                            :
                                            <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                                    }

                                </View>
                                <View tabLabel='key3'>
                                    {
                                        platInfo.platstatus == 1 ?
                                            <Other data={this.state.dataSource} />
                                            :
                                            <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                                    }

                                </View>
                                <View tabLabel='key4'>
                                    {
                                        platInfo.platstatus == 1 ?
                                            <Model data={this.state.dataSource} platName={platInfo.platName} />
                                            :
                                            <Text style={styles.black}>黑名单平台，已停止数据监控</Text>
                                    }

                                </View>
                            </ScrollableTabView>
                        </View>
                        :
                        <Loading />
                }
            </View>
        )


    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'health', id)
    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    healthTop: {
        paddingLeft: 10,
        paddingRight: 5,
        marginBottom: 10,
    },
    healthTopText: {
        color: '#ABB7C4',
        fontSize: 12,
        lineHeight: 24,
    },

    infoHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
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
        paddingLeft: 10,
        color: '#ccc',
        fontSize: 12,
    },
    diagnoseBox: {
        padding: 10,
        paddingRight: 5,
    },
    diagnoseText: {
        color: '#ABB7C4',
        fontSize: 12,
        lineHeight: 18,
    },
    diagnoseState: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    diagnoseStateText: {
        color: '#999'
    },
    diagnoseInstructionText: {
        lineHeight: 20,
        color: '#ABB7C4',
        fontSize: 12,
    },
    pinpaiList: {
        flexDirection: 'row',
        marginTop: 12,
    },
    pinpaiListDt: {
        paddingRight: 25,
        lineHeight: 20,
        color: '#999',
    },
    pinpaiListDd: {
        marginRight: 7,
        minWidth: 33,
        paddingLeft: 3,
        paddingRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        backgroundColor: '#f8f8f8',
    },
    selected: {
        backgroundColor: '#2fae36',
    },
    pinpaiListDdText: {
        color: '#ccc',
        fontSize: 12,
    },
    selectedText: {
        color: '#fff',
    },
    rongziInfo: {
        paddingTop: 15,
        paddingBottom: 8,
    },
    rongziInfoText: {
        color: '#999',
        fontSize: 12,
        lineHeight: 18,
    },
    fumianList: {
        marginBottom: 10,
    },
    fumianListText: {
        color: '#999',
        fontSize: 12,
        lineHeight: 18,
    },
    fumianNull: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#999',
        fontSize: 12,
    },
    good: {
        color: '#009900',
    },
    normal: {
        color: '#ff9500',
    },
    bad: {
        color: '#D62222',
    },
    null: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        color: '#ccc',
    },
    black: {
        paddingLeft: 15,
        paddingTop: 10,
        color: '#ccc',
        fontSize: 15,
    }
})
