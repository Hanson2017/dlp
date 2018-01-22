import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView } from 'react-native';

import Header from '../component/Header'
import Loading from '../component/Loading'
import Theme from '../util/theme';
import Util from '../util/util';
import Api from '../util/api';
import HTMLView from 'react-native-htmlview';

export default class HelpDetail extends React.Component {
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
        if (!this.state.loading) {
            var con_str = data.detailinfo.replace(/\/atcpic/g, 'http://www.dailuopan.com/atcpic').replace(/.png\\/g, '.png')
            var HTML = "<html><style>img{width:100%}.code{width:auto}</style>" + con_str + "</html>";
        }

        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '评测文章', title: '评测文章', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollView
                                style={styles.HelpDetailWp}
                            >
                                <View style={styles.header}>
                                    <View>
                                        <Text style={styles.HelpDetailTitle}>{data.title}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <Text style={styles.source}>来源：微信公众号-{data.mpname}</Text>
                                    <Text style={styles.date}>发布时间：{Util.formatDate(data.updatetime)}</Text>
                                    </View>
                                  
                                    
                                </View>
                                <View>
                                    <WebView
                                        style={{
                                            height: Theme.screenHeight-215,
                                        }}
                                        source={{ html: HTML }}
                                    />

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
        let url = Api.pingCeDetail + '?id=' + id
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData.data.article,
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
    HelpDetailWp: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    header:{
        marginBottom:15,
        paddingBottom:15,
        maxHeight:95,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
    },
    HelpDetailTitle: {
        fontSize: 18,
        paddingBottom: 10,
        lineHeight:26,
    },
    p: {
        color: '#999',
        lineHeight: 20,
    },
    source:{
        fontSize:12,
        color:'#999',
    },
    date:{
        fontSize:12,
        color:'#999',
    }

})
