import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class ZonglanFlow extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'流量监控'} navigation={navigation} />
                {
                    data !== null ?
                        <View style={styles.content}>
                            <View style={styles.top}>
                                <View style={styles.topLeft}>
                                    <View style={styles.topList}>
                                        <Text style={styles.topLabelText}>流量综合指数</Text>
                                        <Text style={styles.topLabelScore}>{data.score}</Text>
                                    </View>
                                    <View style={[styles.topList,{marginTop:6,}]}>
                                        <Text style={[styles.topText,styles.topTextBj]}>较上月</Text>
                                        <Icon name={data.changnum >=0 ?'up':'down'} size={11} color={data.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                        <Text style={styles.topText}>4.31%</Text>
                                    </View>

                                </View>
                                <View style={styles.topRight}>
                                    <View style={[styles.topList]}>
                                        <Text style={styles.topLabelText}>流量排名</Text>
                                        <Text style={styles.topLabelScore}>{data.ordernum}</Text>
                                    </View>
                                    <View style={{marginTop:6,}}>
                                        <Text style={styles.topLabelText}>在统计的{data.totalNum}家平台中</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    content: {
        paddingBottom: 15,
    },
    top:{
        marginBottom:10,
        paddingTop:20,
        paddingLeft:17,
        flexDirection: 'row',   
    },
    topList:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    topLeft:{
        width: Theme.screenWidth >= 375 ? 190 : 165,
    },
    topLabelText:{
        paddingRight:6,
        fontSize:12,
        color:'#999',
    },
    topLabelScore:{
        width:70,
       
        fontSize:18,
        color:'#333',
        fontWeight:'bold',
    },
    
    topText:{
        fontSize:11,
        color:'#999',
    },
    topTextBj:{
        paddingRight:6,
        paddingLeft:31,
        fontSize:12,
    },
    null:{
        padding:17,
        fontSize:14,
        color:'#ccc',
    },

})