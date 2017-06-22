import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../util/api';
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
                            <Text style={styles.null}>暂无关注平台</Text>
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
                    <Text style={[styles.bdText, styles.paiming]}>
                        综合排名：
                        {
                            item.ordernum != 0 ?
                                item.ordernum
                                :
                                '暂无'
                        }
                    </Text>
                    <Text style={[styles.bdText, styles.jiantou]}>
                        {
                            item.ordernum != 0 ?
                                <Icon name={item.changnum > 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                :
                                null
                        }
                    </Text>
                    <Text style={[styles.bdText, styles.yulun]}>本周新舆论：{item.infonum}条</Text>
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
        paddingLeft: 20,
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
        paddingLeft: 20,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bdText: {
        color: '#abb7c4'
    },
    paiming: {
        width: 150,
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
        paddingLeft: 20,
        color: '#ccc',
    }

})