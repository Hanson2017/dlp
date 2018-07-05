import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';

import Theme from '../../../../util/theme'
import Util from '../../../../util/util'
import Loading from '../../../../component/loading';
import Title from '../../../../component/title';

import PingceItem from '../pingce/item';
import YulunItem from '../yulun/item';
import CommentItem from '../../../comment/item/index2';


export default class YulunScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSource: [],
        }
    }
    render() {
        const { navigation } = this.props;
        const { loading, dataSource } = this.state;
        if (loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={Theme.box}>
                        <Title data={'评测监控'} />
                        <View style={styles.content}>
                            {
                                dataSource.mplist != null && dataSource.mplist.length > 0 ?
                                    dataSource.mplist.map((item, i) => {
                                        return (
                                            <PingceItem key={i} item={item} navigation={navigation} />
                                        )
                                    })
                                    :
                                    <Text style={styles.null}>暂无数据</Text>
                            }
                        </View>
                    </View>
                    <View style={[Theme.box, Theme.mt10]}>
                        <Title data={'舆论监控'} />
                        <View style={styles.content}>
                            {
                                dataSource.sentlist != null && dataSource.sentlist.length > 0 ?
                                    dataSource.sentlist.map((item, i) => {
                                        return (
                                            <YulunItem key={i} item={item} navigation={navigation} />
                                        )
                                    })
                                    :
                                    <Text style={styles.null}>暂无数据</Text>
                            }
                        </View>
                    </View>
                    <View style={[Theme.box, Theme.mt10]}>
                        <Title data={'点评监控'} />
                        <View style={styles.content}>
                            {
                                dataSource.commentlist != null && dataSource.commentlist.length > 0 ?
                                    dataSource.commentlist.map((item, i) => {
                                        return (
                                            <CommentItem data={item} key={i} navigation={navigation} leftNo={true} />
                                        )
                                    })
                                    :
                                    <Text style={styles.null}>暂无数据</Text>
                            }
                        </View>
                    </View>

                </ScrollView>
            )
        }

    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'yuqing', id)
    }
}
const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: Theme.bgColor,
    },
    content: {
        paddingLeft: 17,
    },
    null: {
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 13,
        color: '#bbb',
    },
})