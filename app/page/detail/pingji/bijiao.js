import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

class BarLine extends React.Component {
    render() {
        let dataText = this.props.dataText;
        let dataName = this.props.dataName;
        let height = this.props.height;
        return (
            <View style={[styles.BarChar]}>
                <Text style={[styles.BarCharText, this.props.isPlat ? styles.BarCharPlatText : null]}>{dataName}</Text>
                <Text style={[styles.BarCharText, this.props.isPlat ? styles.BarCharPlatText : null]}>{dataText}</Text>
                <View style={[styles.Progress, this.props.isPlat ? styles.ProgressPlat : null, { height: 180 * height }]}></View>
            </View>
        )
    }

}

export default class Bijiao extends React.Component {
    render() {
        let xdata = [this.props.platName, '行业平均', '行业最高', '行业最低']
        let data;
        if (this.props.data != '') {
            data = this.props.data.split(',');
        }
        return (
            <ScrollView>
                {
                    this.props.data != '' ?
                        < View style={styles.echartsWp}>
                            <View style={styles.BarChartBox}>
                                <BarLine dataText={data[0]} dataName={'陆金所'} isPlat={true} height={data[0]/data[2]} />
                                <BarLine dataText={data[1]} dataName={'行业平均'}  height={data[1]/data[2]} />
                                <BarLine dataText={data[2]} dataName={'行业最高'}  height={data[2]/data[2]} />
                                <BarLine dataText={data[3]} dataName={'行业最低'}  height={data[3]/data[2]} />
                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }

            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    echartsWp: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    null: {
        paddingTop: 10,
        paddingLeft: 10,
        color: '#ccc'
    },
    BarChartBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    BarChar: {
        marginRight: 10,
         marginLeft: 10,
        height: 250,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    BarCharPlat: {

    },
    Progress: {
        marginTop: 8,
        width: 50,
        height: 160,
        backgroundColor: '#ccc',
    },
    ProgressPlat: {
        backgroundColor: '#2da9d7',
    },
    BarCharText: {
        fontSize: 13,
        color: '#ccc',
    },
    BarCharPlatText: {
        color: '#2da9d7',
    }
})