import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Theme from '../../../../../util/theme';

import Guquan from './guquan';
import Biangeng from './biangeng';
import Renyuan from './renyuan';
import Shouyiren from './shouyiren';

export default class Gudong extends React.Component {
    
    render() {
        const { data, navigation } = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Guquan data={data.gudong} />
                <Biangeng data={data.changelist} navigation={navigation} />
                <Renyuan data={data.renyuan} />
                <Shouyiren data={data.shouyirenlist} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bgColor,
    },
    
})