import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Title from '../../title/index';

export default class HomeTrustTop5Component extends React.Component {

    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container]}>
                <Title titleText={'TOP5排名'} />  
                <View style={styles.trustList}>
                    <View style={styles.trustListHeader}>
                        <Text style={[styles.trustListtHeaderText,styles.wPaiming]}>排名</Text>
                        <Text style={[styles.trustListtHeaderText,styles.wName]}>信托公司名称</Text>
                        <Text style={[styles.trustListtHeaderText,styles.wJly]}>2018净利润</Text>
                        <Text style={[styles.trustListtHeaderText,styles.wYysr]}>营业收入</Text>
                        <Text style={[styles.trustListtHeaderText,styles.wZzc]}>总资产</Text>
                    </View>
                    <View style={styles.trustListBody}>
                        {
                            data !== null && data.length>0?
                            data.map((item,i)=>{
                                return(
                                    <TouchableOpacity style={styles.item} key={i} onPress={()=>{ navigation.push('TrustDetail',{ id: item.id,name:item.trust_name })}}>
                                        <Text style={[styles.itemText,styles.wPaiming]}>{i+1}</Text>
                                        <Text style={[styles.itemText,styles.wName]} numberOfLines={1}>{item.trust_name}</Text>
                                        <Text style={[styles.itemText,styles.wJly]}>{item.profit_sum}(亿)</Text>
                                        <Text style={[styles.itemText,styles.wYysr]}>{item.incom_sum}(亿)</Text>
                                        <Text style={[styles.itemText,styles.wZzc]}>{item.assets_sum}(亿)</Text>
                                    </TouchableOpacity>
                                )
                            })
                            :
                            null
                        }
                        
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    trustList:{
        marginTop:15,
        paddingLeft:17,
    },
    trustListHeader:{
        flexDirection:'row',
        alignItems:'center',
    },
    trustListtHeaderText:{
        fontSize:12,
        color:'#bbb',
    },
    wPaiming:{
     width:40,   
    },
    wName: {
        width: 90,
    },
    wJly: {
        width: 80,
    },
    wYysr: {
        width: 70,
    },
    item:{
        height:40,
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:1,
        flexDirection:'row',
        alignItems:'center',
    },
    notBt:{
        borderBottomWidth:0,
    },
    itemText:{
        fontSize:12,
        color:'#666',
    },
    itemText2:{
        color:'#999',
    },
})