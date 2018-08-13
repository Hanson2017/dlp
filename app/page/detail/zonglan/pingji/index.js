import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class ZonglanPingji extends React.Component {
    render() {
        const { navigation, data, platInfo } = this.props;
        const wdzj = data.wdzj;
        const p2peye = data.p2peye;
        const dlp = data.dlp;
        const rong360 = data.rong360;
        const xinghuo = data.xinghuo;
        const yifei = data.yifei;
        const yuanwang = data.yuanwang;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'评级情况'} navigation={navigation} />
                <View style={styles.listContainer}>
                    <View style={styles.list}>
                        <Text style={[styles.name, styles.nameZh]}>综合指数</Text>
                        {
                            data.score !== null && data.score !== 0 && platInfo.platstatus == 1 ?
                                <View style={styles.listCon}>
                                    <Text style={[styles.score, styles.scoreZh]}>{data.score}</Text>
                                    <Text style={[styles.totalNum, styles.totalNumZh]}>统计{data.totalNum}家平台中排名</Text>
                                    <Text style={[styles.ordernum, styles.ordernumZh]}>{data.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>之家评级</Text>
                        {
                            wdzj !== null ?
                                <View style={styles.listCon}>
                                    <Text style={styles.score}>{wdzj.fzzhishu}</Text>
                                    <Text style={styles.totalNum}>统计{wdzj.totalNum}家平台中排名</Text>
                                    <Text style={styles.ordernum}>{wdzj.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>天眼评级</Text>
                        {
                            p2peye !== null ?
                                <View style={styles.listCon}>
                                    <Text style={styles.score}>{p2peye.level} {p2peye.score}</Text>
                                    <Text style={styles.totalNum}>统计{p2peye.totalNum}家平台中排名</Text>
                                    <Text style={styles.ordernum}>{p2peye.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>贷罗盘指数</Text>
                        {
                            dlp !== null && platInfo.platstatus == 1 && dlp.ordernum > 0 ?
                                <View style={styles.listCon}>
                                    <Text style={styles.score}>{dlp.score}</Text>
                                    <Text style={styles.totalNum}>统计{dlp.totalNum}家平台中排名</Text>
                                    <Text style={styles.ordernum}>{dlp.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>融360评级</Text>
                        {
                            rong360 !== null ?
                                <View style={styles.listCon}>
                                    <Text style={styles.score}>{rong360.level}</Text>
                                    <Text style={styles.totalNum}>统计{rong360.totalNum}家平台中排名</Text>
                                    <Text style={styles.ordernum}>{rong360.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>

                    <View style={styles.list}>
                        <Text style={styles.name}>羿飞评级</Text>
                        {
                            yifei !== null ?
                                <View style={styles.listCon}>
                                    <Text style={styles.score}>{yifei.score}</Text>
                                    <Text style={styles.totalNum}>统计{yifei.totalNum}家平台中排名</Text>
                                    <Text style={styles.ordernum}>{yifei.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>远望评级</Text>
                        {
                            yuanwang !== null ?
                                <View style={styles.listCon}>
                                    <Text style={styles.score}>{yuanwang.level}</Text>
                                    <Text style={styles.totalNum}>统计{yuanwang.totalNum}家平台中排名</Text>
                                    <Text style={styles.ordernum}>{yuanwang.ordernum}</Text>
                                </View>
                                :
                                <Text style={styles.null}>暂无</Text>
                        }

                    </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingLeft: 17,
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        width: 70,
        fontSize: 11,
        color: '#999',
    },
    score: {
        width: Theme.screenWidth >= 375 ? 80 : 70,
        fontSize: 14,
        color: '#666',
    },
    totalNum: {
        width: 134,
        fontSize: 11,
        color: '#999',
    },
    ordernum: {
        width: 40,
        fontSize: 14,
        color: Theme.color,
    },
    nameZh: {
        fontSize: 12,
        color: '#303030',
    },
    scoreZh: {
        fontSize: 18,
        color: Theme.color2,
        fontWeight: 'bold',
    },
    totalNumZh: {
        fontSize: 12,
    },
    ordernumZh: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    null: {
        fontSize: 12,
        color: '#ccc',
    },
})

