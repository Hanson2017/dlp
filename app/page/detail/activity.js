import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Title from '../../component/Title';
import Item from '../../component/ItemFlmf';
import Theme from '../../util/theme';

export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
        }
    }
    render() {
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            let platActivity = this.state.dataSource.dataView;
            let otherActivity = this.state.dataSource.dataList;
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                    </View>
                    <ScrollView>
                        <Title titleText={'活动'} />
                        <View style={styles.listViewContent}>
                            {
                                platActivity.length > 0 ?
                                    platActivity.map((item, i) => {
                                        return (
                                            <Item data={{ item: item, index: i }} />
                                        )
                                    })
                                    :
                                    <Text style={styles.null}>暂无活动</Text>
                            }
                        </View>
                        <Title titleText={'活动APP下载'} />
                        <View style={[styles.listViewContent, { flexDirection: 'column' }]}>
                            <View><Text style={styles.appdownText}>参加平台活动我们推荐使用 返利魔方APP</Text></View>
                            <TouchableOpacity style={styles.appdownBtn}
                                onPress={() => {
                                    let url = 'http://a.app.qq.com/o/simple.jsp?pkgname=org.zywx.wbpalmstar.widgetone.uex11575732';
                                    Util.Linked(url)
                                }}
                            >
                                <Text style={styles.appdownBtnText}>返利魔方APP下载</Text>
                            </TouchableOpacity>
                        </View>
                        <Title titleText={'其他热门活动'} />
                        <View style={styles.listViewContent}>
                            {
                                otherActivity.length > 0 ?
                                    otherActivity.map((item, i) => {
                                        return (
                                            <Item data={{ item: item, index: i }} />
                                        )
                                    })
                                    :
                                    <Text style={styles.null}>暂无活动</Text>
                            }
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderItem({ item, index }) {

    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'activity', id)
    }


}

const styles = StyleSheet.create({
    listViewContent: {
        paddingLeft: 10,
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    null: {
        paddingBottom: 10,
        color: '#ccc',
    },
    appdownText: {
        color: '#ABB7C4',
        fontSize: 13,
    },
    appdownBtn: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        width: (Theme.screenWidth - 30) / 2,
        backgroundColor: '#00a400',
    },
    appdownBtnText: {
        color: '#fff',
        fontSize: 13,
    }
})