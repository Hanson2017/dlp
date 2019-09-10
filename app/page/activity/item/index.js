import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, Platform } from 'react-native';
import Api from '../../../util/api';
import Util from '../../../util/util';
import Theme from '../../../util/theme';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
    render() {
        const { data, navigation } = this.props;
        let activity = data.activity;
        let uri = Api.domain + data.plat.platlogo;
        return (
            <View>

                <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={() => {
                    navigation.push('FlmfDetail',{id:activity.id})
                }} >
                    <View style={[styles.listHd, Platform.OS == 'android' ? { paddingTop: 5 } : null]}>
                        <View style={styles.listHdLeft}>
                            <Image source={{ uri: uri }} style={{ width: 70, height: 28 }} />
                            
                            <View style={styles.listHdTags}>
                                {
                                    activity.isrepeat === 0 ?
                                        <View style={[styles.tags, styles.tagsHd, styles.tagsFirst]}><Text style={[styles.tagsText, styles.tagsTextHd, styles.tagsTextFirst]}>首次出借</Text></View>
                                        :
                                        <View style={[styles.tags, styles.tagsHd, styles.tagsRepeat]}><Text style={[styles.tagsText, styles.tagsTextHd, styles.tagsTextRepeat]}>多次出借</Text></View>
                                }
                                {
                                    activity.keywords != '' && activity.keywords != null ?
                                        Util.formatSymbol(activity.keywords).map((keyword, i) => {
                                            return (
                                                <View key={i} style={[styles.tags, styles.tagsHd]}><Text style={[styles.tagsText, styles.tagsTextHd]}>{keyword}</Text></View>
                                            )
                                        })
                                        :
                                        null
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.listBd}>
                        <View style={styles.listBdli}>
                            <View><Text style={styles.listBdliText}>出借{activity.invest + ''}获得</Text></View>
                            <View style={Theme.mt5}><Text style={styles.listBdliTextNum}>{activity.rebate + ''}</Text></View>
                        </View>
                        <View style={styles.listBdli}>
                            <View><Text style={styles.listBdliText}>相当于年化</Text></View>
                            <View style={Theme.mt5}>
                                <Text style={styles.listBdliTextNum}>
                                    {
                                        activity.atype == 1 || activity.atype == 4 ?
                                            activity.rate + '%'
                                            :
                                            '浮动'
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.listBdli}>
                            <View><Text style={styles.listBdliText}>已参加</Text></View>
                            <View style={Theme.mt5}><Text style={[styles.listBdliTextNum, { color: '#666' }]}>{data.commentnum + ''}人</Text></View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tags: {
        marginRight: 5,
        paddingLeft: 4,
        paddingRight: 4,
        borderWidth: 0.5,
        borderRadius: 3,
        borderColor: '#c9c9c9',
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagsText: {
        color: '#c9c9c9',
        fontSize: 10,

    },
    item: {
        position: 'relative',
        flex: 1,
        padding: 12,
        backgroundColor: '#fff',
        marginTop: 10,
        height: 110,
    },
    listHd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listHdLeft: {
        flexDirection: 'row',
    },
    countdown: {
        width: 60,
        height: 23,
        paddingLeft: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#bcbcbc',
    },
    countdownText: {
        color: '#868686',
        fontSize: 11
    },
    countdownDateText: {
        color: '#E61C2C',
        fontSize: 11
    },
    listHdTags: {
        flexDirection: 'row',
        marginTop: 0,
        marginLeft: 8,
    },
    tagsHd: {
        marginRight: 8,
        borderColor: '#E62344',
    },
    tagsTextHd: {
        color: '#E62344',
    },
    tagsFirst: {
        borderColor: '#67cbdb',
    },
    tagsTextFirst: {
        color: '#67cbdb',
    },
    tagsRepeat: {
        borderColor: '#FF9900',
    },
    tagsTextRepeat: {
        color: '#FF9900',
    },
    listBd: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 8,
    },
    listBdli: {
        width: (Theme.screenWidth - 24) / 3
    },
    listBdliText: {
        fontSize: 12,
        color: '#868686',
    },
    listBdliTextNum: {
        fontSize: 18,
        color: '#E62344',
    },
    listFt: {
        flexDirection: 'row',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    maskView: {
        width: Theme.screenWidth,
        height: 147,
        position: 'absolute',
    },
    mask: {
        width: Theme.screenWidth,
        height: 147,
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: 0.6,
    },
    maskTextContainer: {
        width: (Theme.screenWidth - 24) / 3,
        height: 60,
        position: 'absolute',
        top: 50,
        backgroundColor: '#000',
        opacity: 0.6,
    },
    maskText: {
        width: (Theme.screenWidth - 24) / 3,
        height: 60,
        position: 'absolute',
        top: 50,
        paddingLeft: 12,
        justifyContent: 'center',
    },
    maskTextT: {
        fontSize: 15,
        color: '#fff',
        backgroundColor: 'rgba(52, 52, 52, 0)',
    }
})

