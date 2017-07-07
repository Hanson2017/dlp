import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Title from '../../component/Title';
import Item from '../../component/ItemFlmf';

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
    }
})