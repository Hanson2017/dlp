import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Echarts from 'native-echarts';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import LineEcharts from '../../../echarts/line';


export default class Pingce extends React.Component {
    constructor(props){
        super(props);
        this.state={
            echartDate:[],
            echartDataListLong:[],
            echartDataListShort:[]
        }
    }
    componentWillMount(){
        const { data } = this.props;
        const echartDate=[];
        const echartDataListLong=[];
        const echartDataListShort=[];

        for(let i=0;i<data.indexlist.length;i++){
            echartDate.push(Util.setDate3(new Date(data.indexlist[i].date_str)))
            echartDataListLong.push(data.indexlist[i].index_long)
            echartDataListShort.push(data.indexlist[i].index_short)
        }
        this.setState({
            echartDate:echartDate,
            echartDataListLong:echartDataListLong,
            echartDataListShort:echartDataListShort
        })
    }
    render() {
        const { data, navigation } = this.props;
        const {echartDate,echartDataListLong,echartDataListShort}=this.state;
        
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'银行理财产品'} navigation={navigation} screenUrlInfo={{ screenUrl: 'LicaiList', tabId: null }} />
                <View style={styles.licaiContainer}>
                    <View style={styles.licaiTitle}>
                        <Text style={styles.titleText}>平均收益率</Text>
                        <Text style={styles.source}>[数据来源: 中国理财网]</Text>
                    </View>
                    <Text style={styles.zhishu}>短期限平均年化收益率为{data.lc_short.toFixed(2)};中长期平均年化收益率为{data.lc_long.toFixed(2)}。</Text>
                    <View style={styles.echartsContainer}>
                        <Echarts option={LineEcharts.line4(['短期理财产品','中长期理财产品'],echartDate,echartDataListShort,echartDataListLong)} height={150} width={Theme.screenWidth*0.9} />
                    </View>
                    <View style={styles.licaiTitle}>
                        <Text style={styles.titleText}>收益前三</Text>
                    </View>
                    <View style={styles.rankList}>
                        {
                            data.topbank.map((item, i) => {
                                return (
                                    <View key={i} style={styles.rankItem}>
                                        <View style={styles.rankItemIcon}>
                                            <Text style={styles.rankItemNum}>{i+1}</Text>
                                            <FontAwesome name={'certificate'} size={22} color={i===0?'#C19140':i===1?'#999':'#A65719'} />
                                        </View>
                                        <Text style={styles.rankItemText}>{item.bank_name}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    licaiContainer:{
        paddingTop:15,
        paddingLeft:18,
        paddingRight:15,
    },
    licaiTitle:{
        marginBottom:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    titleText:{
        fontSize:14,
        color:'#666',
        fontWeight:'bold',
    },
    source:{
        fontSize:11,
        color:'#bbb',
    },
    zhishu:{
        fontSize:12,
        color:'#666',
    },
    echartsContainer:{
        marginTop:10,
        marginBottom:15,
        justifyContent:'center',
        alignItems:'center',
    },
    rankItem:{
        marginBottom:6,
        flexDirection:'row',
        alignItems:'center',
    },
    rankItemIcon:{
        marginRight:3,
        position:'relative',
        zIndex:2,
        width:24,
        height:24,
        justifyContent:'center',
        alignItems:'center',
    },
    rankItemNum:{
        position:'absolute',
        top:5,
        left:9,
        zIndex:3,
        backgroundColor:rgb(255,0,255,0),
        fontSize:11,
        color:'#fff',
    },
    rankItemText:{
        fontSize:12,
        color:'#666', 
    },
})