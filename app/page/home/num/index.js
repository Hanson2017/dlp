import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../util/theme';

export default class Num extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box]}>
                <TouchableOpacity style={styles.list}
                    onPress={() => { navigation.navigate('PingjiJG') }}
                >
                    <Text style={[styles.text, styles.label]}>正常运营</Text>
                    <Text style={[styles.text, styles.num]}>{data.Maincount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.list}
                    onPress={() => { navigation.navigate('Data') }}
                >
                    <Text style={[styles.text, styles.label]}>数据监控</Text>
                    <Text style={[styles.text, styles.num]}>{data.Maincount_grade}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.list}
                    onPress={() => {

                        if (versionStatus != 1) {
                            navigation.navigate('Fund', { tabId: null })
                        }
                    }}
                >
                    <Text style={[styles.text, styles.label]}>示范出借</Text>
                    <Text style={[styles.text, styles.num]}>{data.Maincount_fund}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.list}
                    onPress={() => { navigation.navigate('PingjiJG') }}
                >
                    <Text style={[styles.text, styles.label]}>评级监控</Text>
                    <Text style={[styles.text, styles.num]}>{data.Maincount_flow}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.list}
                    onPress={() => { navigation.navigate('GongshangBG') }}
                >
                    <Text style={[styles.text, styles.label]}>工商监控</Text>
                    <Text style={[styles.text, styles.num]}>{data.Maincount_gongshang}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.list}
                    onPress={() => { navigation.navigate('Zhengyi') }}
                >
                    <Text style={[styles.text, styles.label]}>争议平台</Text>
                    <Text style={[styles.text, styles.num, { color: '#A81616' }]}>{data.Maincount_negative}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.list}
                    onPress={() => { navigation.navigate('Black') }}
                >
                    <Text style={[styles.text, styles.label]}>黑名单</Text>
                    <Text style={[styles.text, styles.num, { color: '#101010' }]}>{data.Maincount_black}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',

        width: (Theme.screenWidth - 20) / 4,

    },
    text: {
        fontSize: 10,
        lineHeight: 18,
    },
    label: {
        paddingRight: 4,
        color: '#999',
    },
    num: {
        color: Theme.color
    }
})