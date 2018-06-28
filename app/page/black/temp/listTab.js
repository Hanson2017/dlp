import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import Util from '../../../util/util'
import Theme from '../../../util/theme'
import Loading from '../../../component/loading';
import stylesList from '../../../css/listData';

export default class BlackList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            dataSourceTab: [],
            tabList: [],
            totalNum: null,
            updatetime: null,
        };
    }
    render() {
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            let dataSource=this.state.dataSource;
            let dataSourceTab=this.state.dataSourceTab;
            return (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.listTab}>
                        {
                            dataSource.map((tab, i) => {                              
                                return (
                                    <TouchableOpacity 
                                        style={[styles.tab,dataSource[i].name == dataSourceTab.name?styles.tabActive:null,this.props.tabWidth?this.props.tabWidth:null]} 
                                        key={i} 
                                        activeOpacity={0.4}
                                        onPress={()=>{
                                            this.setState({
                                                dataSourceTab:dataSource[i]
                                            })
                                        }}>
                                        <Text style={[styles.tabText,,dataSource[i].name == dataSourceTab.name?styles.tabTextActive:null]}>
                                            {tab.name}{this.props.titleText?this.props.titleText:null}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={styles.listContent}>
                        <View style={styles.listTitle}>
                            <Text style={styles.listTitleText}>
                                {dataSourceTab.name}{this.props.titleText?this.props.titleText:null}（{dataSourceTab.count}家）
                            </Text>                           
                        </View>
                        <View style={styles.list}>
                        {
                            dataSourceTab.list.map((tab,i)=>{
                                return(
                                    <TouchableOpacity 
                                        style={styles.listName} key={i}
                                        onPress={() => { this.props.navigation.navigate('Detail', { id: tab.id_dlp, platName: tab.plat_name}) }}
                                    >
                                        <Text style={styles.listNameText} numberOfLines={1}>{tab.plat_name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        
                        }
                        </View>
                    </View>    
                </ScrollView>
            )
        }
    }
    componentDidMount() {
        Util.getDataListTab(this, this.props.type,0)
    }

}
const styles = StyleSheet.create({
    contentContainer:{
        paddingTop:20,
        backgroundColor:'#fff',
    },
    listTab: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft:10,
    },
    tab: {
        height: 24,
        width: 50,
        marginBottom: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 6,
    },
    tabActive:{
        borderColor: '#303030',
        backgroundColor: '#303030',
    },
    tabText:{
        color:'#bbb',
        fontSize:12,
    },
    tabTextActive:{
       color:'#fff', 
    },
    listContent:{
        paddingLeft:10,
    },
    listTitle:{
        marginTop:20,
        marginBottom:15,
    },
    listTitleText:{
        fontSize:12,
        color:'#A1A1A1',
    },
    list:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listName:{
        marginBottom:10,
        paddingRight:10,
         width: (Theme.screenWidth-20)/4,
        height:22,
    },
    listNameText:{
        color:'#707070',
        fontSize:11,
    }
})
