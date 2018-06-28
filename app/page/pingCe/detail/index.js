import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';
import Header from '../../../component/navBar';
import Loading from '../../../component/loading';

export default class HelpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            article: '',
            plats: '',
        };
    }
    render() {
        const { navigation } = this.props;
        const { article, plats } = this.state;
        const { params } = this.props.navigation.state;
        if (!this.state.loading) {
            var con_str = article.detailinfo.replace(/\/atcpic/g, 'http://www.dailuopan.com/atcpic').replace(/.png\\/g, '.png')
            var HTML = "<html><style>img{width:100%}.code{width:auto}</style>" + con_str + "</html>";
        }

        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '评测文章', title: '评测文章', search: 'null' }} navigation={navigation} />
                <View style={styles.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollView
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
                                    <View style={styles.relate}>
                                        <Text style={styles.relateLabeltext}>相关：</Text>
                                        <View style={styles.relateList}>
                                        {
                                            plats !== '' && plats.length > 0 ?
                                                plats.map((item, i) => {
                                                    return (
                                                        <TouchableOpacity style={styles.relateplatName} key={i}
                                                            onPress={()=>{
                                                                navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                            }}
                                                        >
                                                            <Text style={styles.relateplatNameText}>{item.plat_name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <WebView
                                        style={{
                                            height: Theme.screenHeight - 215,
                                        }}
                                        source={{ html: HTML }}
                                    />
                                </View>

                            </ScrollView>

                    }
                    <TouchableOpacity style={styles.submitBtn}
                        onPress={() => {
                            navigation.navigate('PingCeCommentList', { cid: params.id })

                        }}>
                        <Icon name={'comment-find'} size={16} color={'#73C3FF'} />
                        <Text style={styles.submitBtnText}>查看评论</Text>
                    </TouchableOpacity>
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
                                article: responseData.data.article,
                                plats: responseData.data.plats,
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
    relateList:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    relateLabeltext: {
        fontSize: 11,
        color: '#bbb',
        lineHeight:16,
    },
    relateplatName: {
        marginRight: 10,
    },
    relateplatNameText: {
        fontSize: 11,
        color: '#83CAFF',
        lineHeight:16,
    },
    submitBtn: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText:{
        paddingLeft:10,
        color:Theme.color,
        fontSize:14,
    },
    p: {
        color: '#999',
        lineHeight: 20,
    },

})
