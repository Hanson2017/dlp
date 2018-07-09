import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';

export default class ZonglanFund extends React.Component {
    render() {
        const { navigation, data, fundelse, platName, platId,dataInfo } = this.props;
       
        if (data !== null) {
            const type = data.fund_type;
            return (
                <View style={[Theme.box, Theme.mt10]}>
                    <View style={styles.fundInfoHeader}>
                        <View style={styles.fundInfoHeaderLeft}>
                            <View style={[styles.fundType, styles['fundType' + type]]}>
                                <Text style={styles.fundTypeText}>{type}号</Text>
                            </View>
                            <View style={styles.fundTitle}>
                                <Text style={styles.fundTitleText}>
                                    {
                                        type == 1 ?
                                            '稳健型'
                                            :
                                            type == 2 ?
                                                '平衡型'
                                                :
                                                '收益型'
                                    }
                                    示范投资
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.fundInfoHeaderRight}
                            activeOpacity={0.5}
                            onPress={() => { navigation.navigate('DetailFund', { data: data, fundelse: fundelse, platName: platName, dataInfo: dataInfo,platId:platId }) }}
                        >
                            <Icon name={'triangle-right'} size={12} color={'#bbb'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fundInfoBody}>
                        <View style={styles.fundInfoBodyHd}>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc1]}>投资状态</Text>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc2]}>在投项目</Text>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc3]}>投资额</Text>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc4]}>年化收益率</Text>
                        </View>
                        {
                            data.investlist.map((item, i) => {
                                return (
                                    <View style={styles.fundInfoBodyBd} key={i}>
                                        <Text style={[styles.fundInfoBodyBdText, styles.listIc1]}>已参投</Text>
                                        <Text style={[styles.fundInfoBodyBdText, styles.listIc2]}>{item.name}</Text>
                                        <Text style={[styles.fundInfoBodyBdText, styles.listIc3]}>{item.invest}万</Text>
                                        <Text style={[styles.fundInfoBodyBdText, styles.listIc4]}>{item.rate}%</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={[styles.null, Theme.mt10]}><Text style={styles.nullText}>暂无示范投资</Text></View>
            )
        }

    }
}
const styles = StyleSheet.create({
    null: {
        backgroundColor: '#fff',
        height: 40,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    nullText: {
        fontSize: 14,
        color: '#bbb',

    },
    fundInfoHeader: {
        paddingLeft: 10,
        paddingRight: 20,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    fundInfoHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundType: {
        marginRight: 10,
        width: 36,
        height: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.fund1Color,
    },
    fundType1: {
        backgroundColor: Theme.fund1Color,
    },
    fundType2: {
        backgroundColor: Theme.fund2Color,
    },
    fundType3: {
        backgroundColor: Theme.fund3Color,
    },
    fundTypeText: {
        fontSize: 16,
        color: '#fff',
    },
    fundTitleText: {
        fontSize: 16,
        color: '#515151',
    },
    fundInfoHeaderRight: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    fundInfoBody: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 13,
    },
    fundInfoBodyHd: {
        flexDirection: 'row',
    },
    fundInfoBodyBd: {
        marginTop: 8,
        flexDirection: 'row',
    },
    fundInfoBodyHdText: {
        fontSize: 11,
        color: '#999',
    },
    fundInfoBodyBdText: {
        fontSize: 14,
        color: '#666',
    },
    listIc1: {
        width: 80,
    },
    listIc2: {
        width: 90,
    },
    listIc3: {
        width: Theme.screenWidth >= 375 ? 80 : 65,
        
    },

})