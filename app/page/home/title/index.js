import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Util from '../../../util/util';

export default class Title extends React.Component {
    render() {
        const { titleText, navigation, screenUrl } = this.props;
        return (
            <View style={[styles.container,]}>
                <Text style={styles.titleText}>{titleText}</Text>
                {
                    screenUrl ?
                        <TouchableOpacity style={styles.more} onPress={()=>{
                            navigation.push(screenUrl)
                        }}>
                            <Text style={styles.moreText}>查看更多</Text>
                            <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                        </TouchableOpacity>
                        :
                        null
                }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingLeft: 17,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    more: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        fontSize: 12,
        color: '#999',
    },
})