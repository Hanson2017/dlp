import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import Loading from '../../component/Loading';
import Util from '../../util/util'
import Theme from '../../util/theme'
import stylesList from '../../css/listData';

export default class BlackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            dataSourceTab: [],
            tabList: [],
            totalNum: null,
            updatetime: null,
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
            return (
                <ScrollView>
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
                                                dataSourceTab: dataSource[i]
                                            })
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
                            <Text style={{ color: '#ccc' }}>
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
                                                <Text style={{ color: '#ccc' }}>{tab.score != 0 && tab.score != '' ? '（' + tab.score + '）' : null}</Text>
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
        Util.getDataListTab(this, this.props.type)
    }

}
const styles = StyleSheet.create({
    listTab: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 10,
    },
    tab: {
        height: 24,
        width: 50,
        marginBottom: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#14191e'
    },
    tabActive: {
        backgroundColor: '#14191e',
    },
    tabText: {
        color: '#333',
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
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listName: {
        marginBottom: 10,
        paddingRight: 0,
        width: (Theme.screenWidth-20)/3,
        height: 22,
    },
    listNameText: {
        color: '#666',
        fontSize: 12
    }
})
