import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Title from '../../component/Title';

export default class Comment extends React.Component {
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
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                    </View>
                    <Title  titleText={'网友评论'} />
                    {
                        this.state.dataSource != null && this.state.dataSource.length > 0 ?
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={this.renderItem.bind(this)}
                            />
                            :
                            <Text style={styles.null}>暂无舆论</Text>
                    }

                </View>
            )
        }
    }

    renderItem({ item, index }) {
        let source;
        if (item.type == '1') {
            source = require('../../../resources/images/good.png');
        }
        else if (item.type == '2') {
            source = require('../../../resources/images/average.png');
        }
        else {
            source = require('../../../resources/images/bad.png');
        }
        return (
            <View style={styles.list} key={index}>
                <View style={styles.hd}>
                    <Text style={styles.name} numberOfLines={1}>{item.username}</Text>
                    <Image source={source} style={{ width: 16, height: 16 }} />
                </View>


                <Text style={styles.listCon}>{item.content}</Text>
            </ View>
        )

    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'comment', id)
    }


}

const styles = StyleSheet.create({
   
    list: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    hd: {
        flexDirection: 'row',
    },
    name: {
        width: 100,
    },
    listTitle: {
        color: '#333',
    },
    listCon: {
        lineHeight: 20,
        marginTop: 6,
        color: '#ccc',
    },
    null: {
        padding: 10,
        color: '#ccc',
    }
})