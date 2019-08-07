import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import stylesList from '../../../../css/listData';

export default class LicaiListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: false,
        };
    }
    render() {
        const { dataSource, isLoadMore, isLoadMoreIng, isRefreshing } = this.props;

        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={this.onRefresh}
                    />
                }
            >

                <View style={[styles.container]}>
                    <View style={[styles.leftContainer, this.state.isFixed ? styles.fixed : null]}>
                        <FlatList
                            data={dataSource}
                            ListHeaderComponent={this.ListHeaderComponentL}
                            renderItem={this.renderItemL}
                        />
                    </View>
                    <View style={[styles.rightContainer]}>
                        <ScrollView horizontal={true} onScroll={this._onScroll}>
                            <FlatList
                                data={dataSource}
                                ListHeaderComponent={this.ListHeaderComponent}
                                renderItem={this.renderItem}
                                ListEmptyComponent={this.ListEmptyComponent}
                                alwaysBounceVertical={false}
                                alwaysBounceHorizontal={true}
                                style={{ flexDirection: 'row', }}
                            />
                        </ScrollView>
                    </View>
                </View>

                {
                    isLoadMore ?
                        <TouchableOpacity disabled={isLoadMoreIng ? true : false} style={stylesList.getMore} onPress={this.getMore}>
                            <Text style={stylesList.getMoreText}>{isLoadMoreIng ? '正在加载...' : '加载更多'}</Text>
                        </TouchableOpacity>
                        :
                        null
                }

            </ScrollView>
        )
    }
    ListHeaderComponentL = () => {

        return (
            <View style={styles.header}>
                <Text style={[styles.headerText, styles.wduibi]}>对比</Text>
                <Text style={[styles.headerText, styles['wcpms']]}>产品名称</Text>
            </View>
        )
    }
    renderItemL = ({ item, index }) => {
        const { that, navigation } = this.props;
        return (
            <View style={styles.item}>
                <TouchableOpacity style={[styles.wduibi]} onPress={() => {
                    that.addContrast({ 'id': item.id, 'cpms': item.cpms, 'yjbjjz': item.yjbjjz })
                }}>
                    <Ionicons name={'ios-add-circle-outline'} size={24} color={'#999'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('LicaiDetail', { id: item.id, })
                }}>
                    <Text style={[styles.itemText, styles.noikcpmsText, styles['wcpms']]} numberOfLines={2}>{item.cpms}</Text>
                </TouchableOpacity>

            </View>
        )
    }
    ListHeaderComponent = () => {
        const { fields } = this.props;
        return (
            <View style={styles.header}>
                <Text style={[styles.headerText, styles.wduibi]}>对比</Text>
                {
                    fields.map((item, i) => {
                        if (item.isShow) {
                            return (
                                <Text style={[styles.headerText, styles['w' + item.val]]}>{item.name}</Text>
                            )
                        }

                    })
                }

            </View>
        )
    }
    renderItem = ({ item, index }) => {
        const { that, navigation, fields } = this.props;

        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.wduibi}>
                    <Ionicons name={'ios-add-circle-outline'} size={24} color={'#999'} />
                </TouchableOpacity>
                {
                    fields.map((list, j) => {
                        if (list.isShow) {
                            if (list.val == 'cpms') {
                                return (
                                    <TouchableOpacity key={j} onPress={() => {
                                        navigation.navigate('LicaiDetail', { id: item.id, })
                                    }}>
                                        <Text style={[styles.itemText, styles.noikcpmsText, styles['w' + list.val], { opacity: 0, }]} numberOfLines={2}>{item[list.val]}</Text>
                                    </TouchableOpacity>
                                )
                            }
                            return (
                                <Text style={[styles.itemText, styles['w' + list.val]]} numberOfLines={1}>
                                    {item[list.val] !== '' && item[list.val] !== 'N/A' ? (item[list.val] + '').indexOf("/Date") == -1 ? item[list.val] : Util.formatDate2(item[list.val]) : '--'}
                                </Text>
                            )
                        }

                    })
                }

            </View>
        )
    }
    ListEmptyComponent = () => {
        return (
            <Text>暂无数据</Text>
        )
    }

    _onScroll = (e) => {
        var offsetX = e.nativeEvent.contentOffset.x;
        if (offsetX > 0) {
            this.setState({
                isFixed: true
            })
        }
        else {
            this.setState({
                isFixed: false
            })
        }
    }

    onRefresh = () => {
        const { that } = this.props;
        that.getData(3)
    }
    getMore = () => {
        const { that } = this.props;
        that.getData(2)
    }
}
const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
    },
    container: {
        flexDirection: 'row',
        position: 'relative',
        minWidth: Theme.screenWidth,
    },
    leftContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 99,
        backgroundColor: '#fff',
    },
    rightContainer: {
        flex: 1,
    },
    fixed: {
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        paddingRight: 10,
        color: '#999',
        fontSize: 12,
    },
    itemText: {
        paddingRight: 10,
        lineHeight: 16,
        fontSize: 12,
        color: '#666',
    },
    noikcpmsText: {
        color: '#101010',
    },
    wduibi: {
        width: 40,
    },
    wcpms: {
        width: 150,
    },
    wmjjsrq: {
        width: 90,
    },
    wqxms: {
        width: 90,
    },
    wyjbjjz: {
        width: 110,
    },
    wfxjgms: {
        width: 150,
    },
    wcpdjbm: {
        width: 120,
    },
    wmjfsms: {
        width: 65,
    },
    wcplxms: {
        width: 100,
    },
    wcptzxzms: {
        width: 90,
    },
    wmjbz: {
        width: 90,
    },
    wfxdjms: {
        width: 75,
    },
    wmjqsrq: {
        width: 90,
    },
    wcpqsrq: {
        width: 90,
    },
    wcpyjzzrq: {
        width: 90,
    },
    wkfzqqsr: {
        width: 90,
    },
    wkfzqjsr: {
        width: 90,
    },
    wcpqx: {
        width: 85,
    },
    wcsjz: {
        width: 65,
    },
    wcpjz: {
        width: 65,
    },
    wljjz: {
        width: 65,
    },
    wsyl: {
        width: 145,
    },
    wcpsylxms: {
        width: 100,
    },
    wtzlxms: {
        width: 95,
    },
    wyjkhzgnsyl: {
        width: 120,
    },
    wyjkhzdnsyl: {
        width: 120,
    },
})
