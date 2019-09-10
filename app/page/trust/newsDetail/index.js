import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';
import Header from '../../../component/navBar';
import Loading from '../../../component/loading';


export default class TrustNewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            loading: true,
            article: '',
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            id: params.id
        })
    }
    render() {
        const { navigation } = this.props;
        const { article } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }} forceInset={{ bottom: 'never' }}>
                <View style={Theme.container}>
                    <StatusBar
                        backgroundColor={Theme.color2}
                        barStyle="light-content"
                    />
                    <Header headerOpt={{ back: '评测文章', title: '信托文章', search: 'null' }} navigation={navigation} />
                   
                    <View style={styles.content}>
                    <ScrollView>
                        {
                            this.state.loading ?
                                <Loading />
                                :
                                <View
                                    style={styles.HelpDetailWp}
                                >
                                    <View style={styles.header}>
                                        <View style={styles.title}>
                                            <Text style={styles.titleText}>{article.title}</Text>
                                        </View>
                                        <View style={styles.source}>
                                            <Text style={styles.sourceText}>来源：微信公众号-{article.mpname}</Text>
                                            <Text style={styles.sourceText}>发布时间：{Util.formatDate(article.updatetime)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.contentDetail}>
                                        <Text style={styles.text}>{Util.delHtmlTag(article.detailinfo)}</Text>
                                    </View>

                                </View>

                        }
                         </ScrollView>
                    </View>
                   
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        let that = this;
        this.getData()
    }

    getData() {
        let that = this;
        const { id } = this.state;
        let url = Api.trustYuqing_detail + '?id=' + id
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                loading: false,
                                article: responseData.data,
                            })

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

    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    HelpDetailWp: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    header: {
        marginBottom: 10,
        paddingBottom: 10,
        maxHeight: 110,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    titleText: {
        paddingBottom: 10,
        lineHeight: 18,
        fontSize: 14,
        color: '#101010'
    },
    source: {
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sourceText: {
        fontSize: 11,
        color: '#bbb',
    },
    relate: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    relateList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    relateLabeltext: {
        fontSize: 11,
        color: '#bbb',
        lineHeight: 16,
    },
    relateplatName: {
        marginRight: 10,
    },
    relateplatNameText: {
        fontSize: 11,
        color: '#83CAFF',
        lineHeight: 16,
    },
    text:{
        lineHeight:24,
        fontSize:12,
        color:'#666',
    },

})
