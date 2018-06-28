import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';

import stylesList from '../../../css/listData';

export default class BlackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSource: [],
            dataSourceTab: [],
            tabList: [],
            totalNum: null,
            updatetime: null,
            tablNum: 0,
            tabName: '',
        };
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            let dataSource = this.state.dataSource;
            let dataSourceTab = this.state.dataSourceTab;
            let tabNameFj = '';
            switch (this.props.tabIndex) {
                case 2:
                    tabNameFj = '省';
                    break;
                case 3:
                    tabNameFj = '年';
                    break;
                default:
                    break;
            }
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                    </View>
                    <View style={styles.listTab}>
                        {
                            dataSource.map((tab, i) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.tab, dataSource[i].name == dataSourceTab.name ? styles.tabActive : null, this.props.tabWidth ? this.props.tabWidth : null]}
                                        key={i}
                                        activeOpacity={0.4}
                                        onPress={() => {
                                            this.setState({
                                                dataSourceTab: dataSource[i],
                                                tablNum: dataSource[i].count
                                            })
                                            this.props.changeTotalNum(dataSource[i].name + tabNameFj, dataSource[i].count, this.props.tabIndex)
                                        }}>
                                        <Text style={[styles.tabText, , dataSource[i].name == dataSourceTab.name ? styles.tabTextActive : null]}>
                                            {tab.name}{this.props.titleText ? this.props.titleText : null}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={styles.listContent}>
                        <View style={styles.listTitle}>
                            <Text style={styles.listTitleText}>
                                {dataSourceTab.name}{this.props.titleText ? this.props.titleText : null}（{dataSourceTab.count}家）
                            </Text>
                        </View>
                        <View style={styles.list}>
                            {
                                dataSourceTab.list.map((tab, i) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.listName} key={i}
                                            onPress={() => { this.props.navigation.navigate('Detail', { id: tab.id_dlp, platName: tab.plat_name }) }}
                                        >
                                            <Text style={styles.listNameText} numberOfLines={1}>{tab.plat_name}
                                                <Text style={styles.scoreText}>{tab.score != 0 && tab.score != '' ? '（' + tab.score + '）' : null}</Text>
                                            </Text>

                                        </TouchableOpacity>
                                    )
                                })

                            }
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }
    componentDidMount() {
        const tabN = this.props.tabN ? this.props.tabN : 0;
        Util.getDataListTab(this, this.props.type, tabN)
        console.log(this.props.tab222)
    }
    componentWillReceiveProps(nextProps){
       
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        const tabN = this.props.tabN ? this.props.tabN : 0;
        Util.getDataListTab(this, this.props.type, tabN)
    }
}
const styles = StyleSheet.create({
    listTab: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
        marginLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tab: {
        height: 24,
        width: 50,
        marginBottom: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 6,
    },
    tabActive: {
        backgroundColor: Theme.color,
        borderColor: Theme.color,
    },
    tabText: {
        color: '#bbb',
        fontSize: 12,
    },
    tabTextActive: {
        color: '#fff',
    },
    listContent: {
        paddingLeft: 10,
    },
    listTitle: {
        marginTop: 20,
        marginBottom: 15,
    },
    listTitleText: {
        color: '#A1A1A1',
        fontSize: 12,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listName: {
        marginBottom: 10,
        paddingRight: 0,
        width: (Theme.screenWidth - 20) / 3,
        height: 22,
    },
    listNameText: {
        color: '#707070',
        fontSize: 11
    },
    scoreText: {
        color: '#A1A1A1',
        fontSize: 11
    }
})
