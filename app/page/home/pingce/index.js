import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../pingCe/item';

class List extends React.Component {
    render() {
        const { data, index, navigation,borderNot } = this.props;
        return (
            <View style={[styles.listContainer,borderNot?{borderBottomWidth:0,}:null]}>

                <View style={styles.listImg}>
                    <Image
                        resizeMode={'stretch'}
                        style={styles.logo}
                        source={{ uri: data.cover }}
                        style={styles.thumbnail}
                    />
                </View>

                <View style={styles.listCon}>
                    <TouchableOpacity style={styles.listTitle}
                        onPress={() => { navigation.navigate('PingCeDetail', { id: data.id }) }}
                    >
                        <Text style={styles.listTitleText}>{Util.cutText(data.title, 32)}</Text>
                    </TouchableOpacity>
                    <View style={[styles.listBt]}>
                        <TouchableOpacity style={styles.listPlatName}
                            onPress={() => {
                                navigation.navigate('Detail', { id: data.id_dlp, platName: data.platname })
                            }}
                        >
                            <Text style={styles.listPlatNameText}>{data.platname}</Text>
                        </TouchableOpacity>
                        <View style={styles.listUpdatetime}>
                            <Text style={styles.listUpdatetimeText}>{Util.formatDate(data.updatetime)}</Text>
                        </View>
                    </View>
                </View>


            </View>
        )
    }
}


export default class Pingce extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'评测监控'} navigation={navigation} screenUrlInfo={{ screenUrl: 'PingCe', tabId: null }} />
                <View style={styles.pingceContainer}>
                    {
                        data.map((item, i) => {

                            return (
                                <List key={i} data={item} navigation={navigation} borderNot={data.length - 1 == i ? true : false} />
                            )

                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    pingceContainer: {
        paddingLeft: 17,
    },
    listContainer: {
        marginTop: 15,
        paddingBottom: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        paddingBottom: 15,
        height: 80,
    },
    listImg: {
        width: 120,
    },
    thumbnail: {
        width: 110,
        height: 65,
    },
    listCon: {
        flex: 1,
        justifyContent: 'space-between',
        paddingRight: 10,
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
    listPlatName: {
        paddingLeft: 6,
        paddingRight: 6,
        height: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listPlatNameText: {
        fontSize: 11,
        color: '#bbb',
    },
    listUpdatetimeText: {
        fontSize: 11,
        color: '#bbb',
    },

})