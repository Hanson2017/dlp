import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";


import DrawerScreen from '../page/MainNavigator';

import Home from '../page/home';
import PingjiJG from '../page/pingji/jigou';
import PingjiMT from '../page/pingji/meiti';
import Health from '../page/health';
import Flow from '../page/flow';
import Data from '../page/data';
import ReportsList from '../page/report';
import ReportsDetail from '../page/report/detail';
import Query from '../page/query';
import QueryNav from '../page/query/entry';
import PingCe from '../page/pingCe';
import PingCeDetail from '../page/pingCe/detail';
import PingCeCommentList from '../page/pingCe/comments'
import Yulun from '../page/yulun';
import YulunDetail from '../page/yulun/detail';
import CommentPlat from '../page/comment';
import FlmfList from '../page/activity';
import Fund from '../page/fund';
import ShowPic from '../page/fund/showPic';
import PicList from '../page/fund/picList';
import Zhengyi from '../page/zhengyi';
import Black from '../page/black';
import GongshangBG from '../page/gongshangbiangeng';
import Account from '../page/account';
import Help from '../page/help';
import HelpDetail from '../page/help/detail';
import About from '../page/about';
import FriendsShare from '../page/friendsShare';
import Search from '../page/search';
import Detail from '../page/detail';
import DetailFumian from '../page/detail/fumian';
import DetailFund from '../page/detail/fund/index2';
import DetailBiangeng from '../page/detail/info/gudong/biangengList';
import DetailBuiltBrowsing from '../page/detail/builtBrowsing';
import CommentForm from '../page/detail/yuqing/comments/form';
import PingCeCommentForm from '../page/pingCe/comments/footForm/index';

import BBsDetail from '../page/bbs/detail';
import BBs from '../page/bbs';

import LicaiList from '../page/licai/list/';
import LicaiDetail from '../page/licai/detail';
import LicaiContrast from '../page/licai/contrast';
import StopSent from '../page/stopSent';


import Login from '../page/account/login';

const AppDlp = StackNavigator({
    Main: {
        screen: DrawerScreen,
        navigationOptions: {
            headerMode: 'none',
        }
    },
    Home: {
        screen: Home
    },
    PingjiJG: {
        screen: PingjiJG
    },
    PingjiMT: {
        screen: PingjiMT
    },
    Health: {
        screen: Health
    },
    Flow: {
        screen: Flow
    },
    Data: {
        screen: Data
    },
    ReportsList: {
        screen: ReportsList
    },
    ReportsDetail: {
        screen: ReportsDetail
    },
    Query: {
        screen: Query
    },
    QueryNav: {
        screen: QueryNav
    },
    PingCe: {
        screen: PingCe
    },
    PingCeDetail: {
        screen: PingCeDetail
    },
    PingCeCommentList: {
        screen: PingCeCommentList
    },
    Yulun: {
        screen: Yulun
    },
    YulunDetail: {
        screen: YulunDetail
    },
    CommentPlat: {
        screen: CommentPlat
    },
    FlmfList: {
        screen: FlmfList
    },
    Fund: {
        screen: Fund
    },
    ShowPic:{
        screen:ShowPic
    },
    Zhengyi: {
        screen: Zhengyi
    },
    PicList:{
        screen:PicList
    },
    Black: {
        screen: Black
    },
    GongshangBG: {
        screen: GongshangBG
    },
    Account: {
        screen: Account
    },
    Help: {
        screen: Help
    },
    HelpDetail: {
        screen: HelpDetail
    },
    About: {
        screen: About
    },
    FriendsShare: {
        screen: FriendsShare
    },
    Search: {
        screen: Search
    },
    Detail: {
        screen: Detail
    },
    DetailFumian: {
        screen: DetailFumian
    },
    DetailFund: {
        screen: DetailFund
    },
    DetailBiangeng: {
        screen: DetailBiangeng
    },
    DetailBuiltBrowsing:{
        screen:DetailBuiltBrowsing
    },
    CommentForm: {
        screen: CommentForm
    },
    PingCeCommentForm: {
        screen: PingCeCommentForm
    },

    Login: {
        screen: Login
    },
    BBs: {
        screen: BBs
    },
    BBsDetail: {
        screen: BBsDetail
    },
    LicaiList: {
        screen: LicaiList
    },
    LicaiDetail:{
        screen:LicaiDetail
    },
    LicaiContrast:{
        screen:LicaiContrast
    },
    StopSent:{
        screen:StopSent
    },

}, {
        headerMode: 'none'
    })


module.exports = AppDlp;
