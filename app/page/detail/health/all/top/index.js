import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Theme from '../../../../../util/theme';

import RadarChart from '../../../../../echarts/radar';


export default class DetailHealthAllTop extends React.Component {
    render() {
        const { data, platName } = this.props;
        const dataDlp = data.dlpDetail;
        const dataIndustry = data.industryDetail;


        if (dataDlp != null && dataIndustry != null) {
            var platdata = [dataDlp.inamount, dataDlp.dispersion, dataDlp.mobility, dataDlp.rate, dataDlp.popularity, dataDlp.stayStill, dataDlp.loyalty, dataDlp.growth]
            var platdata_ind = [dataIndustry.inamount, dataIndustry.dispersion, dataIndustry.mobility, dataIndustry.rate, dataIndustry.popularity, dataIndustry.stayStill, dataIndustry.loyalty, dataIndustry.growth]
            return (
                <View style={[Theme.box, styles.container]}>
                    {
                        dataDlp.ordernum > 0 ?
                            <View style={styles.topScore}>
                                <View style={styles.topScoreLeft}>
                                    <Text style={styles.topScoreLabel}>健康度指数</Text>
                                    <Text style={styles.topScoreNum}>{dataDlp.score}</Text>
                                    <View style={styles.topScoreBijiao}>
                                        <Text style={styles.topScoreText}>较上月 </Text>
                                        <Icon name={dataDlp.changnum >= 0 ? 'up' : 'down'} size={11} color={dataDlp.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                        <Text style={[styles.topScoreText, dataDlp.changnum >= 0 ? { color: Theme.upColor } : { color: Theme.downColor }]}> {Math.abs(dataDlp.changnum)}%</Text>
                                    </View>
                                </View>
                                <View style={styles.topScoreRight}>
                                    <Text style={styles.topScoreLabel}>健康度排名</Text>
                                    <Text style={styles.topScoreNum}>{dataDlp.ordernum}</Text>
                                    <Text style={styles.topScoreText}>在统计的{dataDlp.totalNum}家平台中</Text>
                                </View>
                            </View>
                            :
                            <Text style={styles.nullData}>暂无</Text>
                    }


                    <View style={styles.echarts}>
                        <Echarts option={RadarChart.radar(platName, platdata, platdata_ind)} height={300} width={320} />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.null}>
                    <Text style={styles.nullText}>暂无数据</Text>
                </View>

            )
        }
    }
}
const styles = StyleSheet.create({

    container: {
        paddingTop: 10,
        paddingBottom: 25,
        backgroundColor: '#fff',
    },
    topScore: {

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
        width: 80,
        textAlign: 'center',

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
    echarts: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    null: {
        backgroundColor: '#fff',
        paddingLeft: (Theme.screenWidth - 280) / 2,
        paddingTop: 15,
        paddingBottom: 20,
    },
    nullText: {
        color: '#999',
    },
    nullData: {
        backgroundColor: '#fff',
        paddingLeft: (Theme.screenWidth - 280) / 2,
        paddingTop: 15,
        paddingBottom: 20,
        color: '#999',
    }
})