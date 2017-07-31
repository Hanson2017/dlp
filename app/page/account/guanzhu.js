import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../util/api';
import Theme from '../../util/theme';
import Loading from '../../component/Loading';

export default class Guanzhu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoadMore: true,
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
                <View style={styles.container}>
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
                </View>
            )
        }

    }
    renderItem({ item, index }) {
        let fundType = null;
        let navigation = this.props.navigation;
        switch (item.fundtype) {
            case 1:
                fundType = '1号'
                break;
            case 2:
                fundType = '2号'
                break;
            case 3:
                fundType = '3号'
                break;
            case 4:
                fundType = '活期'
                break;
            default:
                fundType = null
        }
        return (
            <TouchableOpacity
                onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
            >
                <View style={styles.hd}>
                    <Text style={[styles.hdText, styles.platName]}>{item.plat_name}</Text>
                    {
                        item.platstatus == 1 ?
                            <Text style={[styles.hdText, styles.state]}>（正常）</Text>
                            :
                            item.platstatus == 3 ?
                                <Text style={[styles.hdText, styles.state, styles.stateZhengyi]}>（争议中）</Text>
                                :
                                <Text style={[styles.hdText, styles.state, styles.stateBlack]}>（黑名单）</Text>

                    }
                    {
                        fundType != null ?
                            <Text style={[styles.hdText, styles.shifan]}>（示范投资{fundType}）</Text>
                            : null
                    }
                </View>
                <View style={styles.bd}>
                    <View style={{ flexDirection: 'row', marginBottom: 12, }}>
                        <Text>综合排名:</Text>
                        {
                            item.ordernum != 0 ?
                                <View style={{ flexDirection: 'row', }}>
                                    <Text>  第{item.ordernum}名  </Text>
                                    <Icon name={item.changenum > 0 ? 'up' : 'down'} size={14} color={item.changenum > 0 ? '#ff0063' : '#009963'} />
                                    <Text style={{ color: '#cdcdcd' }}>  (共{item.countnum}家)</Text>
                                </View>
                                :
                                <Text style={[styles.null, { fontSize: 14 }]}>  暂无</Text>
                        }
                    </View>
                    <View style={styles.paiming}>
                        <View style={styles.paimingList}>
                            <Text style={[styles.paimingText, { width: 45 }]}>之家: </Text>
                            {
                                item.wdzj != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, { width: 45 }]}>第{item.wdzj.ordernum}名</Text>
                                        <Icon name={item.wdzj.changenum > 0 ? 'up' : 'down'} size={12} color={item.wdzj.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.wdzj.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <Text style={[styles.paimingText, { width: 45 }]}>天眼: </Text>
                            {
                                item.p2peye != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, { width: 45 }]}>第{item.p2peye.ordernum}名</Text>
                                        <Icon name={item.p2peye.changenum > 0 ? 'up' : 'down'} size={12} color={item.p2peye.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.p2peye.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <Text style={[styles.paimingText, { width: 45 }]}>贷罗盘: </Text>
                            {
                                item.dlp != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, { width: 45 }]}>第{item.dlp.ordernum}名</Text>
                                        <Icon name={item.dlp.changenum > 0 ? 'up' : 'down'} size={12} color={item.dlp.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.dlp.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>

                        <View style={styles.paimingList}>
                            <Text style={[styles.paimingText, { width: 45 }]}>融360: </Text>
                            {
                                item.rong360 != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, { width: 45 }]}>第{item.rong360.ordernum}名</Text>
                                        <Icon name={item.rong360.changenum > 0 ? 'up' : 'down'} size={12} color={item.rong360.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.rong360.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <Text style={[styles.paimingText, { width: 45 }]}>星火: </Text>
                            {
                                item.xinghuo != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, { width: 45 }]}>第{item.xinghuo.ordernum}名</Text>
                                        <Icon name={item.xinghuo.changenum > 0 ? 'up' : 'down'} size={12} color={item.xinghuo.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.xinghuo.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                        <View style={styles.paimingList}>
                            <Text style={[styles.paimingText, { width: 45 }]}>羿飞: </Text>
                            {
                                item.yifei != null ?
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={[styles.paimingText, { width: 45 }]}>第{item.yifei.ordernum}名</Text>
                                        <Icon name={item.yifei.changenum > 0 ? 'up' : 'down'} size={12} color={item.yifei.changenum > 0 ? '#ff0063' : '#009963'} />
                                        <Text style={styles.paimingText2}> (共{item.yifei.countnum}家)</Text>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无</Text>
                            }
                        </View>
                    </View>
                    <Text style={[styles.yulun]}>本周新舆论：{item.infonum}条</Text>
                </View>
            </TouchableOpacity>
        )
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
                                console.log(responseData)
                                let dataSource = that.state.dataSource;
                                dataSource = dataSource.concat(responseData.dataList);
                                that.setState({
                                    dataSource: dataSource,
                                    loading: false,
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
    container: {
        paddingTop: 20,
    },
    hd: {
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dfe5ea'
    },
    platName: {
        width: 100,
        color: '#333',
    },
    state: {
        width: 80,
        color: '#009900'
    },
    shifan: {
        color: '#009900'
    },
    bd: {
        paddingLeft: 15,
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
    stateZhengyi: {
        color: '#FFFF00'
    },
    stateBlack: {
        color: 'red'
    },
    null: {
        color: '#cdcdcd',
        fontSize: 12,
    },
    paiming: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    paimingList: {
        flexDirection: 'row',
        width: (Theme.screenWidth - 15) / 2,
        marginBottom: 10,
    },
    paimingText: {
        color: '#abb7c6',
        fontSize: 12,
    },
    paimingText2: {
        color: '#cdcdcd',
        fontSize: 12,
    },
    nullP:{
        color: '#cdcdcd',
        fontSize: 12,
        paddingLeft:15,
    }

})