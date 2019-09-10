import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

export default class ActivityDetailHeader extends Component {
    render() {
        const { uri, navigation} = this.props;
        return (
            <View style={[styles.headerContainer, this.props.isFixed ? styles.fixed : null]}>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle="dark-content"
                />

                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={()=>{navigation.goBack()}}
                >
                    <Icon name='triangle-left' size={18} color={'#a9a9a9'} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    {
                        uri != null ?
                            <Image source={{ uri: uri }} style={{ width: 60, height: 24 }} />
                            :
                            null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    fixed: {
        shadowColor: 'rgba(177, 175, 175, 0.4)',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 1,
        zIndex: 99,
    },
    backBtn: {
        paddingLeft: 12,
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        paddingRight: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countdown: {
        position: 'absolute',
        top: 26,
        right: 0,
        width: 70,
        height: 23,
        paddingLeft: 8,
        borderLeftWidth: 1,
        borderLeftColor: '#bcbcbc',
    },
    countdownText: {
        color: '#868686',
        fontSize: 11
    },
    countdownDateText: {
        color: '#E61C2C',
        fontSize: 11
    },
})