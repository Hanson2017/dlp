import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView } from 'react-native';

import Theme from '../../../util/theme';
import Api from '../../../util/api';
import Header from '../../../component/navBar';
import Loading from '../../../component/loading';

export default class HelpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
    }
    render() {
        const { navigation } = this.props;
        const { dataSource, loading } = this.state;
        if (!loading) {
            var con_str = dataSource.con_str.replace(/\/ueditor_net/g, 'http://www.dailuopan.com/ueditor_net').replace(/.png\\/g, '.png')
            var HTML = "<html><style>img{width:100%}.code{width:auto}</style>" + con_str + "</html>";
        }

        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '问答详情', title: '问答详情', search: 'null' }} navigation={navigation} />
                <View style={styles.content}>
                    {
                        loading ?
                            <Loading />
                            :
                            <ScrollView
                                style={styles.HelpDetailWp}
                            >
                                <View style={styles.HelpDetailTitle}>
                                    <Text style={styles.HelpDetailTitleText}>{dataSource.title}</Text>
                                </View>
                                <View>
                                    <WebView
                                        style={{
                                            height: Theme.screenHeight - 150,
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
        let url = Api.helpDetail + '?id=' + id
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
        backgroundColor:'#fff',
    },
    HelpDetailWp: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    HelpDetailTitle:{
        borderBottomWidth:1,
        borderBottomColor:'#eee',
    },
    HelpDetailTitleText: {
        fontSize: 16,
        paddingBottom: 15,
    },
    p: {
        color: '#999',
        lineHeight: 20,
    }

})
