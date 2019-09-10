import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title/index';
import Base from './base';
import List from './list'

export default class HomeLicaiComponent extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'银行理财概况'} navigation={navigation}  screenUrlInfo={{ screenUrl: 'LicaiList', tabId: null }} />
                <Base data={data.base} />
                <List data={data.list} navigation={navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingBottom:10,
    },  
})