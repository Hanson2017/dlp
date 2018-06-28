import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';

export default class Data extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'多维度分析'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Query', tabId: { tab1: 0, tab2: 0 } }} />
                <View style={styles.queryContainer}>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => { navigation.navigate('Query', { tabId: { tab1: 0, tab2: 0 } }) }}
                    >
                        <Text style={styles.btnText}>按背景</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => { navigation.navigate('Query', { tabId: { tab1: 1, tab2: 0 } }) }}
                    >
                        <Text style={styles.btnText}>按业务类型</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => { navigation.navigate('Query', { tabId: { tab1: 2, tab2: 0 } }) }}
                    >
                        <Text style={styles.btnText}>按地区</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => { navigation.navigate('Query', { tabId: { tab1: 3, tab2: 0 } }) }}
                    >
                        <Text style={styles.btnText}>按上线时间</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => { navigation.navigate('Query', { tabId: { tab1: 4, tab2: 0 } }) }}
                    >
                        <Text style={styles.btnText}>按银行存管</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    queryContainer: {
        paddingLeft: 17,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
    },
    btn: {
        marginRight: 19,
    },
    btnText: {
        fontSize: 12,
        color: '#666',
    }
})