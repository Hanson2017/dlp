import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.flmllist.length > 0) && versionStatus != 1? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <View style={[stylesList.tdUp, { width: 105 }]}>
                        <Text style={[stylesList.C2D3640, { width: 60 }]}>{item.score}</Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.zs_baidu}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.zs_so}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.pr_zz}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.pr_az}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 85 }]}>{item.zs_76676}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '流量', width: 105 },
            { title: '百度指数' },
            { title: '好搜指数' },
            { title: '站长工具' },
            { title: '爱站指数' },
            { title: '76676指数' },
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 85
                    return (
                        <Text style={[stylesList.C2D3640, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
