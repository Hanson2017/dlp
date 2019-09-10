import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import Theme from '../../../../../../util/theme';
import Title from '../../../../../../component/title';


export default class GongshangRenyuanComponent extends React.Component {

    render() {
        const { data } = this.props;
        return (
            <View style={[Theme.box, Theme.mt10, { borderBottomWidth: 0, }]}>
                <Title data={'主要成员'} />
                {
                    data != null && data.length > 0 ?
                        <View style={styles.memberBox}>
                            <View style={styles.memberInfo}>
                                {
                                    data.map((list, i) => {

                                        return (
                                            <View style={[styles.memberInfoList, data.length - 1 == i || (data.length - 2 == i && i % 2 == 0) ? { borderBottomWidth: 0 } : null]} key={i}>
                                                <Text numberOfLines={1} style={styles.memberInfoTextName}>{list.name}</Text>
                                                <View style={styles.memberInfoZhiwei}>
                                                    <Text numberOfLines={1} style={styles.memberInfoTextZhiwei}>{list.zhiwei}</Text>
                                                </View>

                                            </View>
                                        )

                                    })
                                }

                            </View>
                        </View>
                        :
                        <Text style={styles.null2}>暂无成员信息</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    memberBox: {
        padding: 17,
        paddingRight: 0,
    },
    memberTitle: {
        color: '#ccc',
        marginTop: 5,
        marginBottom: 15,
    },
    memberInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    memberInfoList: {
        paddingBottom: 10,
        marginBottom: 10,
        width: (Theme.screenWidth - 40) / 2,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    memberInfoTextName: {
        fontSize: 14,
        color: '#666',
    },
    memberInfoZhiwei: {
        marginTop: 5,
        width: 70,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
    },
    memberInfoTextZhiwei: {
        color: '#bbb',
        fontSize: 12,
    },

    null2: {
        padding: 17,
        fontSize: 14,
        color: '#bbb',
    },

})