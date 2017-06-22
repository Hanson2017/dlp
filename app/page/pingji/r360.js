import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={item.fund_type != 0 || item.flmllist.length > 0 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name, fundType: item.fund_type }) }}

                >

                    <Text style={[stylesList.C2D3640, { width: 74 }]}>{item.level}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 65 }]}>{item.renqi}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 65 }]}>{item.rate}</Text>

                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '融360', width: 74 },
            { title: '人气' },
            { title: '利率' }
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 65
                    return (
                        <Text style={[stylesList.C2D3640, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
