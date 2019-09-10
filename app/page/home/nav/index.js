import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../../util/theme';

var data = [
    { title: '网贷数据', iconName: 'nav-pingjiJG', iconColor: '#007ddc', screenUrl: 'P2PHome' },
    { title: '银行理财', iconName: 'university', iconColor: '#007ddc', screenUrl: 'LicaiList', iconFontType: 'FontAwesome' },
    { title: '信托数据', iconName: 'nav-data', iconColor: '#007ddc', screenUrl: 'Trust' },
    { title: '贷款', iconName: 'stop-circle-outline', iconColor: '#007ddc', screenUrl: 'Loan', iconFontType: 'MaterialCommunityIcons' }
];


export default class Nav extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.container, Theme.mt10, Theme.box]}>
                <View style={styles.navList}>
                    {
                        data.map((column, i) => {
                            let screenUrl = column.screenUrl;

                            return (
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => { navigation.navigate(screenUrl) }}
                                    style={[styles.nav]}
                                    key={i}
                                >
                                    {
                                        column.iconFontType ?
                                            column.iconFontType == 'FontAwesome' ?
                                                <FontAwesome name={column.iconName} size={34} color={column.iconColor} />
                                                :
                                                column.iconFontType == 'MaterialCommunityIcons' ?
                                                    <View style={column.title == '贷款' ? styles.transform : null}>
                                                        <MaterialCommunityIcons name={column.iconName} size={34} color={column.iconColor} />
                                                    </View>
                                                    :
                                                    null
                                            :
                                            <Icon name={column.iconName} size={34} color={column.iconColor} />
                                    }

                                    <Text style={[styles.textStyle]}>{column.title}</Text>
                                </TouchableOpacity>
                            )
                        })}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        
    },
    navList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 15,
        paddingLeft: 10,
    },
    nav: {
        paddingTop: 16,
        width: (Theme.screenWidth - 20) / 4,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textStyle: {
        marginTop: 6,
        color: '#30333b',
        fontSize: Theme.screenWidth >= 375 ? 12 : 11,
    },
    transform: {
        transform: [{ rotate: '45deg' }]
    }
})