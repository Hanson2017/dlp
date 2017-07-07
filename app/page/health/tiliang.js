import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';
import Theme from '../../util/theme';
module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={item.fund_type != 0 || item.flmllist.length > 0 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name, fundType: item.fund_type }) }}

                >
                    <Text style={[stylesList.C2D3640, { width: (Theme.screenWidth-170)/2 }]}>{item.score}</Text>
                    <View style={[stylesList.tdUp, { width: (Theme.screenWidth-170)/2 }]}>
                        <Text style={[stylesList.CABB7C4, { width: 50 }]}>{item.changnum >= 0 ? item.changnum : -item.changnum}%</Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>

                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '体量' },
            { title: '变化幅度' },
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : (Theme.screenWidth-170)/2
                    return (
                        <Text style={[stylesList.C2D3640, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
