import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';
import Item from '../../../comment/item/index';

export default class ZonglanComment extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'点评监控'} navigation={navigation} />
                <View style={styles.listContainer}>
                    {
                        data !== '' && data !== null && data.length > 0 ?
                            data.map((item, i) => {
                                return (
                                    <Item key={i} data={item} navigation={navigation} borderNot={data.length - 1 == i ? true : false} />
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
        paddingLeft: 17,
    },
    null: {
        padding: 17,
        paddingLeft: 0,
        fontSize: 14,
        color: '#ccc',
    },
})