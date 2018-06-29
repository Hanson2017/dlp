import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import { SafeAreaView } from "react-navigation";
import Theme from '../../../util/theme';
import Header from '../../../component/navBar/detail';
import ActionShare from '../../../component/actionShare';

export default class DetailFund extends React.Component {
    render() {
        const { navigation } = this.props;
        const { params } = this.props.navigation.state;
        const fundData = params.data;
        const fundelse = params.fundelse;
        var len = 3;
        if (fundData.fund_type == 3) {
            len = 5
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={[styles.container]}>
                    <Header headerOpt={{ title: params.platName + ' | 示范投资', noBack: true }} navigation={navigation} showActionSheet={this.showActionSheet.bind(this)} />
                    <ActionShare ref={'ActionShare'} />
                    <ScrollView style={Theme.content}>
                        <View style={[Theme.box, styles.fundInfoContainer]}>
                            <View style={styles.fundInfoHd}>
                                <Icon name={'fund-icon'} size={20} color={Theme['fund' + fundData.fund_type + 'Color']} />
                                <Text style={styles.platnameText}>{params.platName}</Text>
                            </View>
                            <View style={styles.fundInfoBd}>
                                <View style={styles.fundInfoBdHd}>
                                    <Text style={[styles.fundInfoBodyHdText, styles.listIc1]}>投资状态</Text>
                                    <Text style={[styles.fundInfoBodyHdText, styles.listIc2]}>在投项目</Text>
                                    <Text style={[styles.fundInfoBodyHdText, styles.listIc3]}>投资额</Text>
                                    <Text style={[styles.fundInfoBodyHdText, styles.listIc4]}>年化收益率</Text>
                                </View>
                                {
                                    fundData.investlist.map((item, i) => {
                                        return (
                                            <View style={styles.fundInfoBdList} key={i}>
                                                <Text style={[styles.fundInfoBodyBdText, styles.listIc1]}>已参投</Text>
                                                <Text style={[styles.fundInfoBodyBdText, styles.listIc2]}>{item.name}</Text>
                                                <Text style={[styles.fundInfoBodyBdText, styles.listIc3]}>{item.invest}万</Text>
                                                <Text style={[styles.fundInfoBodyBdText, styles.listIc4]}>{item.rate}%</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <View style={styles.fundInfoReasons}>
                                <Text style={styles.fundInfoReasonsTitleText}>投资理由</Text>
                                <View style={styles.fundInfoReasonsBox}>
                                    {
                                        fundData.fund_reasons.split('<br />').map((list, i) => {
                                            return (
                                                <Text key={i} style={styles.fundInfoReasonsText}>{list}</Text>
                                            )
                                        })
                                    }
                                </View>
                            </View >
                        </View>


                        <View style={[styles.fundOther, Theme.box, Theme.mt10]}>
                            <View style={styles.fundHeader}>
                                <View style={styles.fundHeaderLeft}>
                                    <View style={[styles.fundType, styles['fundType' + fundData.fund_type]]}>
                                        <Text style={styles.fundTypeText}>{fundData.fund_type}号</Text>
                                    </View>
                                    <View style={styles.fundTitle}>
                                        <Text style={styles.fundTitleText}>
                                            {
                                                fundData.fund_type == 1 ?
                                                    '稳健型'
                                                    :
                                                    fundData.fund_type == 2 ?
                                                        '平衡型'
                                                        :
                                                        '收益型'
                                            }
                                            示范投资
                                    </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.fundSm}>
                                <View style={styles.fundSmList}>
                                    <Text style={styles.fundSmLabelText}>安全指数</Text>
                                    <View style={styles.fundStart}>
                                        <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                        <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                        <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                        {
                                            fundData.fund_type == 1 ?
                                                <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                                :
                                                null
                                        }
                                        {
                                            fundData.fund_type == 1 ?
                                                <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                                :
                                                null
                                        }
                                        {
                                            fundData.fund_type == 2 ?
                                                <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                                :
                                                null
                                        }

                                    </View>
                                </View>
                                <View style={styles.fundSmList}>
                                    <Text style={styles.fundSmLabelText}>适合人群</Text>
                                    <Text style={styles.fundSmText}>
                                        {
                                            fundData.fund_type == 1 ?
                                                '适合以稳健安全为首选目标，风险厌恶型的人群。'
                                                :
                                                fundData.fund_type == 2 ?
                                                    '适合以平衡为首选目标，能承受低风险的人群。'
                                                    :
                                                    '适合以收益为首选目标，能承受少量风险的人群。'
                                        }



                                    </Text>
                                </View>
                            </View>
                            <View style={styles.fundList}>
                                <View style={styles.fundListLeft}>
                                    <View style={styles.fundListHd}>
                                        <Text style={[styles.listHdText, styles.fundIc1]}>在投平台</Text>
                                        <Text style={[styles.listHdText, styles.fundIc2]}>利率</Text>
                                    </View>
                                    <View style={styles.fundListBd}>
                                        {
                                            fundelse.map((item, i) => {
                                                if (i < len) {
                                                    return (
                                                        <View key={i} style={styles.list}>
                                                            <TouchableOpacity style={styles.fundIc1}
                                                                onPress={() => {
                                                                    navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                                }}
                                                            >
                                                                <Text style={[styles.listPlatText, styles.listText]}>{item.plat_name}</Text>
                                                            </TouchableOpacity>
                                                            <Text style={[styles.fundIc2, styles.listRateText, styles['listRateText' + fundData.fund_type]]}>{item.fund_rate}%</Text>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }

                                    </View>
                                </View>
                                <View style={styles.fundListRight}>
                                    <View style={styles.fundListHd}>
                                        <Text style={[styles.listHdText, styles.fundIc1]}>在投平台</Text>
                                        <Text style={[styles.listHdText, styles.fundIc2]}>利率</Text>
                                    </View>
                                    <View style={styles.fundListBd}>
                                        {
                                            fundelse.map((item, i) => {
                                                if (i >= len) {
                                                    return (
                                                        <View key={i} style={styles.list}>
                                                            <TouchableOpacity style={styles.fundIc1}
                                                                onPress={() => {
                                                                    navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                                }}
                                                            >
                                                                <Text style={[styles.listPlatText, styles.listText]}>{item.plat_name}</Text>
                                                            </TouchableOpacity>
                                                            <Text style={[styles.fundIc2, styles.listRateText, styles['listRateText' + fundData.fund_type]]}>{item.fund_rate}%</Text>
                                                        </View>
                                                    )
                                                }

                                            })
                                        }

                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
    showActionSheet() {
        const { params } = this.props.navigation.state;
        this.refs.ActionShare.show(params.dataInfo)
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    content: {
        flex: 1,
    },
    fundInfoContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    fundInfoHd: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    platnameText: {
        paddingLeft: 5,
        fontSize: 18,
        color: '#666',
        fontWeight: 'bold',
    },
    fundInfoBdHd: {
        flexDirection: 'row',
    },

    fundInfoBdList: {
        marginTop: 6,
        flexDirection: 'row',
    },
    fundInfoBodyHdText: {
        fontSize: 12,
        color: '#666',
    },
    fundInfoBodyBdText: {
        fontSize: 18,
        color: '#333',
    },
    listIc1: {
        width: 80,
    },
    listIc2: {
        width: 90,
    },
    listIc3: {
        width: 80,
    },
    fundInfoReasons: {
        marginTop: 20,
    },
    fundInfoReasonsTitleText: {
        fontSize: 12,
        color: '#707070'
    },
    fundInfoReasonsBox: {
        marginTop: 8,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },
    fundInfoReasonsText: {
        lineHeight: 18,
        fontSize: 12,
        color: '#666'
    },

    fundOther: {
        paddingTop: 20,
    },
    fundHeader: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fundHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundType: {
        marginRight: 10,
        width: 40,
        height: 24,
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
        fontWeight: 'bold',
    },
    fundTitleText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    fundSm: {
        marginRight: 10,
        marginLeft: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    fundSmList: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundSmLabelText: {
        paddingRight: 5,
        fontSize: 12,
        color: '#A1A1A1'
    },
    fundStart: {
        flexDirection: 'row',
    },
    fundSmText: {
        fontSize: 12,
        color: '#707070'
    },
    fundList: {
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 20,
        marginBottom: 25,
        flexDirection: 'row',
    },
    fundListLeft: {
        paddingRight: 5,
        marginRight: 30,
        borderRightWidth: 1,
        borderRightColor: '#f2f2f2',
    },
    fundListHd: {
        marginBottom: 5,
        flexDirection: 'row',
    },
    list: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    fundIc1: {
        width: 90,
    },
    fundIc2: {
        width: 65,
    },
    listHdText: {
        fontSize: 12,
        color: '#A1A1A1'
    },
    listPlatText: {
        fontSize: 14,
        color: '#707070'
    },
    listRateText: {
        fontSize: 14,
        color: Theme.fund1Color,
    },
    listRateText1: {
        color: Theme.fund1Color,
    },
    listRateText2: {
        color: Theme.fund2Color,
    },
    listRateText3: {
        color: Theme.fund3Color,
    },
})
