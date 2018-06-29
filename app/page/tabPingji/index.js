import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import TabTop from '../../component/tabTop';
import Title from '../../component/title';


var data = [
    { title: '机构评级', iconName: 'nav-pingjiJG', fontSize: 26, screenUrl: 'PingjiJG', tabId: null },
    { title: '媒体评级', iconName: 'nav-pingjiMT', fontSize: 26, screenUrl: 'PingjiMT', tabId: null },
    { title: '健康度分析', iconName: 'nav-health', fontSize: 26, screenUrl: 'Health', tabId: null },
    { title: '流量监控', iconName: 'nav-flow', fontSize: 26, screenUrl: 'Flow', tabId: null },
];

class List extends React.Component {
    render() {
        const { index, data, navigation, borderNot } = this.props;
        var platback = '暂无背景';
        if (data.platback.indexOf('上市') != -1) {
            platback = '上市系';
        }
        else if (data.platback.indexOf('国资') != -1) {
            platback = '国资系';
        }
        else if (data.platback.indexOf('银行') != -1) {
            platback = '银行系';
        }
        return (
            <TouchableOpacity style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}
                onPress={() => { navigation.navigate('Detail', { id: data.id_dlp, platName: data.plat_name }) }}
            >
                <View style={styles.listNo}><Text style={styles.listNoText}>{index + 1}</Text></View>
                <View style={styles.listplatName}><Text style={styles.listplatNameText}>{data.plat_name}</Text></View>
                <View style={styles.listscore}><Text style={styles.listscoreText}>{data['score']}</Text></View>
                <View style={styles.listKeywords}>
                    <View style={[styles.key, data.platback == '民营' ? styles.keyNull : null]}>

                        <Text style={styles.keyText}>{platback}</Text>
                    </View>
                    <View style={[styles.key, styles.key2, data.financing == '暂无融资' ? styles.keyNull : null]}>
                        <Text style={styles.keyText}>{data.financing}{data.financing !== '暂无融资' && data.financing !== 'IPO' ? '轮' : null}{data.financing_num != '' ? '-' : null}{data.financing_num}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


export default class PingjiTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            ref: false,
            loading: true,
            isRefreshing: false,
        };
    }
    render() {
        const { navigation, loginState } = this.props;
        const { loading, dataSource } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '排行详情', title: '排行详情' }} navigation={navigation} openControlPanel={this.openControlPanel.bind(this)} loginState={loginState} />
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <TabTop navigation={navigation} data={data} />

                                    <View style={[styles.container, Theme.box, Theme.mt10]}>
                                        <Title data={'机构评级概况'} navigation={navigation} screenUrlInfo={{ screenUrl: 'PingjiJG', tabId: null }} />
                                        <View style={styles.listBox}>
                                            <View style={styles.hdContainer}>
                                                <View style={styles.listNo}><Text style={styles.hdText}>排名</Text></View>
                                                <View style={styles.listplatName}><Text style={styles.hdText}>平台名称</Text></View>
                                                <View style={styles.listscore}><Text style={styles.hdText}>综合指数</Text></View>
                                                <View style={styles.listKeywords}><Text style={styles.hdText}>关键字</Text></View>

                                            </View>
                                            {
                                                dataSource.gradelist.map((item, i) => {
                                                    return (
                                                        <List data={item} index={i} key={i} navigation={navigation} borderNot={dataSource.flowlist.length - 1 == i ? true : false} />
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                    <View style={[styles.container, Theme.box, Theme.mt10]}>
                                        <Title data={'健康度分析'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Health', tabId: null }} />
                                        <View style={styles.listBox}>
                                            <View style={styles.hdContainer}>
                                                <View style={styles.listNo}><Text style={styles.hdText}>排名</Text></View>
                                                <View style={styles.listplatName}><Text style={styles.hdText}>平台名称</Text></View>
                                                <View style={styles.listscore}><Text style={styles.hdText}>综合健康度</Text></View>
                                                <View style={styles.listKeywords}><Text style={styles.hdText}>关键字</Text></View>

                                            </View>
                                            {
                                                dataSource.dlplist.map((item, i) => {
                                                    return (
                                                        <List data={item} index={i} key={i} navigation={navigation} borderNot={dataSource.flowlist.length - 1 == i ? true : false} />
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                    <View style={[styles.container, Theme.box, Theme.mt10]}>
                                        <Title data={'流量监控'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Flow', tabId: null }} />
                                        <View style={styles.listBox}>
                                            <View style={styles.hdContainer}>
                                                <View style={styles.listNo}><Text style={styles.hdText}>排名</Text></View>
                                                <View style={styles.listplatName}><Text style={styles.hdText}>平台名称</Text></View>
                                                <View style={styles.listscore}><Text style={styles.hdText}>流量综合指数</Text></View>
                                                <View style={styles.listKeywords}><Text style={styles.hdText}>关键字</Text></View>

                                            </View>
                                            {
                                                dataSource.flowlist.map((item, i) => {
                                                    return (
                                                        <List data={item} index={i} key={i} navigation={navigation} borderNot={dataSource.flowlist.length - 1 == i ? true : false} />
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>

                                </ScrollView>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    openControlPanel() {
        this.props.openControlPanel();
    }
    componentDidMount() {
        this.getData()
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData();
    }
    getData() {
        let that = this;
        let url = Api.gradeHome;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                that.setState({
                                    dataSource: responseData.data,
                                    loading: false,
                                    isRefreshing: false,
                                })
                            }
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
    listBox: {
        paddingTop: 15,
        paddingLeft: 17,
    },
    hdContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    hdText: {
        fontSize: 11,
        color: '#999',
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listNo: {
        paddingRight: 10,
        width: 34,
        alignItems: 'center',
    },
    listNoText: {
        fontSize: 12,
        color: '#666',
    },
    listplatName: {
        paddingRight: 6,
        width: 76,
    },
    listplatNameText: {
        fontSize: 12,
        color: '#666',
    },
    listscore: {
        width: 80,
    },
    listscoreText: {
        fontSize: 14,
        color: Theme.color,
        fontWeight: 'bold',
    },
    listKeywords: {
        flexDirection: 'row',
    },
    key: {
        width: 50,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BBE2FF',
        borderRadius: 3,
    },
    key2: {
        marginLeft: 5,
        width: 90,
    },
    keyNull: {
        backgroundColor: '#ddd',
    },
    keyText: {
        fontSize: 10,
        color: '#fff',
    },
})