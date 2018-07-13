import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView, TextInput, TouchableOpacity, Keyboard,StatusBar } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';
import Header from '../../../component/navBar';
import Loading from '../../../component/loading';
import Toast from '../../../component/toast';
import ActionShare from '../../../component/actionShare';
import Foot from './foot';

export default class HelpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            article: '',
            plats: '',
            commentcount: 0,
        };
    }
    render() {
        const { navigation } = this.props;
        const { article, plats, commentcount } = this.state;
        const { params } = this.props.navigation.state;
      
        if (!this.state.loading) {
            var con_str = article.detailinfo.replace(/\/atcpic/g, 'http://www.dailuopan.com/atcpic').replace(/.png\\/g, '.png')
            var HTML = "<html><style>img{width:100%}.code{width:auto}</style>" + con_str + "</html>";
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <StatusBar
                        backgroundColor={Theme.color2}
                        barStyle="light-content"
                    />
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
                                                                    onPress={() => {
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
                        <Foot
                            navigation={navigation}
                            cid={params.id}
                            commentcount={commentcount}
                            that={this}
                            routeName={navigation.state.routeName}
                        />
                    </View>
                    <Toast ref={'Toast'} />
                    <ActionShare ref={'ActionShare'} />
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        let that = this;
        this.getData()
        window.EventEmitter.on('commentAddPC222', (data) => {
            that.getData();
        })
    }
    componentWillUnmount() {
        window.EventEmitter.off('commentAddPC222')
    }
    toastShow(data) {
        this.refs.Toast.show(data)
    }
    toastHide() {
        this.refs.Toast.cancel();
    }
    showActionSheet() {
        const { article} = this.state;
    
        let data={
            type: 'news',
            title: article.title,
            description: article.digest,
            webpageUrl: 'http://m.dailuopan.com/pingce/' + article.id,
            imageUrl: article.cover,
        }
        this.refs.ActionShare.show(data)
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
                                commentcount: responseData.data.commentcount
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
    footContainer: {
        padding: 10,
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',

        alignItems: 'center',
    },
    footInput: {
        width: 300,
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
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
    submitBtn: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        paddingLeft: 10,
        color: Theme.color,
        fontSize: 14,
    },
    p: {
        color: '#999',
        lineHeight: 20,
    },

})
