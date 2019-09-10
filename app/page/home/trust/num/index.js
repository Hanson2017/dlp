import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

export default class HomeTrustNumComponent extends React.Component {

    render() {
        const { data } = this.props;
        return (
            <View style={[styles.container]}>
                <View style={styles.item}>
                    <Text style={[styles.label,styles.labelAll]}>持牌信托公司总数</Text>
                    <View style={styles.num}>
                        <Text style={[styles.numText,styles.numAllText]}>{data.allnum}</Text>
                        <Text style={styles.numTText}>家</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={[styles.label]}>政府背景</Text>
                    <View style={styles.num}>
                        <Text style={styles.numText}>{data.back_zf}</Text>
                        <Text style={styles.numTText}>家</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={[styles.label]}>民营背景</Text>
                    <View style={styles.num}>
                        <Text style={styles.numText}>{data.back_my}</Text>
                        <Text style={styles.numTText}>家</Text>
                    </View>
                </View>
                <View style={styles.item}>
                    <Text style={[styles.label]}>其他背景</Text>
                    <View style={styles.num}>
                        <Text style={styles.numText}>{data.back_qt}</Text>
                        <Text style={styles.numTText}>家</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginLeft:17,
        marginBottom:10,
        paddingTop:15,
        paddingBottom:10,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
    },   
    item:{
       marginRight:20,
    },
    label:{
        height:24,
        justifyContent:'center',
        fontSize:12,
        color:'#999',
    }, 
    labelAll:{
        fontSize:14,
        color:'#666',
    },
    num:{
        height:30,
        flexDirection:'row',
        alignItems:'center',
    },
    numText:{
        paddingRight:4,
        fontSize:20,
        color:'#333',
    },
    numAllText:{
        fontSize:28,
        fontWeight:'bold',
    },
    numTText:{
        fontSize:12,
        color:'#999',
    },
})