import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';

import Top from './top';
import Fund from './fund';
import Pingji from './pingji';
import Health from './health';
import Pingce from './pingce';
import Comment from './comment';
import Yulun from './yulun';
import Flow from './flow';
import User from './user';
import Gudong from './gudong';
import Shouyiren from './shouyiren';

export default class Zonglan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: null,
            isRefreshing: false,
        };
    }
    render() {
        const { platInfo, dataInfo, navigation } = this.props;
        const { loading, dataSource } = this.state;
        if (loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <Top navigation={navigation} data={{
                        platName: platInfo.platName,
                        fundType: dataSource.fund == null ? null : dataSource.fund.fund_type,
                        uptime: dataSource.uptime,
                        acurl: '',
                        siteurl: dataSource.siteurl,
                        mpcount: dataSource.mpcount,
                        commentcount: dataSource.commentcount,
                        sentcount: dataSource.sentcount,
                        platinfo: dataSource.platinfo,
                        flmllist: dataSource.flmllist,
                        dataInfo: dataInfo
                    }} />
                    {
                        versionStatus != 1 && platInfo.platstatus == 1 && dataSource.fund !== null ?
                            <Fund data={dataSource.fund} dataInfo={dataInfo} fundelse={dataSource.fundelse} platName={platInfo.platName} platId={platInfo.id} navigation={navigation} />
                            :
                            null
                    }

                    <Pingji data={dataSource.dataDetail} navigation={navigation} platInfo={platInfo} />
                    {
                        platInfo.platstatus == 1 ?
                            <Health data={dataSource.healthDetail} dataDlp={dataSource.dataDetail.dlp} listdata={dataSource.listdata} platstatus={platInfo.platstatus} navigation={navigation} />
                            :
                            null
                    }

                    <Pingce data={dataSource.mplist} navigation={navigation} />
                    <Yulun data={dataSource.sentlist} navigation={navigation} />
                    <Comment data={dataSource.commentlist} navigation={navigation} />
                    <Gudong data={dataSource.gudongxinxi} navigation={navigation} />
                    <Shouyiren data={dataSource.shouyiren} navigation={navigation} />
                    
                    <Flow data={dataSource.flow} navigation={navigation} />
                    <User dataAge={dataSource.age} dataReplat={dataSource.replat} navigation={navigation} platName={platInfo.platName} />

                    
                </ScrollView>
            )
        }

    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'home', id)
    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'home', id)
    }
}