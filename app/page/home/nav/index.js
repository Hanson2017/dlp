import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Util from '../../../util/util';
import Api from '../../../util/api';
var data = [
    { title: '机构评级', iconName: 'nav-pingjiJG', screenUrl: 'PingjiJG', tabId: null },
    { title: '健康度分析', iconName: 'nav-health', screenUrl: 'Health', tabId: null },
    { title: '数据详情', iconName: 'nav-data', screenUrl: 'Data', tabId: null },
    { title: '示范投资', iconName: 'nav-fund', screenUrl: 'Fund', tabId: null },
    { title: '数据报表', iconName: 'nav-report', screenUrl: 'ReportsList' },
    
    { title: '评测监控', iconName: 'nav-pingce', screenUrl: 'PingCe', tabId: null },
    { title: '舆论监控', iconName: 'nav-yulun', screenUrl: 'Yulun', tabId: null },
    { title: '点评监控', iconName: 'nav-dianping', screenUrl: 'CommentPlat', tabId: null },
    { title: '流量监控', iconName: 'nav-flow', screenUrl: 'Flow', tabId: null },
    { title: '多维度查询', iconName: 'nav-query', screenUrl: 'QueryNav', tabId: { tab1: 0, tab2: 0 } },
    
   
    
    { title: '黑名单', iconName: 'nav-black', screenUrl: 'Black' },
    { title: '争议名单', iconName: 'nav-zhengyi', screenUrl: 'Zhengyi' },
    { title: '个人中心', iconName: 'nav-personal', screenUrl: 'Account' ,tabId: 0 },

];


export default class Nav extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.container, Theme.mt10, Theme.box]}>

                <Title data={'快捷菜单'} />
                <View style={styles.navList}
                    onTouchStart={() => {
                        this.setState({
                            isSearchListHide: true
                        })
                    }}
                >

                    {
                        data.map((column, i) => {
                            let screenUrl = column.screenUrl;
                            if (versionStatus != 1) {
                                if(i != 10){
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => { navigation.navigate(screenUrl, { tabId: column.tabId }) }}
                                            style={[styles.nav]}
                                            key={i}
                                        >
                                            {
                                                column.iconName == 'null' ?
                                                    <Ionicons name={column.ionicons} size={26} color={'#007ddc'} />
                                                    :
                                                    <Icon name={column.iconName} size={26} color={'#007ddc'} />
                                            }
                                            <Text style={[styles.textStyle]}>{column.title}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                else{
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => { Util.goBBs(navigation,Api.bbsHome); }}
                                            style={[styles.nav]}
                                            key={i}
                                        >
                                            {
                                                column.iconName == 'null' ?
                                                    <Ionicons name={column.ionicons} size={26} color={'#007ddc'} />
                                                    :
                                                    <Icon name={column.iconName} size={26} color={'#007ddc'} />
                                            }
                                            <Text style={[styles.textStyle]}>{column.title}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                                
                            }
                            else{
                                if(i != 3 && i != 4){
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            onPress={() => { navigation.navigate(screenUrl, { tabId: column.tabId }) }}
                                            style={[styles.nav]}
                                            key={i}
                                        >
                                            {
                                                column.iconName == 'null' ?
                                                    <Ionicons name={column.ionicons} size={26} color={'#007ddc'} />
                                                    :
                                                    <Icon name={column.iconName} size={26} color={'#007ddc'} />
                                            }
                                            <Text style={[styles.textStyle]}>{column.title}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            }
                            
                        })}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {

    },
    navList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 15,
        paddingLeft: 10,
    },
    nav: {
        paddingTop: 16,
        width: (Theme.screenWidth - 20) / 5,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textStyle: {
        marginTop: 6,
        color: '#30333b',
        fontSize: Theme.screenWidth >= 375 ? 12 : 11,
    },
})