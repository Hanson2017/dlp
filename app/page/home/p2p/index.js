import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title/index';
import Num from './num';
import News from './news';
import Dapan from './dapan';

export default class HomeP2PComponent extends React.Component {
    render() {
        const { data, navigation } = this.props;
        const homenum=data.homenum;

        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'网贷概况'} />
                <Num data={homenum} navigation={navigation} />                   
                <Dapan data={data} />
                <News navigation={navigation} data={data.news} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingBottom:10,
    },  
})