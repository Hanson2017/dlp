import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../../../css/listData';
import Theme from '../../../../util/theme';

export default class TabPingjiListFlow extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View>
                <View style={stylesList.headerRow}>
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.headerRowText, styles.td1]}>综合流量指数</Text>
                    <Text style={[stylesList.headerRowText, styles.td2]}>百度指数</Text>
                    <Text style={[stylesList.headerRowText, styles.td3]}>好搜指数</Text>
                    <Text style={[stylesList.headerRowText, styles.td4]}>站长工具</Text>
                    <Text style={[stylesList.headerRowText, styles.td5]}>爱站指数</Text>
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
                                        <Text style={[stylesList.firstName, { width: 53 }]}>{item.score}</Text>
                                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                    </View>
                                    <Text style={[stylesList.CABB7C4, styles.td2]}>{item.zs_baidu}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td3]}>{item.zs_so}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td4]}>{item.pr_zz}</Text>
                                    <Text style={[stylesList.CABB7C4, styles.td5]}>{item.pr_az}</Text>
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
        width: (Theme.screenWidth - 150) * 0.48,
    },
    td2: {
        width: (Theme.screenWidth - 150) * 0.36,
    },
    td3: {
        width: (Theme.screenWidth - 150) * 0.34,
    },
    td4: {
        width: 80,
    },
    td5: {
        width: 80,
    }
})