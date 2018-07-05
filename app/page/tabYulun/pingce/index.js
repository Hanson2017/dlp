import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';


export default class Report extends React.Component {

    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'热门评测'} navigation={navigation} screenUrlInfo={{ screenUrl: 'PingCe', tabId: 0 }} />
                <View style={styles.reportContainer}>
                    {
                        data.map((item, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    style={[styles.list, data.length - 1 == i ? { borderBottomWidth: 0 } : null]}
                                    onPress={() => { navigation.navigate('PingCeDetail', { id: item.id }) }}
                                >
                                    <Text style={styles.titleText}>{item.title}</Text>
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
    reportContainer: {
        paddingLeft: 17,
        paddingBottom: 15,
    },
    list: {
        paddingRight:10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleText: {
        lineHeight: 18,
        color: '#101010',
        fontSize: 14,
    }
})