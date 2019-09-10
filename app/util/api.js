'use strict';

const domain="http://www.dailuopan.com";
// const domain="http://192.168.1.18:8080";

const host = domain+"/MPAPI";
const hostbbs = 'http://bbs.dailuopan.com/api/';


module.exports = {
    domain: domain,
    home_all:host+'/GetHome_all',
    home:host+'/GetHome',
    gradeHome:host+'/GetGradeHome',
    dataHome:host+'/GetdataHome',
    sentHome:host+'/GetsentHome',
    findHome:host+'/GetfindHome',
    
    pingji: host + '/GetGradeList',  //评级
    data: host + '/GetDataList',    //数据详情
    health: host + '/GetHealthList',//健康度
    flow: host + '/GetFlowList',//流量
    query: host + '/GetqueryHome',//多维度导航
    rongzi: host + '/GetPlatbackList',//融资背景
    yewu: host + '/GetServicetypeList',//业务类型
    diqu: host + '/GetPlatListAll',//地区、上线时间、存管
    black: host + '/GetBlackList',//黑名单
    zhengyi: host + '/GetYujingList',//争议
    gongshangList: host + '/GetGongshangList',//工商变更列表
    flmfList: host + '/GetFlmfListAll',//优惠活动
    fund: host + '/GetFundList',//示范资金
    yulun: host + '/GetYulunList',//舆论监控
    fiveYears: host + '/GetOldList',//五年老平台
    search: host + '/GetSearch', //搜索
    getSearchTop:host + '/GetSearchTop', //热门搜索
    detail: host + '/GetPlatdetail',//详情页
    helpList: host + '/GetHelpList',//常见问题列表
    helpDetail: host + '/GetHelpdetail',//常见问题详情
    getUserinfo: host + '/GetUserinfo', //QQ,wechat 登录
    attentionAdd: host + '/Member_follow_addplat', //添加关注
    attentionDel: host + '/Member_follow_delplat', //取消关注
    isAttention: host + '/Member_follow_hasplat', //是否关注了该平台  
    attentionList: host + '/Member_follow_getplatlist', //关注列表 
    getqqun: host + '/GetQQqun', //获取QQ群信息 
    getReportsList: host + '/GetReportsList', //数据报表列表
    getReportsDetail: host + '/GetReportsDetail', //数据报表列表
    getReportsDetail_dlp: host + '/GetReportsDetail_dlp', //贷罗盘数据报表列表
    pingCeList: host + '/GetMparticleList', //评测列表
    pingCeList_new: host + '/GetMparticleList_new', //评测列表(new)
    pingCeList_hot: host + '/GetMparticleHotList', //评测列表(new)
    pingCeDetail: host + '/GetArticledetail', //评测详情
    pingCeCommentList: host + '/Getcomment_article_page', //评测详情
    pingCeCommentAdd: host + '/Addcomment_article_json', //评测详情
    commentList_plat:host+'/Getcomment_p2p_page_list', //全部平台点评列表
    commentListNew:host+'/Getcomment_p2p_page', //评论列表
    commentAdd:host+'/Addcomment_p2p_json', //添加评论
    commentList: 'http://www.76676.com/index.php?m=member&c=index&a=public_getcomment_dlp&p2pid=',
    commentListAccount:host+'/Member_comment_list', //账户中心评论列表
    isCollection:host+'/Member_collection_hasmp', //是否已收藏(?memberid=3&cid=4701)
    collectionAdd:host+'/Member_collection_addmp', //添加收藏(?memberid=3&cid=4701)
    collectiondel:host+'/Member_collection_delmp', //取消收藏(?memberid=3&cid=4701)
    collectionList:host+'/Member_collection_getmplist', //获取用户收藏列表(?memberid=3&page=1&pagesize=10)
    bbs:hostbbs+'dlp_getapp.php?',  //论坛
    bbsHome:'http://bbs.dailuopan.com/',
    bbsHejUrl:'http://bbs.dailuopan.com/forum.php?mod=forumdisplay&fid=2', //论坛华尔街的旗帜板块
    bbsBgtUrl:'http://bbs.dailuopan.com/forum.php?mod=forumdisplay&fid=36', //论坛曝光台板块
    bbsHejIconUrl:'http://m.dailuopan.com/images/hejicon.gif', //论坛华尔街的旗帜板块
    bbsBgtIconUrl:'http://m.dailuopan.com/images/bgticon.png', //论坛曝光台板块
    synLogin:'http://www.dailuopan.com/member/login/App_reurl?',
    licaiList: host + '/GetLcinfoList_search?tdsourcetag=s_pcqq_aiomsg&',  //银行理财列表
    licaiDetail: host + '/GetLcinfo_Detail',  //银行理财详情
    licaiContrast: host + '/GetLcinfo_Contrast',  //银行理财对比
    stopSent: host + '/GetStopbidList',  //停止发标

    trustlist: host + '/GetTrustinfoList',  //信托列表
    trustDetail: host + '/GetTrustinfo_Detail',  //信托详情
    trustYuqing_list: host + '/GetTrust_newsList',  //信托舆情列表
    trustYuqing_detail: host + '/GetTrust_newsdetail',  //信托舆情详情

    loanlist: host + '/GetLoan_productList?',  //贷款列表
    loanDetail: host + '/GetLoan_productdetail?',  //贷款详情

    activitylist: host + '/GetActivityList?',  //返利列表
    activityDetail: host + '/GetActivityDetail?',  //返利详情
    activityDetailComment: host + '/GetActivityCommentList',//返利详情评论
    activityDetailAddComment: host + '/Addcommentmulti',//返利详情提交回帖

    memberSet: host + '/memberSet?memberid=',
    memberModSet_alipay:host+'/memberModSet_alipay', //快捷设置修改支付宝
    memberModSet_contact:host+'/memberModSet_contact', //快捷设置修改设置或添加设置（id  当新增时id=0）
    memberModSet_contact_del:host+'/memberModSet_contact_del', //快捷设置删除（memberid，id）

    getActivityRecordList: host + '/Getmemberlist',//返利记录列表
    delActivityComment:host+'/memberdelcomment',//删除返利记录
    getActivityComment: host + '/GetmembercommentRow',//获取编辑返利记录数据
    saveActivityComment: host + '/membermodcomment',//保存编辑返利记录数据
    
}