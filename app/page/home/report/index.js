import React, { Component } from 'react';
import { Text, StyleSheet, View,} from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../report/item';

export default class HomeReport extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'数据报表'} navigation={navigation} screenUrlInfo={{ screenUrl: 'ReportsList', tabId: null }} />
                <View style={styles.reportContainer}>
                    {
                        data.map((item, i) => {
                            return (
                                <Item data={item} key={i} navigation={navigation} borderNot={data.length - 1 == i ? true : false} />
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
        paddingBottom: 10,
    },
    reportContainer: {
        paddingLeft: 17,
    },

})