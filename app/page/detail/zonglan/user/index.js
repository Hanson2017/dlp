import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class ZonglanUser extends React.Component {
    render() {
        const { navigation, dataAge, dataReplat, platName } = this.props;
        if (dataAge != null) {
            if (dataAge != '') {
                var ageText = ['18岁及以下', '19-24岁', '25-34岁', '35-49岁', '50岁及以上'];
                var age = dataAge.split(',')
                var newdata = [];
                for (const i = 0; i < age.length; i++) {
                    newdata.push(parseInt(age[i]))
                }
                age = newdata
                var maxValue = Math.max.apply(null, age);
            }
        }
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'用户数据'} navigation={navigation} />
                <View>
                    <View style={styles.ageDetail}>
                        {
                            dataAge != '' && dataAge != null ?
                                age.map((list, i) => {
                                    return (
                                        <View style={styles.ageDetailList} key={i}>
                                            <Text style={styles.ageNum}>{ageText[i]}</Text>
                                            <Text style={styles.ageBili}>{list}%</Text>
                                            <View style={[styles.progress, styles.progressAge, { width: (Theme.screenWidth - 20) / 2 * (list / maxValue) }]}></View>
                                        </View>
                                    )
                                })

                                :
                                <Text style={styles.null}>暂无数据</Text>
                        }
                    </View>
                    <View style={styles.replatContainer}>
                        <Text style={styles.replatTitle}>{platName}的用户还关注</Text>
                        <View style={styles.replatList}>
                            {
                                dataReplat != null && dataReplat != '' && dataReplat.length > 0 ?
                                    dataReplat.map((item, i) => {
                                        return (
                                            <TouchableOpacity key={i} style={styles.replatItem}
                                                onPress={() => {
                                                    navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                }}
                                            >
                                                <Text style={styles.replatItemText}>{item.plat_name}</Text>
                                                {
                                                    item.fundtype ?
                                                        <View style={styles.fundtype}>
                                                            <Icon name={'fund-icon'} size={18} color={Theme['fund' + item.fundtype + 'Color']} />
                                                            <Text style={styles.fundtypeText}>{item.fundtype}</Text>
                                                        </View>
                                                        :
                                                        null
                                                }

                                            </TouchableOpacity>
                                        )
                                    })
                                    :
                                    null
                            }
                        </View>
                    </View>


                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ageDetail: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 17,
        paddingRight: 17,
    },
    ageDetailList: {
        paddingRight: 30,
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        height: 16,
        alignItems: 'center',
    },
    ageNum: {
        width: 65,
        color: '#666',
        fontSize: 10,
    },
    ageBili: {
        paddingRight:8,
        textAlign:'right',
        width: 40,
        fontSize: 14,
        color: '#4AB3FF',
        
    },

    progressAge: {
        borderRadius: 4,
        height: 16,
        backgroundColor: '#4AB3FF',
        width: Theme.screenWidth - 105,
    },
    replatContainer: {
        paddingTop: 13,
        marginLeft: 15,
        marginRight: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',

    },
    replatTitle: {
        paddingBottom: 14,
        fontSize: 10,
        color: '#999',
    },
    replatList: {
        paddingLeft:5,
        flexDirection: 'row',        
        flexWrap: 'wrap',
    },
    replatItem: {
        position:'relative',
        marginBottom: 20,
        marginRight:21,
        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
        width: (Theme.screenWidth - 100) / 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
    },
    replatItemText: {
        fontSize: 11,
        color: '#bbb',
    },
    fundtype:{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position:'absolute',
        top:2,
        right:-18,
    },
    fundtypeText:{
        position:'absolute',
        top:1,
        left:5,
        fontSize:11,
        color:'#fff',
    },
    null: {

        fontSize: 14,
        color: '#ccc',
    },
})