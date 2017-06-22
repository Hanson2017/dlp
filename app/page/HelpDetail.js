import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

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
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '问答详情', title: '问答详情', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollView
                                style={styles.HelpDetailWp}
                            >
                                <Text style={styles.HelpDetailTitle}>{data.title}</Text>
                                <View>
                                    <HTMLView
                                        stylesheet={styles}
                                        value={data.con_str.replace(/\/ueditor_net/g,'http://www.dailuopan.com/ueditor_net').replace(/.png\\/g,'.png')}
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
    HelpDetailWp: {
        paddingTop:20,
        paddingLeft: 15,
        paddingRight: 15
    },
    HelpDetailTitle:{
        fontSize:18,
        paddingBottom:20,
    },
    p:{
        color:'#999',
        lineHeight:20,
    }
    
})
