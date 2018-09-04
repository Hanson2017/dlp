import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../comment/item';

export default class Report extends React.Component {

    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'平台点评'} navigation={navigation} screenUrlInfo={{ screenUrl: 'CommentPlat', tabId: null }} />
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
    reportContainer: {
        paddingLeft: 17,
        paddingBottom: 15,
    }
})