import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import stylesList from '../../../../../css/listData';

export default class Left extends React.Component {
    
    render() {
        return (
            <FlatList
                ListHeaderComponent={this.ListHeaderComponentL.bind(this)}
                data={this.props.data}
                renderItem={this.renderItemL.bind(this)}
            />
        )
    }
    ListHeaderComponentL() {

        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdName_black, stylesList.headerRowText]}>平台名称</Text>
            </View>
        )
    }
    renderItemL({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={[stylesList.itemRow,styles.itemRow]} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name}) }}

                >
                    <Text style={[stylesList.tdName_black, stylesList.C2D3640]}>{item.plat_name}</Text>
                </TouchableOpacity>

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
