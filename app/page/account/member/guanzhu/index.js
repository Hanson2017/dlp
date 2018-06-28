import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../../../util/api';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Loading from '../../../../component/loading';

export default class Guanzhu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoadMore: true,
            isRefreshing: false,
            dataSource: [],
            totalNum: null,
            pageCount: null,
            pageSize: 50
        };
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <ScrollView contentContainerStyle={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    {
                        this.state.dataSource.length != 0 ?
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={this.renderItem.bind(this)}
                                onEndReached={this.onEndReached.bind(this)}
                                onEndReachedThreshold={10}
                            />
                            :
                            <Text style={styles.nullP}>暂无关注平台</Text>
                    }
                </ScrollView>
            )
        }

    }
    renderItem({ item, index }) {

        const { navigation } = this.props;
        return (
            <View style={[Theme.box, styles.listContainer]}>

                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.platNameContainer}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                            >
                                <Text style={[styles.platName]}>{item.plat_name}</Text>
                            </TouchableOpacity>

                            {
                                item.fundtype ?
                                    <View style={styles.fundtype}>
                                        <Icon name={'fund-icon'} size={17} color={Theme['fund' + item.fundtype + 'Color']} />
                                        <Text style={styles.fundtypeNo}>{item.fundtype}</Text>
                                    </View>

                                    : null
                            }

                        </View>
                        {
                            item.platstatus == 1 ?
                                <Text style={[styles.state]}>正常运营</Text>
                                :
                                item.platstatus == 3 ?
                                    <View style={[styles.stateBox, styles.stateZhengyiBox]}>
                                        <Text style={[styles.stateBoxText]}>争议中</Text>
                                    </View>

                                    :
                                    <View style={[styles.stateBox, styles.stateBlackBox]}>
                                        <Text style={[styles.stateBoxText]}>黑名单</Text>
                                    </View>
                        }

                    </View>

                    {
                        item.flmflist.length > 0 && versionStatus != 1 ?
                            <View style={styles.headerRight}>
                                {
                                    item.flmflist.map((list, i) => {
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
                </View>
                <View style={styles.bd}>
                    <View style={styles.paimingZh}>
                        <View style={styles.paimingZhList}>
                            <Text style={[styles.paimingText, styles.paimingZhListLabel]}>综合排名:</Text>
                            {
                                item.ordernum != 0 ?
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={[styles.paimingNoZh]}>{item.ordernum}</Text>
                                        <Icon name={item.changenum > 0 ? 'up' : 'down'} size={10} color={item.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={[styles.null, { fontSize: 14 }]}>  暂无</Text>
                            }
                        </View>
                        <Text style={[styles.yulun]}>本周新舆论：<Text style={{ fontSize: 14, color: '#333', }}>{item.infonum}</Text></Text>
                    </View>
                    <View style={styles.paiming}>
                        <View style={styles.paimingList}>
                            <View style={styles.paimingLabel}>
                                <Text style={[styles.paimingText]}>网贷之家: </Text>
                            </View>
                            {
                                item.wdzj != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, styles.paimingNo]}>{item.wdzj.ordernum}名</Text>
                                        <Icon name={item.wdzj.changenum > 0 ? 'up' : 'down'} size={10} color={item.wdzj.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.wdzj.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <View style={styles.paimingLabel}>
                                <Text style={[styles.paimingText]}>贷罗盘: </Text>
                            </View>
                            {
                                item.dlp != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, styles.paimingNo]}>{item.dlp.ordernum}名</Text>
                                        <Icon name={item.dlp.changenum > 0 ? 'up' : 'down'} size={10} color={item.dlp.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.dlp.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <View style={styles.paimingLabel}>
                                <Text style={[styles.paimingText]}>网贷天眼: </Text>
                            </View>

                            {
                                item.p2peye != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, styles.paimingNo]}>{item.p2peye.ordernum}名</Text>
                                        <Icon name={item.p2peye.changenum > 0 ? 'up' : 'down'} size={10} color={item.p2peye.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.p2peye.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>


                        <View style={styles.paimingList}>
                            <View style={styles.paimingLabel}>
                                <Text style={[styles.paimingText]}>融360: </Text>
                            </View>
                            {
                                item.rong360 != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, styles.paimingNo]}>{item.rong360.ordernum}名</Text>
                                        <Icon name={item.rong360.changenum > 0 ? 'up' : 'down'} size={10} color={item.rong360.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.rong360.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <View style={styles.paimingLabel}>
                                <Text style={[styles.paimingText]}>星火评级: </Text>
                            </View>
                            {
                                item.xinghuo != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, styles.paimingNo]}>{item.xinghuo.ordernum}名</Text>
                                        <Icon name={item.xinghuo.changenum > 0 ? 'up' : 'down'} size={10} color={item.xinghuo.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.xinghuo.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <View style={styles.paimingLabel}>
                                <Text style={[styles.paimingText]}>羿飞: </Text>
                            </View>
                            {
                                item.yifei != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, styles.paimingNo]}>{item.yifei.ordernum}名</Text>
                                        <Icon name={item.yifei.changenum > 0 ? 'up' : 'down'} size={10} color={item.yifei.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.yifei.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                    </View>

                </View>
            </View>
        )
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        setTimeout(
            () => {
                this.setState({
                    isRefreshing: false,
                })
            },
            500
        );
    }
    onEndReached() {
        if (this.state.totalNum > this.state.pageSize) {
            this.getData(2)
        }
    }
    componentDidMount() {
        let that = this;
        this.getData(1);
        window.EventEmitter.on('isAttention', (data) => {
            that.getData(1);
        })

    }
    componentWillUnmount() {
        window.EventEmitter.off('isAttention')
    }
    getData(type) {
        let that = this;

        if (type == 1) {
            this.page = 1;
            this.setState({
                loading: true,
                dataSource: []
            })
        }
        else if (type == 2) {
            if (this.state.pageCount > this.page) {
                this.page++;
            }
            else {
                return;
            }
        }

        let memberid = signState.r_id;
        let url = Api.attentionList + '?memberid=' + memberid + '&page=' + this.page + '&pagesize=' + this.state.pageSize;
        console.log(url)
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                let dataSource = that.state.dataSource;
                                dataSource = dataSource.concat(responseData.dataList);
                                that.setState({
                                    dataSource: dataSource,
                                    loading: false,
                                    isRefreshing: false,
                                    totalNum: responseData.totalNum,
                                    pageCount: responseData.pageCount
                                })
                            }
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingLeft: 20,
        marginBottom: 10,
    },
    header: {
        paddingRight: 20,
        paddingTop: 14,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    platNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    platName: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
    },
    fundtype: {
        position: 'relative',
        width: 18,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundtypeNo: {
        position: 'absolute',
        top: 1,
        left: 5,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
    },
    state: {
        paddingTop: 6,
        fontSize: 10,
        color: '#bbb'
    },
    stateBox: {
        marginTop: 5,
        width: 50,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stateZhengyiBox: {
        backgroundColor: '#c1272d',
    },
    stateBlackBox: {
        backgroundColor: '#1A1A1A',
    },
    stateBoxText: {
        fontSize: 10,
        color: '#fff',
    },
    stateZhengyi: {
        color: '#FFFF00'
    },
    stateBlack: {
        color: 'red'
    },
    activityContainer: {
        width: 116,
        height: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFBC41',
        borderRadius: 4,
    },
    activityContainerFt: {
        marginTop: 5,
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

    bd: {
        paddingTop: 12,
        paddingBottom: 12,
    },
    bdText: {
        color: '#abb7c4'
    },
    paiming: {
        width: 130,
    },
    jiantou: {
        width: 35,
    },

    null: {
        color: '#cdcdcd',
        fontSize: 11,
    },
    paimingZh: {
        paddingRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    paimingZhList: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    paimingZhListLabel: {
        width: 52,
        color: '#666',
        fontWeight: 'bold',
    },
    paimingNoZh: {
        width: 35,
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
    },
    yulun: {
        color: '#666',
        fontSize: 11,
        fontWeight: 'bold',
    },
    paiming: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    paimingList: {
        flexDirection: 'row',
        width: (Theme.screenWidth - 20) / 2,
        marginBottom: 10,
        alignItems: 'center',
    },
    paimingLabel: {
        width: 52,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    paimingNo: {
        width: 35,
    },
    paimingText: {
        color: '#999',
        fontSize: 11,
    },
    paimingText2: {
        color: '#bbb',
        fontSize: 10,
    },
    nullP: {
        color: '#999',
        fontSize: 12,
        padding: 15,
    }

})