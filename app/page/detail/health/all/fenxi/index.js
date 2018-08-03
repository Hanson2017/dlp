import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../../util/theme';
import Title from '../../../../../component/title';

class List extends React.Component {
    render() {
        const { data, iconName, title } = this.props;
        var color;
        if (data.status == '强' || data.status == '偏强' || data.status == '极强') {
            color = '#39B54A';
        }
        else if (data.status == '偏弱' || data.status == '正常') {
            color = '#FFA500';
        }
        else {
            color = '#ED1C24';
        }
        return (
            <View style={styles.listItem}>
                <Icon name={iconName} size={title == '资金流' ? 56 : 45} color={color} />
                <Text style={styles.listItemText}>{title} <Text style={{ color: color }}> {data.status}</Text></Text>
            </View>
        )
    }
}

export default class DetailHealthAllFenxi extends React.Component {
    render() {
        const { data } = this.props;
        const dataDetail = data.dataDetail;
        const inamount = dataDetail.inamount; //资金流
        const mobility = dataDetail.mobility; //流动性
        const dispersion = dataDetail.dispersion; //分散度
        const popularity = dataDetail.popularity; //人气
        const stayStill = dataDetail.stayStill; //体量
        const loyalty = dataDetail.loyalty; //忠诚度
        const growth = dataDetail.growth; //成长性
        const rate = dataDetail.rate; //收益率
        return (
            <View style={[Theme.box, Theme.mt10, { borderBottomWidth: 0, }]}>
                <Title data={'健康度分析'} />
                {
                    data.dlpDetail !== null && data.dlpDetail !== '' ?
                        <View style={styles.content}>
                            <View style={styles.note}>
                                <Text style={styles.noteText}>数据说明：极强 &gt; 强 &gt; 偏强 &gt; 正常 &gt; 偏弱 &gt; 弱 &gt; 极弱</Text>
                            </View>
                            <View style={styles.body}>
                                <List data={inamount} iconName={'zb-zijin'} title={'资金流'} />
                                <List data={mobility} iconName={'zb-liudong'} title={'流动性'} />
                                <List data={dispersion} iconName={'zb-fenshan'} title={'分散度'} />
                                <List data={popularity} iconName={'zb-renqi'} title={'人气'} />
                                <List data={stayStill} iconName={'zb-tiliang'} title={'体量'} />
                                <List data={loyalty} iconName={'zb-chengzhang'} title={'忠诚度'} />
                                <List data={growth} iconName={'zb-zhongchengdu'} title={'成长性'} />
                                <List data={rate} iconName={'zb-shouyi'} title={'收益率'} />
                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    note: {
        paddingLeft: 17,
        paddingTop: 15,
        paddingBottom: 15,
    },
    noteText: {
        fontSize: 12,
        color: '#999',
    },
    content: {
        paddingBottom: 10,
    },

    body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listItem: {
        paddingBottom: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: Theme.screenWidth / 4,
    },
    listItemText: {
        paddingTop: 5,
        fontSize: 12,
        color: '#999',
    },
    null: {
        padding: 17,
        fontSize: 14,
        color: '#ccc',
    },

})