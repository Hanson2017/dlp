import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from './item';


export default class Fund extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'示范投资'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Fund', tabId: null }} />
                <View style={styles.fundContainer}>
                    <Item typeNo={1} type={'稳健型'} navigation={navigation} data={data.Listfund1} />
                    <Item typeNo={2} type={'平衡型'} navigation={navigation} data={data.Listfund2} />
                    <Item typeNo={3} type={'收益型'} navigation={navigation} data={data.Listfund3} borderBottomNot={true} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
    },
    fundContainer: {
        paddingLeft: 17,
        paddingRight: 17,
    },
   
})