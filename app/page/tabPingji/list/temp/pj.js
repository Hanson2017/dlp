import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../../../css/listData';
import Theme from '../../../../util/theme';

export default class TabPingjiListPJ extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View>
                <View style={stylesList.headerRow}>
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.headerRowText, styles.td1]}>综合指数</Text>
                    <Text style={[stylesList.headerRowText, styles.td2]}>之家</Text>
                    <Text style={[stylesList.headerRowText, styles.td3]}>天眼</Text>
                    <Text style={[stylesList.headerRowText, styles.td4]}>贷罗盘</Text>
                    <Text style={[stylesList.headerRowText, styles.td5]}>融360</Text>
                    <Text style={[stylesList.headerRowText, styles.td6]}>羿飞</Text>
                    <Text style={[stylesList.headerRowText, styles.td7]}>远望</Text>
                </View>
                {
                    data.map((item, i) => {
                        return (
                            <View style={stylesList.itemRowNone} key={i} >
                                <TouchableOpacity style={{ flexDirection: 'row', }}
                                     onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name}) }}
                                >
                                    <Text style={[stylesList.tdID, stylesList.firstName]}></Text>
                                    <Text style={[stylesList.tdName, stylesList.C2D3640]}></Text>
                                    <View style={[stylesList.tdUp, styles.td1]}>
                                        <Text style={[stylesList.firstName, { width: 45 }]}>{item.score} </Text>
                                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                    </View>
                                    <Text style={[stylesList.CABB7C4, styles.td2]}>{item.score_wdzj != 0 ? item.score_wdzj : '暂无'}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td3]}>{item.score_p2peye != 0 ? item.score_p2peye : '暂无'}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td4]}>{item.score_dlp != 0 ? item.score_dlp : '暂无'}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td5]}>{item.level_r360 != null ? item.level_r360 : '暂无'}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td6]}>{item.score_yifei != '' ? item.score_yifei : '暂无'}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td7]}>{item.level_yuanwang != '' ? item.level_yuanwang : '暂无'}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    td1: {
        width: (Theme.screenWidth - 150) * 0.4,
    },
    td2: {
        width: (Theme.screenWidth - 150) * 0.27,
    },
    td3: {
        width: (Theme.screenWidth - 150) * 0.27,
    },
    td4: {
        width: 80,
    },
    td5: {
        width: 80,
    },
    td6: {
        width: 80,
    },
    td7: {
        width: 60,
    },
})