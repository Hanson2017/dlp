import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../util/theme';

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
                                onPress={() => { navigation.navigate(column.screenUrl, { tabId: column.tabId }) }}
                                style={[styles.nav]}
                                key={i}
                            >
                                <Icon name={column.iconName} size={column.fontSize} color={Theme.color} />
                                <Text style={[styles.textStyle]}>{column.title}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        height: 96,
    },
    nav: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        paddingTop: 10,
        color: '#707070',
        fontSize: 12,
    }

})

