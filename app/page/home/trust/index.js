import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title/index';
import Num from './num';
import Top5 from './top5';
import News from './news';

export default class HomeTrustComponent extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'信托概况'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Trust', tabId: null }} />
                <Num navigation={navigation} data={data.nums} />
                <Top5 navigation={navigation} data={data.list} />
                <News navigation={navigation} data={data.news} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
})