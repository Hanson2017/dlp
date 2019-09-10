import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class Item extends Component {
    render() {
        const {data,navigation} = this.props;
        return (
            <TouchableOpacity style={styles.item} activeOpacity={0.6} onPress={() => {
                navigation.navigate('LoanDetail',{id:data.id,proname:data.proname})
            }}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderText}>{data.proname}</Text>
                </View>
                <View style={styles.itemBody}>
                    <View style={styles.itemBodyLeft}>
                        <Text style={styles.itemText}>额度范围（元）</Text>
                        <Text style={styles.eduText}>{data.amount_min}-{data.amount_max}</Text>
                    </View>
                    <View style={styles.itemBodyRight}>                      
                        <Text style={styles.itemText}>月费率{data.rate_month}%</Text>
                        <Text style={styles.itemText}>贷款期限{data.term_min}-{data.term_max}{data.term_unit == '月'?'个':null}{data.term_unit}</Text>
                        <Text style={styles.itemText}>{data.tags}</Text>
                    </View>
                    <View style={styles.itemBodyBtnWp}>
                        <View style={styles.itemBodyBtn}>
                            <Text style={styles.itemBodyBtnText}>申请借款</Text>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 10,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
    },
    itemHeader: {
        height: 30,
    },
    itemHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemBody: {
        flexDirection: 'row',
    },
    itemBodyLeft: {
        width: (width - 130) / 2,
    },
    itemBodyRight: {
        paddingLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#f2f2f2',
        width: (width - 130) / 2,
    },
    itemText: {
        lineHeight: 22,
        color: '#999',
        fontSize: 13,
    },
    eduText: {
        marginTop: 10,
        color: '#e6397d',
        fontSize: 18,
    },
    itemBodyBtnWp: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    itemBodyBtn: {
        borderRadius:4,
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e86863',
    },
    itemBodyBtnText: {
        color: '#e86863',
    }
})