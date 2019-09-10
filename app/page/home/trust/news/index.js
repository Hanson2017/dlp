import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../../util/util';
import Title from '../../title/index';

export default class NewsComponent extends React.Component {

    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container]}>
                <Title titleText={'最新新闻'} navigation={navigation} />
                <View style={styles.newsList}>
                    {
                        data.map((item, i) => {
                            return (
                                <TouchableOpacity onPress={() => { navigation.navigate('TrustNews_detail', { id: item.id }) }} style={[styles.newsItem, data.length - 1 == i ? styles.notBt : null]} activeOpacity={0.6} key={i}>
                                    <Text style={styles.newsTitle} numberOfLines={1}>{item.title}</Text>
                                    <Text style={styles.newsDate}>{Util.formatDate2(item.updatetime)}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    newsList: {
        paddingLeft: 17,
    },
    newsItem: {
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    notBt: {
        borderBottomWidth: 0,
    },
    newsTitle: {
        paddingRight: 10,
        flex: 1,
        fontSize: 12,
        color: '#666',
    },
    newsDate: {
        fontSize: 12,
        color: '#bbb',
    },
})