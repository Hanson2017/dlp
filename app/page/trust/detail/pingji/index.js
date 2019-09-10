import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';


export default class DetailPingji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [true, true, true, true, true, true, true],
            ref: false,
        }
    }
    render() {
        const { data } = this.props;
        const { isHidden } = this.state;
        const nowdata = data.nowdata;
        const predata = data.predata;
        const initdata = data.initdata;
        const trinfo = data.trinfo;

        return (
            <ScrollView >


                <View style={[Theme.box, { paddingTop: 10, }]}>
                    <Title data={'数据跟踪'} />
                    <View style={styles.content}>
                        <View style={styles.listContainer}>
                            <View style={styles.listHeader}>
                                <Text style={[styles.name, styles.nameZh]}>{nowdata.year}年净利润</Text>

                                <View style={styles.listHeaderCon}>
                                    <Text style={[styles.score, styles.scoreZh]}>{nowdata.profit_sum}亿</Text>
                                    <Text style={[styles.totalNum, styles.totalNumZh]}>统计{initdata.platnum}家信托排</Text>
                                    <Text style={[styles.ordernum, styles.ordernumZh]}>{nowdata.profit_order}</Text>
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


                            </View>
                            {
                                isHidden[0] ?
                                    null
                                    :
                                    <View style={styles.listBody}>
                                        <Text style={styles.notetText}>较{predata.year}年净利润{predata.profit_sum}亿，{nowdata.profit_pre > 0 ? '增长' : '减少'}{Math.abs(nowdata.profit_pre)}%<Icon name={nowdata.profit_pre >= 0 ? 'up' : 'down'} size={11} color={nowdata.profit_pre >= 0 ? Theme.upColor : Theme.downColor} /> </Text>
                                    </View>
                            }
                        </View>
                        {/* 2018年净利润 end */}
                        <View style={styles.listContainer}>
                            <View style={styles.listHeader}>
                                <Text style={styles.name}>{nowdata.year}年营业收入</Text>

                                <View style={styles.listHeaderCon}>
                                    <Text style={styles.score}>{nowdata.incom_sum}亿</Text>
                                    <Text style={styles.totalNum}>统计{initdata.platnum}家信托排</Text>
                                    <Text style={styles.ordernum}>{nowdata.incom_order}</Text>
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

                            </View>
                            {
                                isHidden[1] ?
                                    null
                                    :
                                    <View style={styles.listBody}>
                                        <Text style={styles.notetText}>较{predata.year}年净利润{predata.incom_sum}亿，{nowdata.incom_pre > 0 ? '增长' : '减少'}{Math.abs(nowdata.incom_pre)}%<Icon name={nowdata.incom_pre >= 0 ? 'up' : 'down'} size={11} color={nowdata.incom_pre >= 0 ? Theme.upColor : Theme.downColor} /> </Text>
                                    </View>
                            }
                        </View>
                        {/* 年营业收入 end */}

                        <View style={styles.listContainer}>
                            <View style={styles.listHeader}>
                                <Text style={styles.name}>{nowdata.year}年总资产</Text>

                                <View style={styles.listHeaderCon}>
                                    <Text style={styles.score}>{nowdata.assets_sum}亿</Text>
                                    <Text style={styles.totalNum}>统计{initdata.platnum}家信托排</Text>
                                    <Text style={styles.ordernum}>{nowdata.assets_order}</Text>
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

                            </View>
                            {
                                isHidden[2] ?
                                    null
                                    :
                                    <View style={styles.listBody}>
                                        <Text style={styles.notetText}>较{predata.year}年净利润{predata.assets_sum}亿，{nowdata.assets_pre > 0 ? '增长' : '减少'}{Math.abs(nowdata.assets_pre)}%<Icon name={nowdata.assets_pre >= 0 ? 'up' : 'down'} size={11} color={nowdata.assets_pre >= 0 ? Theme.upColor : Theme.downColor} /> </Text>
                                    </View>
                            }
                        </View>
                        {/* 年总资产 end */}
                        <View style={[styles.listContainer, { borderBottomWidth: 0, }]}>
                            <View style={styles.listHeader}>
                                <Text style={styles.name}>{nowdata.year}年管理信托资产</Text>

                                <View style={styles.listHeaderCon}>
                                    <Text style={styles.score}>{nowdata.trust_sum}亿</Text>
                                    <Text style={styles.totalNum}>统计{initdata.platnum}家信托排</Text>
                                    <Text style={styles.ordernum}>{nowdata.trust_order}</Text>
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

                            </View>
                            {
                                isHidden[3] ?
                                    null
                                    :
                                    <View style={styles.listBody}>
                                        <Text style={styles.notetText}>较{predata.year}年净利润{predata.trust_sum}亿，{nowdata.trust_pre > 0 ? '增长' : '减少'}{Math.abs(nowdata.trust_pre)}%<Icon name={nowdata.trust_pre >= 0 ? 'up' : 'down'} size={11} color={nowdata.trust_pre >= 0 ? Theme.upColor : Theme.downColor} /> </Text>
                                    </View>
                            }
                        </View>
                        {/* 年总资产 end */}

                    </View>
                </View>

                <View style={[Theme.box, Theme.mt10]}>
                    <Title data={'评级跟踪'} />
                    <View style={styles.content}>
                        <View style={[styles.listContainer]}>
                            <View style={styles.listHeader}>
                                <Text style={[styles.name, styles.name2]}>{nowdata.year}年行业评级</Text>
                                <View style={styles.listHeaderCon}>
                                    <Text style={[styles.score, styles.score2, styles.scoreZh]}>{trinfo.grade_ind !== '' ? trinfo.grade_ind : '-'}</Text>
                                    <Text style={styles.totalNum2}>统计{initdata.platnum}家信托中<Text style={{ color: Theme.color }}>{initdata.grade_ind_num_a}</Text>家获A评级，<Text style={{ color: Theme.color }}>{initdata.grade_ind_num_b}</Text>家获B评级</Text>
                                </View>
                            </View>

                        </View>
                        <View style={[styles.listContainer, { borderBottomWidth: 0 }]}>
                            <View style={styles.listHeader}>
                                <Text style={[styles.name, styles.name2]}>{nowdata.year}年监管评级</Text>
                                <View style={styles.listHeaderCon}>
                                    <Text style={[styles.score, styles.score2, styles.scoreZh]}>{trinfo.grade_sup !== '' ? trinfo.grade_sup : '-'}</Text>
                                    <Text style={styles.totalNum2}>统计{initdata.platnum}家信托中<Text style={{ color: Theme.color }}>{initdata.grade_sup_num}</Text>家获A评级</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        )


    }

}

const styles = StyleSheet.create({
    listBody: {
        paddingLeft: 5,
        paddingTop: 5,
        paddingBottom: 10,
    },
    notetText: {
        fontSize: 11,
        color: "#999",
    },
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
        width: 110,
        fontSize: 11,
        color: '#999',
    },

    score: {
        width: 75,
        fontSize: 14,
        color: '#666',
    },

    totalNum: {
        width: 94,
        fontSize: 11,
        color: '#999',
    },
    name2: {
        width: 92,
    },
    score2: {
        width: 25,
    },
    totalNum2: {
        color: '#999',
        fontSize: 11,
    },
    ordernum: {
        width: 30,
        fontSize: 13,
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