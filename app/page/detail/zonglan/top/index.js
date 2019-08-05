import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Util from '../../../../util/util';
import DashLine from '../../../../component/dashLine';


export default class ZonglanTop extends React.Component {

    render() {
        const { data, navigation, thatt } = this.props;
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
                    data.dataInfo.platstatus == 1 && data.dataInfo.stopbid !== 1 && ((data.goodtag !== null && data.goodtag !== '' && data.goodtag.length > 0) || (data.badtag !== null && data.badtag !== '' && data.badtag.length > 0)) ?
                        <View style={styles.tagsNewContainer}>
                            <View style={styles.tagsNew}>
                                <View style={styles.tagsNewIcon}>
                                    <Image source={{ uri: 'http://m.dailuopan.com/images/icon-gtag.png?20180929' }} style={styles.icontag} />
                                </View>
                                <View style={styles.tagsNewCon}>
                                    {
                                        data.goodtag !== null && data.goodtag !== '' && data.goodtag.length > 0 ?
                                            data.goodtag.map((item, i) => {
                                                return (
                                                    <View style={styles.tagNew}>
                                                        <Text style={styles.tagNewText}>{item.tags}</Text>
                                                        {
                                                            item.tags == '一线平台' ?
                                                                <Ionicons name={'md-thumbs-up'} size={15} color={'#fff'} />
                                                                :
                                                                null
                                                        }

                                                    </View>
                                                )
                                            })
                                            :
                                            <Text style={styles.tagNull}>暂无</Text>
                                    }

                                </View>
                            </View>
                            <View style={[styles.tagsNew, styles.tagsNewBad]}>
                                <View style={styles.tagsNewIcon}>
                                    <Image source={{ uri: 'http://m.dailuopan.com/images/icon-btag.png' }} style={styles.icontag2} />
                                </View>
                                <View style={styles.tagsNewCon}>
                                    {
                                        data.badtag !== null && data.badtag !== '' && data.badtag.length > 0 ?
                                            data.badtag.map((item, i) => {
                                                return (
                                                    <View style={[styles.tagNew, styles.tagNewBad]}><Text style={styles.tagNewText}>{item.tags}</Text></View>
                                                )
                                            })
                                            :
                                            <Text style={styles.tagNull}>暂无</Text>
                                    }

                                </View>
                            </View>
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
                            <View style={styles.zhengyiYY}>
                                <Text style={styles.zhengyiText}>争议时间：{Util.formatDate(data.dataInfo.negative_time)}</Text>
                                {
                                    data.zylinktitle !== null ?
                                        <TouchableOpacity onPress={() => {
                                            if (data.zylinkurl) {
                                                navigation.navigate('DetailBuiltBrowsing', { url: data.zylinkurl })
                                            }

                                        }}>
                                            <Text style={styles.zhengyiText} numberOfLines={1} >争议原因：<Text style={styles.zhengyiLink}>{data.zylinktitle}</Text></Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                }

                            </View>

                        </View>
                        :
                        data.dataInfo.platstatus == 1 && data.dataInfo.stopbid == 1 ?
                            <View style={styles.zhengyiTime}>
                                <View style={styles.zhengyiTag}>
                                    <Text style={styles.zhengyiTagText}>停止发标</Text>
                                </View>
                            </View>
                            :
                            null
                }

                {
                    data.dataInfo.platstatus != 1 ?

                        <View style={styles.blackZoushi}>
                            <View style={styles.dashLine}>
                                <DashLine width={(Theme.screenWidth - 120)} />
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
                                        {
                                            data.zylinktitle !== null ?
                                                <TouchableOpacity onPress={() => {
                                                    if (data.zylinkurl) {
                                                        navigation.navigate('DetailBuiltBrowsing', { url: data.zylinkurl })
                                                    }

                                                }}>
                                                    <Text style={styles.blackZoushiItemLinkZy}>查看相关资料</Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                        }
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
                                {
                                    data.blacklinktitle !== null ?
                                        <TouchableOpacity onPress={() => {
                                            if (data.blacklinkurl) {
                                                navigation.navigate('DetailBuiltBrowsing', { url: data.blacklinkurl })
                                            }

                                        }}>
                                            <Text style={styles.blackZoushiItemLinkBlack}>查看相关资料</Text>
                                        </TouchableOpacity>
                                        :
                                        null
                                }
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
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A81616',
        borderRadius: 4,
    },
    zhengyiTagText: {
        fontSize: 11,
        color: '#fff',
    },
    zhengyiYY: {
        flex: 1,
    },
    zhengyiText: {
        paddingRight: 10,
        fontSize: 11,
        color: '#A81616',
        lineHeight: 17,
    },
    zhengyiLink: {
        flex: 1,
        textDecorationLine: 'underline',
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
    dashLine: {
        position: 'absolute',
        left: 58,
        top: 70,
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
    blackZoushiItemLinkZy: {
        paddingTop: 5,
        fontSize: 11,
        color: '#A81616',
        textDecorationLine: 'underline',
    },
    blackZoushiItemLinkBlack: {
        paddingTop: 5,
        fontSize: 11,
        color: '#101010',
        textDecorationLine: 'underline',
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
    tagsNewContainer: {
        paddingLeft: 15,
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    tagsNew: {
        marginBottom: 5,
        flexDirection: 'row',

    },
    tagsNewIcon: {
        height: 22,
        width: 22,
        justifyContent: 'center',
    },
    icontag: {
        width: 18,
        height: 18,
    },
    icontag2: {
        width: 20,
        height: 18,
    },
    tagsNewCon: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagNew: {
        flexDirection: 'row',
        marginLeft: 6,
        marginBottom: 6,
        paddingLeft: 5,
        paddingRight: 5,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0096E6',
        borderRadius: 4,
    },
    tagNewText: {
        color: '#fff',
        fontSize: 12,
    },
    tagsNewBad: {
        marginBottom: 0,
    },
    tagNewBad: {
        backgroundColor: '#bbb',
    },
    tagNull: {
        paddingLeft: 6,
        color: '#999',
        fontSize: 14,
        lineHeight: 20,
    },
})
