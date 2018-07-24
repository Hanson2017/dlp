import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Theme from '../../util/theme';


export default class MianzeTab extends React.Component {
    render() {
        return (
            <View style={[styles.container,Theme.box,Theme.mt10]}>
                <View style={styles.title}><Text style={styles.titleText}>风险提示及免责声明</Text></View>
                <View style={styles.content}>
                    <Text style={styles.text}>1、贷罗盘仅为信息提供平台，贷罗盘不参与用户在任何网贷平台出借交易的过程，也不接受、不触碰、不吸纳任何用户的出借资金。</Text>
                    <Text style={styles.text}>2、贷罗盘仅提供各网贷平台的信息，不构成对任何网贷平台的安全性的评价或出借建议。任何平台都存在不同程度的出借风险，用户应自行、谨慎评估各平台的风险，自行决策是否出借，并自行承担全部风险。</Text>
                    <Text style={styles.text}>3、网贷平台如出现任何风险（包括但不局限于平台提现困难/逾期/倒闭/跑路等导致无法拿回本金的情况），贷罗盘均不承担任何责任。</Text>
                    <Text style={styles.text}>4、用户应合理、谨慎评估自己的风险承受能力，在自己的风险承受能力的范围内在平台进行出借。</Text>
                    <Text style={styles.text}>5、再次强调，网贷出借不是银行存款，具备一定风险性，存在出借本金无法收回的风险。任何风险由用户自行承担，贷罗盘均不承担任何责任。</Text>
                </View>
            </View>
        )
    }
    
}

const styles=StyleSheet.create({
    title:{
        paddingLeft:17,
        paddingTop:12,
        paddingBottom:12,
        borderBottomWidth:1,
        borderBottomColor:'#eee',
    },
    titleText:{
        fontSize:12,
        color:'#999',
    },
    content:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:17,
        paddingRight:17,
    },
    text:{
        lineHeight:17,
        fontSize:10,
        color:'#999',
    },
})