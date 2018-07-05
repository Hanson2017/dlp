import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../../css/listData';
import Theme from '../../../util/theme';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.flmllist.length > 0) && versionStatus != 1 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <View style={[stylesList.tdUp, { width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.38 : (Theme.screenWidth - 150) * 0.5 }]}>
                        <Text style={[stylesList.firstName, { width: 53 }]}>{item.score}</Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.28 : (Theme.screenWidth - 150) * 0.32 }]}>{item.zs_baidu}</Text>
                    <Text style={[stylesList.CABB7C4, { width: (Theme.screenWidth - 150) * 0.28 }]}>{item.zs_so}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.pr_zz}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.pr_az}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '流量', width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.38 : (Theme.screenWidth - 150) * 0.5 },
            { title: '百度指数', width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.28 : (Theme.screenWidth - 150) * 0.32 },
            { title: '好搜指数', width: (Theme.screenWidth - 150) * 0.28 },
            { title: '站长工具' },
            { title: '爱站指数' },
        ]
        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 85
                    return (
                        <Text style={[stylesList.headerRowText, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
