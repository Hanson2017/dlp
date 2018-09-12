import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class ZonglanFund2 extends React.Component {
    render() {
        const { navigation} = this.props;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'示范投资实盘'} screenUrlInfo={{ screenUrl: 'DetailFund' }} navigation={navigation}>
                    <View style={styles.typeCon}>
                        <View style={[styles.typeNum, styles.fundType1]}><Text style={styles.typeNumText}>1号</Text></View>
                        <Text style={styles.typeTxt}>稳健型</Text>
                    </View>
                </Title>
                <View style={styles.fundCon}>
                    <View style={styles.fundstate}>
                        <Text style={styles.fundstateText}>正常回款</Text>
                    </View>
                    <View style={styles.fundInfo}>
                        <View style={styles.fundInfoBodyHd}>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc1]}>投入本金</Text>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc2]}>在投项目</Text>
                            <Text style={[styles.fundInfoBodyHdText, styles.listIc3]}>本金到期</Text>
                        </View>
                        <View style={styles.fundInfoBodyBd}>
                            <Text style={[styles.fundInfoBodyBdText, styles.listIc1]}>￥30000</Text>
                            <Text style={[styles.fundInfoBodyBdText, styles.listIc2]}>定存宝B</Text>
                            <Text style={[styles.fundInfoBodyBdText, styles.listIc3]}>2019-08-23</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    typeCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeNum: {
        marginLeft: 8,
        marginRight: 4,
        width: 20,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    fundType1: {
        backgroundColor: Theme.fund1Color,
    },
    fundType2: {
        backgroundColor: Theme.fund2Color,
    },
    fundType3: {
        backgroundColor: Theme.fund3Color,
    },
    typeNumText: {
        fontSize: 10,
        color: '#fff',
    },
    typeTxt: {
        fontSize: 14,
        color: '#999',
    },
    fundCon:{
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundstate:{
        marginRight:15,
        width:75,
        height:47,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#15BE6E',
        borderRadius:8,
    },
    fundstateText:{
        fontSize:12,
        color:'#fff',
    },


    fundInfoBody: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 13,
    },
    fundInfoBodyHd: {
        flexDirection: 'row',
    },
    fundInfoBodyBd: {
        marginTop: 8,
        flexDirection: 'row',
    },
    fundInfoBodyHdText: {
        fontSize: 11,
        color: '#999',
    },
    fundInfoBodyBdText: {
        fontSize: 14,
        color: '#666',
    },
    listIc1: {
        width: 80,
    },
    listIc2: {
        width: 90,
    },
    listIc3: {
        width: Theme.screenWidth >= 375 ? 80 : 65,

    },
})

