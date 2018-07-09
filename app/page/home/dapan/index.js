import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Title from '../../../component/title';

class List extends React.Component {
    render() {
        const { labelText, data } = this.props;
        return (
            <View style={styles.list}>
                <Text style={styles.listlabel}>{labelText}</Text>
                <View style={styles.listCon}>
                    <Text style={styles.listNum}>{data.valuenum}</Text>
                    <Icon name={data.preday.change} size={10} color={data.preday.change == 'up' ? Theme.upColor : Theme.downColor} />
                </View>
            </View>
        )
    }
}

export default class Dapan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
        };
    }
    render() {
        const { data } = this.props;
        const { isHidden } = this.state;
        const inamount = data.inamount;
        const markent = data.markent;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'行业大盘'} borderNot={true} />
                <View style={styles.dapanCon}   >
                    <View style={styles.statusContainer}>
                        <View style={styles.statusLeft}>
                            <Text style={styles.statusLeftTextLabel}>资金流状态</Text>
                            <Text style={styles.statusLeftTextState}>{inamount.status}</Text>
                        </View>
                        <View style={styles.statusRight}>
                            <Image source={require('../../../../resources/images/kedu.png')} style={(Theme.screenWidth - 35 - 94) > 240 ? styles.imgkedu : styles.imgkedu2} />
                            <View style={[styles.imgzhizhenContainer, (Theme.screenWidth - 35 - 94) > 240 ? { left: inamount.score / 180 * 240 } : { left: inamount.score / 180 * (Theme.screenWidth - 35 - 94) }]}>
                                <Image source={require('../../../../resources/images/zhizhen.png')} style={styles.imgzhizhen} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusTextContainerText}>{inamount.detailinfo}</Text>
                    </View>
                    <TouchableOpacity style={styles.openBtn}
                        onPress={() => {
                            this.setState({
                                isHidden: !this.state.isHidden
                            })
                        }}
                    >
                        <Text style={styles.openBtnText}>{isHidden?'展开大盘参数':'收起大盘参数'}</Text>
                    </TouchableOpacity>
                    {
                        isHidden ?
                            null
                            :
                            <View style={styles.dataList}>
                                <List labelText={'资金流指数'} data={markent.inamount} />
                                <List labelText={'交易指数'} data={markent.amount} />
                                <List labelText={'人气指数'} data={markent.popularity} />
                                <List labelText={'流动性指数'} data={markent.mobility} />
                                <List labelText={'分散度指数'} data={markent.dispersion} />
                                <List labelText={'忠诚度指数'} data={markent.loyalty} />
                                <List labelText={'利率指数'} data={markent.rate} />
                            </View>
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dapanCon: {
        paddingLeft: 15,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    statusContainer: {
        flexDirection: 'row',
    },
    statusLeft: {
        width: 94,
    },
    statusLeftTextLabel: {
        fontSize: 14,
        color: '#666',
    },
    statusLeftTextState: {
        paddingTop: 10,
        fontSize: 24,
        color: '#666',
        fontWeight: 'bold',
    },
    statusRight: {
        flex: 1,
        position: 'relative',

        height: 72,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    imgzhizhenContainer: {
        position: 'absolute',
        bottom: -2,
    },
    imgkedu: {
        width: 240,
        height: 64,
    },
    imgkedu2: {
        width: Theme.screenWidth - 35 - 94,
        height: (Theme.screenWidth - 35 - 94) * (64 / 240)
    },
    imgzhizhen: {

        width: 22.4,
        height: 60,
    },
    statusTextContainer: {
        marginTop: 12,
    },
    statusTextContainerText: {
        color: '#666',
        fontSize: 14,
        lineHeight: 18,
    },
    openBtn: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 22,
        borderRadius: 4,
        backgroundColor: '#83CAFF',
    },
    openBtnText: {
        fontSize: 12,
        color: '#fff',
    },
    dataList: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    list: {
        paddingBottom: 12,
        width: (Theme.screenWidth - 35) / 4,
    },
    listlabel: {
        paddingBottom: 5,
        fontSize: 12,
        color: '#bbb',
    },
    listCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listNum: {
        paddingRight: 5,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#666',
    },
    listChangenum: {
        fontSize: 10,
    }

})