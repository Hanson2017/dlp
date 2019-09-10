import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../../../util/util';
import Theme from '../../../../../util/theme';
import Title from '../../../../../component/title';

class List extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <TouchableOpacity style={styles.list}
                onPress={() => { navigation.navigate('TrustNews_detail',{id:data.id}) }}
            >
                <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                <Text style={styles.dateTime}>{Util.formatDate2(data.updatetime)}</Text>
            </TouchableOpacity>
        )
    }
}


export default class TrustDetailZonglanYulun extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'舆论监控'} navigation={navigation} />
                <View style={styles.listContainer}>
                    {
                        data !== '' && data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <List key={i} data={item} navigation={navigation} />
                                )
                            })
                            :
                            <Text style={styles.null}>暂无数据</Text>
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingTop: 10,
        paddingLeft: 17,
    },
    list: {
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 46,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        flex: 1,
        fontSize: 14,
        color: '#101010',
    },
    dateTime: {
        paddingLeft: 15,
        fontSize: 11,
        color: '#bbb',
    },
    null: {
        padding: 17,
        paddingLeft: 0,
        fontSize: 14,
        color: '#ccc',
    },
})