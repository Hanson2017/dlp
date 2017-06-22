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
                    <View style={[stylesList.tdUp, { width: 205 }]}>
                        <Text style={[stylesList.C2D3640, { width: 80, paddingLeft: 30 }]}>权重{item.pr_zz}</Text>

                    </View>

                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '站长工具', width: 200 },
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 85
                    return (
                        <Text style={[stylesList.C2D3640, { width: width, paddingLeft: 30 }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
