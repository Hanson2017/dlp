import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Util from '../../../../util/util';
import DashLine from '../../../../component/dashLine';


export default class ZonglanTop extends React.Component {

    render() {
        const { data ,navigation,thatt} = this.props;
        return (
            <View style={[Theme.box, styles.container]}>
                <View style={styles.platInfo}>
                    <View style={styles.platInfoLeft}>
                        <View style={styles.platName}>
                            <Text style={styles.platNameText}>{data.platName}</Text>
                            {
                                data.fundType !== null ?
                                    <View style={styles.fundtype}>
                                        <Icon name={'fund-icon'} size={24} color={Theme['fund' + data.fundType + 'Color']} />
                                        <Text style={styles.fundtypeNo}>{data.fundType}</Text>
                                    </View>
                                    :
                                    null
                            }

                        </View>
                        <Text style={styles.platInfoLeftText}>上线时间：{data.uptime != '1900-01-01' ? data.uptime : '未知'}</Text>
                        <TouchableOpacity
                            style={styles.siteurl}
                            onPress={() => {
                                thatt.setState({
                                    isHiddenMianze: false,
                                })
                            }}
                        >
                            <Text style={[styles.platInfoLeftText]}>官方网站：<Text style={styles.siteurlText}>{data.siteurl}</Text></Text>
                        </TouchableOpacity>
                    </View>
                    {
                        data.dataInfo.platstatus == 1 ?
                            <View style={styles.platInfoRight}>
                                <View style={styles.platInfoRightList}>
                                    <Text style={styles.platInfoRightListLabel}>评测总条数：</Text>
                                    <Text style={styles.platInfoRightListNum}>{data.mpcount}</Text>
                                </View>
                                <View style={styles.platInfoRightList}>
                                    <Text style={styles.platInfoRightListLabel}>舆论总条数：</Text>
                                    <Text style={styles.platInfoRightListNum}>{data.sentcount}</Text>
                                </View>
                                <View style={styles.platInfoRightList}>
                                    <Text style={styles.platInfoRightListLabel}>点评总条数：</Text>
                                    <Text style={styles.platInfoRightListNum}>{data.commentcount}</Text>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={styles.blackTagW}>
                                    <View style={styles.blackTagN}>
                                        <Text style={styles.blackTagText}>黑名单</Text>
                                    </View>
                                </View>
                                {
                                    data.dataInfo.blackinfo != null && data.dataInfo.blackinfo != '' ?
                                        <Text style={styles.blackReasonText}>原因：{data.dataInfo.blackinfo}</Text>
                                        :
                                        null
                                }
                            </View>
                    }
                </View>

                {
                    data.platinfo.length > 0 ?
                        <View style={styles.tags}>
                            {data.platinfo.map((item, i) => {
                                return (
                                    <View style={styles.tag} key={i}>
                                        <Text key={i} style={styles.tagText}>{item}</Text>
                                        {
                                            data.platinfo.length - 1 !== i ?
                                                <Text style={[styles.tagText, styles.tagLine]}>|</Text>
                                                :
                                                null
                                        }

                                    </View>
                                )
                            })
                            }
                        </View>
                        :
                        null
                }

                {
                    data.flmllist != null && versionStatus != 1 ?
                        <View style={styles.activityList}>
                            {
                                data.flmllist.map((list, i) => {
                                    let url = 'http://m.fanlimofang.com/Activity/Detail/' + list.activityid;
                                    return (
                                        <TouchableOpacity key={i} style={[styles.activityContainer, list.investtype == 1 ? styles.activityContainerFt : null]}
                                            onPress={() => {
                                                Util.Linked(url)
                                            }}
                                        >
                                            <View style={styles.activityIconOut}>
                                                <View style={styles.activityIconIn}></View>
                                            </View>
                                            <View style={styles.activityTextCon}>
                                                <Text style={styles.activityText}>
                                                    {list.investtype == 0 ? '首投' : '复投'}{list.invest}奖{list.rebate}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        :
                        null
                }
                {
                    data.dataInfo.platstatus == 1 && data.dataInfo.negative_time !== null && data.dataInfo.negative_time != '' ?
                        <View style={styles.zhengyiTime}>
                            <View style={styles.zhengyiTag}>
                                <Text style={styles.zhengyiTagText}>争议中</Text>
                            </View>
                            <Text style={styles.zhengyiText}>争议时间：{Util.formatDate(data.dataInfo.negative_time)}</Text>
                        </View>
                        :
                        null
                }

                {
                    data.dataInfo.platstatus != 1 ?

                        <View style={styles.blackZoushi}>
                            <View style={styles.dashLine}>
                                <DashLine width={(Theme.screenWidth-120)} />
                            </View>
                            <View style={styles.blackZoushiItem}>
                                <View style={[styles.blackZoushiYunYingTop, styles.blackZoushiTop]}>
                                    <Text style={styles.blackZoushiYunYingTopText}>上线运营</Text>
                                    <Icon name={'triangle-down'} style={styles.blackZoushiTopIcon} size={15} color={'#6addaa'} />
                                </View>
                                <View style={[styles.blackZoushiItemIconW]}>
                                    <View style={styles.blackZoushiItemIconN}></View>
                                </View>
                                <View style={styles.blackZoushiItemTime}>
                                    <Text style={styles.blackZoushiItemTimeText}>{data.uptime != '1900-01-01' ? data.uptime : '未知'}</Text>
                                </View>
                            </View>
                            {
                                data.dataInfo.negative_time !== null && data.dataInfo.negative_time != '' ?

                                    <View style={styles.blackZoushiItem}>
                                        <View style={[styles.blackZoushiZhengyiTop, styles.blackZoushiTop]}>
                                            <Text style={styles.blackZoushiYunYingTopText}>争议中</Text>
                                            <Icon name={'triangle-down'} style={styles.blackZoushiTopIcon} size={15} color={'#A81616'} />
                                        </View>
                                        <View style={[styles.blackZoushiItemIconW, styles.blackZoushiItemIconWZhengyi]}>
                                            <View style={[styles.blackZoushiItemIconN, styles.blackZoushiItemIconNZhengyi]}></View>
                                        </View>
                                        <View style={styles.blackZoushiItemTime}>
                                            <Text style={[styles.blackZoushiItemTimeText, styles.blackZoushiItemTimeTextZhengyi]}>{Util.formatDate(data.dataInfo.negative_time)}</Text>
                                        </View>
                                    </View>
                                    :
                                    null
                            }
                            <View style={styles.blackZoushiItem}>
                                <View style={[styles.blackZoushiBlackTop, styles.blackZoushiTop]}>
                                    <Text style={styles.blackZoushiYunYingTopText}>{data.dataInfo.blackinfo}</Text>
                                    <Icon name={'triangle-down'} style={styles.blackZoushiTopIcon} size={15} color={'#101010'} />
                                </View>
                                <View style={[styles.blackZoushiItemIconW, styles.blackZoushiItemIconWBlack]}>
                                    <View style={[styles.blackZoushiItemIconN, styles.blackZoushiItemIconNBlack]}></View>
                                </View>
                                <View style={styles.blackZoushiItemTime}>
                                    <Text style={[styles.blackZoushiItemTimeText, styles.blackZoushiItemTimeTextBlack]}>{Util.formatDate2(data.dataInfo.blacktime)}</Text>
                                </View>
                            </View>

                        </View>
                        :
                        null
                }

            </View>
        )

    }
}
const styles = StyleSheet.create({

    container: {
        paddingBottom: 10,
    },
    platInfo: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    platInfoRight: {
        paddingLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#eee',
    },
    platInfoLeft: {
        width: Theme.screenWidth >= 375 ? 210 : 180,
    },
    platName: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    platNameText: {
        fontSize: 22,
        color: '#303030',
        fontWeight: 'bold',
    },
    fundtype: {
        position: 'relative',
        width: 24,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundtypeNo: {
        position: 'absolute',
        top: -1,
        left: 7,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    siteurl: {
        marginTop: 8,
    },

    platInfoLeftText: {
        fontSize: 11,
        color: '#999',

    },
    siteurlText: {
        textDecorationLine: 'underline',
    },
    platInfoRightList: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    platInfoRightListLabel: {
        fontSize: 11,
        color: '#999',
    },
    platInfoRightListNum: {
        fontSize: 12,
        color: Theme.color,
    },
    tags: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 10,
        backgroundColor: '#F5F5F5',
        height: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagText: {
        fontSize: Theme.screenWidth >= 375 ? 12 : 11,
        color: '#666',
    },
    tagLine: {
        paddingLeft: Theme.screenWidth >= 375 ? 9 : 7,
        paddingRight: Theme.screenWidth >= 375 ? 9 : 7,
    },
    activityList: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    activityContainer: {
        marginRight: 10,
        width: 110,
        height: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFBC41',
        borderRadius: 4,
    },
    activityContainerFt: {
        backgroundColor: '#FF6F00',
    },
    activityIconOut: {
        width: 18,
        height: 18,
        backgroundColor: '#E30A0A',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIconIn: {
        width: 8,
        height: 8,
        backgroundColor: '#FFBC41',
        borderRadius: 4,
    },
    activityTextCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityText: {
        fontSize: 10,
        color: '#fff',
    },
    blackTagW: {
        padding: 2,
        width: 106,
        height: 46,
        borderWidth: 4,
        borderColor: '#000',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',

    },
    blackTagN: {
        width: 94,
        height: 34,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    blackTagText: {
        color: '#000',
        fontSize: 24,
        fontWeight: 'bold',
    },
    blackReasonText: {
        paddingTop: 7,
        color: '#1A1A1A',
        fontSize: 13,
        fontWeight: 'bold',
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    blackiTime: {
        marginTop: 10,
        paddingTop: 10,
        paddingLeft: 17,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    blackiTimeText: {
        lineHeight: 20,
        color: '#1A1A1A',
        fontSize: 11,
    },
    zhengyiTime: {
        marginTop: 10,
        marginBottom: 5,
        paddingTop: 10,
        paddingLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    zhengyiTag: {
        marginRight: 10,
        width: 50,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A81616',
    },
    zhengyiTagText: {
        fontSize: 11,
        color: '#fff',
    },
    zhengyiText: {
        fontSize: 11,
        color: '#A81616',
    },
    blackZoushiTop: {

        position: 'relative',
        width: 58,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    blackZoushiYunYingTop: {
        backgroundColor: '#6addaa',
    },
    blackZoushiYunYingTopText: {
        color: '#fff',
        fontSize: 12,
    },
    blackZoushi: {
        position: 'relative',
        paddingBottom: 10,
        paddingTop: 25,
        marginTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingLeft: 30,
        paddingRight: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dashLine:{
        position:'absolute',
        left:58,
        top:70,
    },
    blackZoushiItem: {
        width: 70,

        alignItems: 'center',
    },
    blackZoushiTopIcon: {
        position: 'absolute',
        bottom: -9,
        left: 21,
        backgroundColor: 'rgba(52, 52, 52, 0)',
    },
    blackZoushiItemIconW: {
        marginTop: 12,
        marginBottom: 6,
        width: 16,
        height: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#6addaa',
        borderWidth: 2,
    },
    blackZoushiItemIconN: {
        width: 6,
        height: 6,
        borderRadius: 6,
        backgroundColor: '#6addaa',
    },
    blackZoushiItemTimeText: {
        color: '#999',
        fontSize: 11,
    },
    blackZoushiZhengyiTop: {
        backgroundColor: '#A81616',
    },
    blackZoushiItemIconWZhengyi: {
        borderColor: '#A81616',
    },
    blackZoushiItemIconNZhengyi: {
        backgroundColor: '#A81616',
    },
    blackZoushiItemTimeTextZhengyi: {
        color: '#A81616',
    },
    blackZoushiBlackTop: {
        backgroundColor: '#101010',
    },
    blackZoushiItemIconWBlack: {
        borderColor: '#101010',
    },
    blackZoushiItemIconNBlack: {
        backgroundColor: '#101010',
    },
    blackZoushiItemTimeTextBlack: {
        color: '#101010',
    },
})
