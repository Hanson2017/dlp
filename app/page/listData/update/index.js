import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import stylesList from '../../../css/listData';
import Icon from 'react-native-vector-icons/Icomoon';

export default class Update extends React.Component {
    render() {
        const {upDateTime,totalNum}=this.props;
        return (
            <View style={stylesList.updateContainer}>
                <Icon name={'ico-dateTime'} size={14} color={'#BBE2FF'} />
                <Text style={stylesList.updateContainerText}>更新时间：{upDateTime}</Text>
                <Text style={[stylesList.updateContainerText,{paddingLeft:15}]}>参与平台数量：{totalNum}家</Text>
            </View>
        )
    }
}