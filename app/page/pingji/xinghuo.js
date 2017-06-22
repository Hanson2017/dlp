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
                    <Text style={[stylesList.C2D3640, { width: 205, paddingLeft: 40 }]}>{item.level}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '星火评级', width: 205 }

        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 80
                    return (
                        <Text style={[stylesList.C2D3640, { width: width, paddingLeft: 40 }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
