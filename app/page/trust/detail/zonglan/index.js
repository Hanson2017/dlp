import React, { Component } from 'react';
import { Text, StyleSheet,View, ScrollView} from 'react-native';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Top from './top';
import Pingji from './pingji'
import Yulun from './yulun';
import Gudong from '../info/gudong/guquan';
import GongshangBG from '../info/gudong/biangeng';
import Shouyiren from '../info/gudong/shouyiren';

export default class TrustDetailZonglan extends React.Component {
    
    render() {
        const { data ,navigation} = this.props;
        return (
            <ScrollView>
                <Top data={data.trinfo} />
                <Pingji data={data} />
                <Yulun navigation={navigation} data={data.mplist} />
                <View style={Theme.mt10}>
                    <Gudong data={data.gudong} />
                </View>                
                <GongshangBG data={data.changelist} navigation={navigation} />
                <Shouyiren data={data.shouyirenlist} />
            </ScrollView>
        )


    }
}