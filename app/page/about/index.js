import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../util/theme';
import Header from '../../component/navBar';

export default class About extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '关于贷罗盘', title: '关于贷罗盘', search: true }} navigation={navigation} />
                    <View style={styles.top}>
                        <Image
                            style={styles.logo}
                            source={require('../../../resources/images/logoAbout.png')}
                        />
                        <Text style={styles.versionText}>版本号3.0.1</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.aboutCon}>
                            <Text style={styles.aboutConText}>贷罗盘成立于2015年，是专注网贷行业的数据平台。我们希望通过客观的数据展示，来协助用户进行投资理财决策。</Text>
                        </View>
                    </View>
                    <View style={styles.foot}>
                        <Text style={styles.footText}>官网: www.dailuopan.com</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    top: {
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.color2,
    },
    logo: {
        width: 100,
        height: 100,
    },
    versionText: {
        width:160,
        textAlign:'center',
        paddingTop: 10,
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
    },
    aboutCon: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    aboutConText: {
        fontSize: 14,
        color: '#1A1A1A',
        lineHeight: 20,
    },
    foot: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
    },
    footText: {
        fontSize: 12,
        color: '#999',
    },
})