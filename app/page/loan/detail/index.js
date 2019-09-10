import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loading from '../../../component/loading';
import Theme from '../../../util/theme';
import Api from '../../../util/api';
import Util from '../../../util/util';
import NavBar from '../../../component/navBar';


export default class LoanDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            proname: '',
            loading: true,
            dataSource: null
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            id: params.id,
            proname: params.proname
        })
    }
    render() {
        const { navigation } = this.props;
        const { loading, proname, dataSource } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }} forceInset={{ bottom: 'never' }} >
                <NavBar headerOpt={{ back: '贷款详情', title: proname, search: true }} navigation={navigation} />
                <View style={Theme.content}>
                    {
                        loading ?
                            <Loading />
                            :
                            <ScrollView style={styles.listContainer}>
                                <View style={styles.detailTop}>
                                    <View style={styles.detailHeaderBox}>
                                        <View style={styles.detailHeader}>
                                            <View style={styles.detailLogoBox}>
                                                <Image style={styles.logo} resizeMode={'contain'} source={{ uri: Api.domain + '/' + dataSource.propic }} />

                                            </View>
                                            <View>
                                                <Text style={styles.headerTitle}>{dataSource.proname}</Text>
                                                <Text style={styles.headerNum}>额度范围：<Text style={styles.red}>{dataSource.amount_min}-{dataSource.amount_max}</Text></Text>
                                                <Text style={styles.headerNum}>贷款期限：<Text style={styles.red}>{dataSource.term_min}-{dataSource.term_max}{dataSource.term_unit == '月' ? '个' : null}{dataSource.term_unit}</Text></Text>

                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.loanInfo}>
                                        <View style={styles.tagLine}>
                                            <Ionicons name={'ios-checkmark'} size={22} color={Theme.color2} />
                                            <Text style={styles.tag}> {dataSource.fast_day}天放款</Text>
                                        </View>
                                        <View style={styles.tagLine}>
                                            <Ionicons name={'ios-checkmark'} size={22} color={Theme.color2} />
                                            <Text style={styles.tag}> 月费率{dataSource.rate_month}%</Text>
                                        </View>


                                    </View>
                                </View>
                                <View style={[styles.detailBox, { marginTop: 10, }]}>
                                    <View style={styles.detailBoxHeader}><Text style={styles.detailBoxHeaderText}>申请条件</Text></View>
                                    <View style={styles.detailBoxBody}>
                                        <Text style={styles.detailBoxText}>{dataSource.condition}</Text>
                                    </View>
                                </View>
                                <View style={[styles.detailBox, { marginTop: 10, }]}>
                                    <View style={styles.detailBoxHeader}><Text style={styles.detailBoxHeaderText}>所需材料</Text></View>
                                    <View style={styles.detailBoxBody}>
                                        <Text style={styles.detailBoxText}>{dataSource.information}</Text>

                                    </View>
                                </View>
                            </ScrollView>
                    }

                    <TouchableOpacity style={styles.submit} onPress={()=>{this.onSubmit(dataSource.linkurl_h5 !== ''?dataSource.linkurl_h5:dataSource.linkurl)}}>
                        <Text style={styles.submitText}>申请借款</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.getData();
    }
    getData() {

        const that = this;

        const url = Api.loanDetail + 'id=' + this.state.id;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()

                        .then((responseData) => {
                            
                            if (responseData.result == 1) {
                                that.setState({
                                    dataSource: responseData.data,
                                    loading: false
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
    onSubmit=(url)=> {
        Util.Linked(url)
    }

}

const styles = StyleSheet.create({
    red: {
        color: 'red',
    },
    listContainer: {
        flex: 1,
    },
    detailTop: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    detailHeaderBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingTop: 20,
        paddingBottom: 10,
        marginBottom: 10,
    },
    detailHeader: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    detailLogoBox: {
        marginRight: 15,
        width: 76,
        height: 76,
        borderWidth: 1,
        borderColor: '#d8d9dc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 50,
        height: 50,
    },
    headerTitle: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerNum: {
        marginTop: 9,
        color: '#999',
        fontSize: 13,
    },
    loanInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagLine: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tag: {
        marginRight: 20,
        color: '#999',
        fontSize: 12,
    },



    detailBox: {
        backgroundColor: '#fff',
    },
    detailBoxHeader: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    detailBoxHeaderText: {
        color: '#999',
        fontSize: 13,
    },
    detailBoxBody: {
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    detailBoxText: {
        lineHeight: 22,
        color: '#999',
        fontSize: 12,
    },
    submit: {
        height: 48,
        backgroundColor: '#e84b4c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
