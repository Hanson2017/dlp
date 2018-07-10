import React, { Component } from 'react';
import { Text, View, TouchableOpacity ,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={[stylesList.itemRow,styles.itemRow]} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <Text style={[stylesList.tdName_black, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.C2D3640, stylesList.dateTime]}>{item.negative_time}</Text>
                    <Text style={[stylesList.C2D3640, stylesList.yygs]}>{item.info_yygs}</Text>
                    <Text style={[stylesList.C2D3640, stylesList.province]}>{item.province}</Text>
                    <Text style={[stylesList.C2D3640, stylesList.city]}>{item.city}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdName_black, stylesList.headerRowText]}></Text>
                <Text style={[stylesList.dateTime, stylesList.headerRowText]}>争议时间</Text>
                <Text style={[stylesList.yygs, stylesList.headerRowText]}>运营公司</Text>
                <Text style={[stylesList.province, stylesList.headerRowText]}>省份</Text>
                <Text style={[stylesList.city, stylesList.headerRowText]}>城市</Text>
                
            </View>
        )

    }

}

const styles = StyleSheet.create({
    itemRow: {
        paddingTop:5,
        height: 45,
        justifyContent:'flex-start',
    }
})

