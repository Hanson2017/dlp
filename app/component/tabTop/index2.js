import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../util/theme';
import Util from '../../util/util';
import Api from '../../util/api';

export default class TabTop extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box]}>
                {
                    data.map((column, i) => {
                        return (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {

                                    navigation.navigate(column.screenUrl, { tabId: column.tabId })

                                }}
                                style={[styles.nav]}
                                key={i}
                            >
                                {
                                    column.iconFontType ?
                                        column.iconFontType == 'FontAwesome' ?
                                            <FontAwesome name={column.iconName} size={column.fontSize} color={Theme.color} />
                                            :
                                            column.iconFontType == 'MaterialCommunityIcons' ?
                                                <MaterialCommunityIcons name={column.iconName} size={column.fontSize} color={Theme.color} />
                                                :
                                                null
                                        :
                                        <Icon name={column.iconName} size={column.fontSize} color={Theme.color} />
                                }
                                <Text style={[styles.textStyle, column.top ? { top: column.top } : null]}>{column.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    nav: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    textStyle: {
        position: 'relative',
        paddingTop: 10,
        color: '#707070',
        fontSize: 12,
    }

})

