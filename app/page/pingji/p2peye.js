import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.flmllist.length > 0) && versionStatus != 1 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <Text style={[stylesList.C2D3640, { width: 95 }]}>{item.level}/{item.level_p2peye}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.claims}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.investment}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.rate}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.limit_t}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.regional}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.operation}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.liquidity}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.borrowing}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '网贷天眼', width: 95 },
            { title: '偿兑性' },
            { title: '投资' },
            { title: '利率' },
            { title: '期限' },
            { title: '地域性' },
            { title: '运营' },
            { title: '流动性' },
            { title: '借款' }
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 70
                    return (
                        <Text style={[stylesList.C2D3640, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
