import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Util from '../../../util/util';

export default class List extends React.Component {
    render() {
        const { data, navigation, borderNot } = this.props;
        return (
            <View style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}>
                <TouchableOpacity style={styles.listTitle}
                    onPress={() => { 
                        Util.goBBs(navigation,data.linkurl); 
                     }}
                >
                    <Text style={styles.listTitleText}>{data.title}</Text>
                </TouchableOpacity>
                <View style={[styles.listBt]}>
                    <View style={styles.listBtLeft}>
                        <View style={styles.username}>
                            <Icon name='ico-portrait' size={15} color={'#73C3FF'} />
                            <Text style={styles.usernameText}>{data.author}</Text>
                        </View>
                        <View style={styles.views}>
                            <SimpleLineIcons name='eye' size={15} color={'#bbb'} />
                            <Text style={styles.viewsText}>{data.views}</Text>
                        </View>
                    </View>
                    <View style={styles.listBtRight}>
                        <Text style={styles.dateTime}>{data.addtime.substring(0, data.addtime.indexOf(' '))}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    listContainer: {
        marginTop: 12,
        paddingBottom: 8,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listTitle: {
        marginBottom: 10,
    },
    listTitleText: {
        fontSize: 14,
        color: '#101010',
        lineHeight: 18,
    },
    listBt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listBtLeft:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    username:{
        minWidth:115,
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    usernameText:{
        color:'#999',
        fontSize:11,
        paddingLeft:4,
    },
    views:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewsText:{
        color:'#bbb',
        fontSize:11,
        paddingLeft:4,
    },
    dateTime:{
        color:'#bbb',
        fontSize:11,
    },
  
})