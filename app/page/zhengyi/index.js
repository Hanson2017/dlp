import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Theme from '../../util/theme';
import Header from '../../component/navBar'
import List from '../black/temp/list'
import All from './temp/index'

import Update from '../query/temp/update';

export default class ZhengyiScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            upDateTime: '',
        };
    }
    changeTotalNum(totalNum) {
        this.setState({
            totalNum: totalNum
        })
    }
    changeUpDateTime(upDateTime) {
        this.setState({
            upDateTime: upDateTime
        })
    }
    render() {
        const {navigation} = this.props;
        const {totalNum,upDateTime}=this.state;
        return (
            <View style={[Theme.container, { backgroundColor: '#1A1A1A' }]}>

                <Header headerOpt={{ back: '争议', title: '争议平台' }} navigation={navigation} black={true} />
                <View style={styles.update}>
                    <Text style={styles.updateText}>更新时间：{upDateTime}</Text>
                    <Text style={[styles.updateText,{paddingLeft:10,paddingRight:10}]}>|</Text>
                    <Text style={styles.updateText}>共{totalNum}家争议平台</Text>
                </View>
                <View style={styles.content}>
                    <List
                        navigation={navigation}
                        changeTotalNum={this.changeTotalNum.bind(this)}
                        changeUpDateTime={this.changeUpDateTime.bind(this)}
                        itemRow={All}
                        type={{ column: 'zhengyi', type: 'all', dataName: 'dataList' }}
                        ctype={'zhengyi'}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content:{
        paddingTop:5,
        flex:1,
        backgroundColor: '#fff',
    },
    update:{
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText:{
        fontSize:10,
        color:'#707070',
    },

})


