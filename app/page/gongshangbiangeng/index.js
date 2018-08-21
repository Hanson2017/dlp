import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../util/theme';
import Header from '../../component/navBar'
import List from '../black/temp/list'
import All from './temp/index'

export default class GongshangbiangengList extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <StatusBar
                    backgroundColor={'#1A1A1A'}
                    barStyle="light-content"
                />
                <View style={[Theme.container, { backgroundColor: '#1A1A1A' }]}>
                    <Header headerOpt={{ back: '工商变更监控', title: '工商变更监控' }} navigation={navigation} black={true} />
                    <View style={styles.content}>
                        <List
                            navigation={navigation}
                            itemRow={All}
                            type={{ column: 'gongshangList', type: 'all', dataName: 'dataList' }}
                            ctype={'gongshangList'}
                        />

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        flex: 1,
        backgroundColor: '#fff',
    }
})