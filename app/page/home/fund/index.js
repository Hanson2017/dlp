import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title';

class List extends React.Component {
    render() {
        const {typeNo,type,typeBG,navigation,data,borderBottomNot}=this.props;
        return (
            <View style={styles.fundList}>
                <View style={styles.fundLeft}>
                    <View style={[styles.fundType,typeBG?{backgroundColor:typeBG}:null]}><Text style={styles.fundTypeText}>{typeNo}号</Text></View>
                    <Text style={styles.fundTitText}>{type}</Text>
                </View>
                <View style={[styles.fundRight,borderBottomNot?{borderBottomWidth:0}:null]}>
                    {
                        data.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} style={styles.platName} activeOpacity={0.6}
                                    onPress={() => {
                                        navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                    }}
                                >
                                    <Text style={styles.platNameText}>{item.plat_name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}


export default class Fund extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'示范投资'} navigation={navigation} screenUrlInfo={{screenUrl:'Fund',tabId:null}} />
                <View style={styles.fundContainer}>
                    <List typeNo={1} type={'稳健型'} typeBG={null} navigation={navigation} data={data.Listfund1} />
                    <List typeNo={2} type={'平衡型'} typeBG={'#D9B966'} navigation={navigation} data={data.Listfund2} />
                    <List typeNo={3} type={'收益型'} typeBG={'#784CF5'} navigation={navigation} data={data.Listfund3} borderBottomNot={true} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
    },
    fundContainer: {
        paddingLeft: 17,
        paddingRight: 17,
    },
    fundList: {
        marginTop: 15,
        flexDirection: 'row',
    },
    fundType: {
        marginBottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 24,
        backgroundColor: '#4AB3FF',
        borderRadius: 3,
    },
    fundLeft: {
        marginRight: 17,
        alignItems: 'center',
    },
    fundTypeText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    fundTitText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    fundRight: {
        paddingLeft: 6,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    platName: {
        width: 67,
    },
    platNameText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 24,
    }
})