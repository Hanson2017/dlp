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
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name}) }}

                >
                    <View style={[stylesList.tdUp, { width: 90 }]}>
                        <Text style={[stylesList.C2D3640, { width: 42 }]}>{item.fzzhishu} </Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.chengjiao}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.renqi}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.ganggan}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.ldxing}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.fsdu}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.tmdu}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '网贷之家', width: 90 },
            { title: '成交', width: 70 },
            { title: '人气' },
            { title: '合规' },
            { title: '品牌' },
            { title: '分散度' },
            { title: '透明度' },
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 80
                    return (
                        <Text style={[stylesList.C2D3640, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
