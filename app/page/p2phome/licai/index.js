import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Modal } from 'antd-mobile';
import Echarts from 'native-echarts';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import LineEcharts from '../../../echarts/line';


export default class Pingce extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modalText: '',
            echartDate: [],
            echartDataListLong: [],
            echartDataListShort: []
        }
    }
    componentWillMount() {
        const { data } = this.props;
        const echartDate = [];
        const echartDataListLong = [];
        const echartDataListShort = [];

        for (let i = 0; i < data.indexlist.length; i++) {
            echartDate.push(Util.setDate3(new Date(data.indexlist[i].date_str)))
            echartDataListLong.push(data.indexlist[i].index_long)
            echartDataListShort.push(data.indexlist[i].index_short)
        }
        this.setState({
            echartDate: echartDate,
            echartDataListLong: echartDataListLong,
            echartDataListShort: echartDataListShort
        })
    }
    onClose = () => {
        this.setState({
            modal: false,
            modalText: ''
        })
    }
    onShow = (text) => {
        this.setState({
            modal: true,
            modalText: text
        })
    }
    render() {
        const { data, navigation } = this.props;
        const { echartDate, echartDataListLong, echartDataListShort } = this.state;

        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'银行理财产品'} navigation={navigation} screenUrlInfo={{ screenUrl: 'LicaiList', tabId: null }} />
                <View style={styles.licaiContainer}>
                    <View style={styles.licaiTitle}>
                        <View style={styles.licaiTitleLeft}>
                            <Text style={styles.titleText}>平均收益率</Text>
                            <TouchableOpacity style={styles.question} onPress={() => {
                                this.onShow('短期和中长期理财产品每日“业绩比较基准”的平均指数。 ※注：业绩比较基准是银行理财收益的参考值，并非实际收益率。这是由于在理财产品净值化后，为了给投资者进行收益参考，根据市场情况设置的业绩比较基准，属于一个参考值。')
                            
                            }}>
                                <FontAwesome name={'question-circle'} size={18} color={'#ccc'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.source}>[数据来源: 中国理财网]</Text>
                    </View>
                    <Text style={styles.zhishu}>短期限平均年化收益率为{data.lc_short.toFixed(2)};  中长期平均年化收益率为{data.lc_long.toFixed(2)}。</Text>
                    <View style={styles.echartsContainer}>
                        <Echarts option={LineEcharts.line4(['短期理财产品', '中长期理财产品'], echartDate, echartDataListShort, echartDataListLong)} height={150} width={Theme.screenWidth * 0.9} />
                    </View>
                    <View style={styles.licaiTitle}>
                        <View style={styles.licaiTitleLeft}>
                            <Text style={styles.titleText}>收益前三</Text>
                            <TouchableOpacity style={styles.question} onPress={() => {
                                this.onShow('每日业绩比较基准前三的理财产品所属的银行')
                            }}>
                                <FontAwesome name={'question-circle'} size={18} color={'#ccc'} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={styles.rankList}>
                        {
                            data.topbank.map((item, i) => {
                                return (
                                    <View key={i} style={styles.rankItem}>
                                        <View style={styles.rankItemIcon}>
                                            <Text style={styles.rankItemNum}>{i + 1}</Text>
                                            <FontAwesome name={'certificate'} size={22} color={i === 0 ? '#C19140' : i === 1 ? '#999' : '#A65719'} />
                                        </View>
                                        <Text style={styles.rankItemText}>{item.bank_name}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose}
                    title=""
                    footer={[{ text: '关闭', onPress: () => { this.onClose(); } }]}

                    afterClose={() => { alert('afterClose'); }}
                >
                    <View>
                        <Text style={styles.noteTips}>{this.state.modalText}</Text>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    licaiContainer: {
        paddingTop: 15,
        paddingLeft: 18,
        paddingRight: 15,
    },
    licaiTitle: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    licaiTitleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    question: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    titleText: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
    source: {
        fontSize: 11,
        color: '#bbb',
    },
    zhishu: {
        fontSize: 12,
        color: '#666',
    },
    echartsContainer: {
        marginTop: 10,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankItem: {
        marginBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rankItemIcon: {
        marginRight: 3,
        position: 'relative',
        zIndex: 2,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankItemNum: {
        position: 'absolute',
        top: 5,
        left: 9,
        zIndex: 3,
        backgroundColor: 'rgba(255, 0, 255, 0)',
        fontSize: 11,
        color: '#fff',
    },
    rankItemText: {
        fontSize: 12,
        color: '#666',
    },
    noteTips: {
        fontSize: 12,
        color: '#999',
        lineHeight: 18,
    },
})