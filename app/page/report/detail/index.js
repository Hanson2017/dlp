import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView } from 'react-native';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';

import Header from '../../../component/navBar'
import Loading from '../../../component/loading'


export default class ReportsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
    }
    render() {
        let navigation = this.props.navigation;
        let data = this.state.dataSource;
        const { params } = this.props.navigation.state;
        let type = params.type;

        if (!this.state.loading) {
            var con_str = data.con_str.replace(/\/ueditor_net/g, 'http://www.dailuopan.com/ueditor_net').replace(/.png\\/g, '.png')
            var HTML = "<html><style>img{width:100%}.code{width:auto}</style>" + con_str + "</html>";
        }

        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '数据报表', title: '数据报表', search: 'null' }} navigation={navigation} />
                <View style={styles.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollView
                                style={styles.reportDetailWp}
                            >
                                <View style={styles.reportHead}>
                                    <Text style={styles.reportDetailTitle}>{data.title}</Text>
                                    <Text style={styles.reportDetailTime}>发布时间     {Util.formatDate(data.addtime)}</Text>
                                </View>
                                <View>
                                    {type != 'dlp' ?
                                        <WebView
                                            style={{
                                                height: Theme.screenHeight - 180,
                                            }}
                                            source={{ html: HTML }}
                                        />
                                        :
                                        <View>
                                            <Text style={styles.dlpText}>本文因为数据过多，暂时只支持PC端查看。</Text>
                                            <Text style={styles.dlpText}>贷罗盘PC端网址：Http://www.dailuopan.com</Text>
                                        </View>
                                    }
                                </View>

                            </ScrollView>
                    }
                </View>
            </View>
        )
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        let that = this;
        const { params } = this.props.navigation.state;
        let id = params.id;
        let type = params.type;
        let url;
        if (type == 'dlp') {
            url = Api.getReportsDetail_dlp + '?id=' + id
        }
        else {
            url = Api.getReportsDetail + '?id=' + id
        }

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData.data,
                            })
                            console.log(responseData)
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })

    }
}

const styles = StyleSheet.create({
    content:{
        flex:1,
        backgroundColor: '#fff',
    },
    reportDetailWp: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    reportHead: {
        marginBottom: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    reportDetailTitle: {
        fontSize: 14,
        color: '#101010',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    reportDetailTime: {
        color: '#8e969f',
        fontSize: 13,
    },
    dlpText:{
        lineHeight:30,
        fontSize:14,
    }

})
