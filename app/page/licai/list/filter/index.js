import React, { Component } from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Modal } from 'antd-mobile';
import Icon from 'react-native-vector-icons/Icomoon';
import DatePicker from './DatePicker';
import Theme from '../../../../util/theme';
import Util from '../../../../util/util';

const areadata = [
    { 'name': '全国', 'code': '000000' },
    { 'name': '不限', 'code': '' },
    { 'name': '澳门', 'code': '820000' },
    { 'name': '安徽', 'code': '340000' },
    { 'name': '北京', 'code': '110000' },
    { 'name': '重庆', 'code': '500000' },
    { 'name': '大连', 'code': '210200' },
    { 'name': '福建', 'code': '350000' },
    { 'name': '甘肃', 'code': '620000' },
    { 'name': '广东', 'code': '440000' },
    { 'name': '广西', 'code': '450000' },
    { 'name': '贵州', 'code': '520000' },
    { 'name': '河南', 'code': '410000' },
    { 'name': '河北', 'code': '130000' },
    { 'name': '湖南', 'code': '430000' },
    { 'name': '湖北', 'code': '420000' },
    { 'name': '黑龙江', 'code': '230000' },
    { 'name': '海南', 'code': '460000' },
    { 'name': '吉林', 'code': '220000' },
    { 'name': '辽宁', 'code': '210000' },
    { 'name': '江苏', 'code': '320000' },
    { 'name': '江西', 'code': '360000' },
    { 'name': '宁波', 'code': '330200' },
    { 'name': '内蒙古', 'code': '150000' },
    { 'name': '宁夏', 'code': '640000' },
    { 'name': '上海', 'code': '310000' },
    { 'name': '山东', 'code': '370000' },
    { 'name': '山西', 'code': '140000' },
    { 'name': '深圳', 'code': '440300' },
    { 'name': '四川', 'code': '510000' },
    { 'name': '青岛', 'code': '370200' },
    { 'name': '青海', 'code': '630000' },
    { 'name': '陕西', 'code': '610000' },
    { 'name': '天津', 'code': '120000' },
    { 'name': '台湾', 'code': '710000' },
    { 'name': '浙江', 'code': '330000' },
    { 'name': '厦门', 'code': '350200' },
    { 'name': '云南', 'code': '530000' },
    { 'name': '新疆', 'code': '650000' },
    { 'name': '香港', 'code': '810000' },
    { 'name': '西藏', 'code': '540000' },
    { 'name': '其他', 'code': '900000' }
]

export default class LicaiIndexFilterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isShow: false,
            fields: [],
            cpdjbm: '',
            cpms: '',
            fxjgms: '',
            cpzt: '',
            jglb: '',
            mjfsms: '',
            cplxms: '',
            cptzxzms: '',
            fxdjms: '',
            qxms: '',
            cpsylxms: '',
            tzzlxdm: '',
            mjqsrq: '',
            mjjsrq: '',
            cpxsqy: '',
            filterList: [
                {
                    label: '产品状态',
                    name: 'cpzt',
                    type: 'radio',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '预售',
                            val: '预售',
                            isShow: false
                        },
                        {
                            label: '在售',
                            val: '在售',
                            isShow: false
                        },
                        {
                            label: '续存',
                            val: '续存',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '机构类别',
                    name: 'jglb',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '城商行',
                            val: '城市商业银行',
                            isShow: false
                        },
                        {
                            label: '国有银行',
                            val: '国有商业银行',
                            isShow: false
                        },
                        {
                            label: '农商行',
                            val: '农村商业银行',
                            isShow: false
                        },
                        {
                            label: '外资银行',
                            val: '外资银行',
                            isShow: false
                        },
                        {
                            label: '股份制银行',
                            val: '股份制商业银行',
                            isShow: false
                        },
                        {
                            label: '农村信用社',
                            val: '农村信用社',
                            isShow: false
                        },
                        {
                            label: '其他',
                            val: '其他银行',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '募集方式',
                    name: 'mjfsms',
                    type: 'radio',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '公募',
                            val: '公募',
                            isShow: false
                        },
                        {
                            label: '私募',
                            val: '私募',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '运作模式',
                    name: 'cplxms',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '封闭式非净值型',
                            val: '封闭式非净值型',
                            isShow: false
                        },
                        {
                            label: '封闭式净值型',
                            val: '封闭式净值型',
                            isShow: false
                        },
                        {
                            label: '开放式非净值型',
                            val: '开放式非净值型',
                            isShow: false
                        },
                        {
                            label: '开放式净值型',
                            val: '开放式净值型',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '投资性质',
                    name: 'cptzxzms',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '固定收益',
                            val: '固定收益类',
                            isShow: false
                        },
                        {
                            label: '权益类',
                            val: '权益类',
                            isShow: false
                        },
                        {
                            label: '混合类',
                            val: '混合类',
                            isShow: false
                        },
                        {
                            label: '商品及金融衍生品类',
                            val: '商品及金融衍生品类',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '风险等级',
                    name: 'fxdjms',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '一级(低)',
                            val: '一级（低）',
                            isShow: false
                        },
                        {
                            label: '二级(中低)',
                            val: '二级（中低）',
                            isShow: false
                        },
                        {
                            label: '三级(中)',
                            val: '三级（中）',
                            isShow: false
                        },
                        {
                            label: '四级(中高)',
                            val: '四级（中高）',
                            isShow: false
                        },
                        {
                            label: '五级(高)',
                            val: '五级（高）',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '期限类型',
                    name: 'qxms',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: 'T+0产品',
                            val: 'T+0产品',
                            isShow: false
                        },
                        {
                            label: '7天以内',
                            val: '7天（含）以内',
                            isShow: false
                        },
                        {
                            label: '7天-1个月',
                            val: '7天-1个月（含）',
                            isShow: false
                        },
                        {
                            label: '1-3个月',
                            val: '1-3个月（含）',
                            isShow: false
                        },
                        {
                            label: '6个月',
                            val: '6个月(含)',
                            isShow: false
                        },
                        {
                            label: '12个月',
                            val: '6个12个月（含）',
                            isShow: false
                        },
                        {
                            label: '1年以上',
                            val: '1年以上',
                            isShow: false
                        }
                    ]
                },
                {
                    label: '收益类型',
                    name: 'cpsylxms',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '保证收益',
                            val: '保证收益',
                            isShow: false
                        },
                        {
                            label: '保本浮动收益',
                            val: '保本浮动收益',
                            isShow: false
                        },
                        {
                            label: '非保本浮动收益',
                            val: '非保本浮动收益',
                            isShow: false
                        }
                    ]
                },
                ,
                {
                    label: '产品类别',
                    name: 'tzzlxdm',
                    type: 'checkbox',
                    list: [
                        {
                            label: '不限',
                            val: '',
                            isShow: true
                        },
                        {
                            label: '一般个人客户',
                            val: '03',
                            isShow: false
                        },
                        {
                            label: '高资产净值客户',
                            val: '05',
                            isShow: false
                        }
                    ]
                }
            ],

        }
    }
    componentWillMount() {
        this.setState({
            fields: this.props.fields
        })
    }
    // 地区弹窗隐藏
    onCloseModal = () => {
        this.setState({
            modal: false,
        });
    }
    // 文本输入框
    onChangeInput = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    // 单选
    onPressRadio = (index, index2) => {
        this.setState({
            filterList: this.state.filterList.map((item, _index) => _index == index ? { ...item, list: item.list.map((item2, _index2) => _index2 == index2 ? { ...item2, isShow: true } : { ...item2, isShow: false }) } : item),
            [this.state.filterList[index].name]: this.state.filterList[index].list[index2].val
        });
    }
    // 多选
    onPressCheckbox = (index, index2) => {

        if (index2 === 0) {
            this.setState({
                filterList: this.state.filterList.map((item, _index) => _index == index ? { ...item, list: item.list.map((item2, _index2) => _index2 == index2 ? { ...item2, isShow: true } : { ...item2, isShow: false }) } : item),
                [this.state.filterList[index].name]: ''
            }, () => {

            });
        }
        else {
            this.setState({
                filterList: this.state.filterList.map((item, _index) => _index == index ? { ...item, list: item.list.map((item2, _index2) => _index2 === 0 ? { ...item2, isShow: false } : _index2 == index2 ? { ...item2, isShow: !item2.isShow } : item2) } : item),
            }, () => {
                const vals = [];
                for (let i = 0; i < this.state.filterList[index].list.length; i++) {
                    if (this.state.filterList[index].list[i].isShow) {
                        vals.push(this.state.filterList[index].list[i].val)
                    }
                }
                this.setState({
                    [this.state.filterList[index].name]: vals
                })
            })
        }
    }
    // 显示更多，隐藏更多
    onShow = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }
    // 获取日期
    onChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }
    render() {
        const { filterList, isShow } = this.state;
        const filterListNew = isShow ? filterList : filterList.slice(0, 3)

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.filterContainer}>
                        <Text style={styles.title}>筛选条件</Text>
                        <View style={[styles.filterItem, styles.filterItemInput]}>
                            <View style={styles.filterItemLeft}>
                                <Text style={styles.filterItemLeftText}>登记编码:</Text>
                            </View>
                            <View style={styles.filterItemRight}>
                                <TextInput style={styles.inputText} value={this.state.cpdjbm} onChangeText={(text) => { this.onChangeInput('cpdjbm', text) }} />
                            </View>
                        </View>
                        <View style={[styles.filterItem, styles.filterItemInput]}>
                            <View style={styles.filterItemLeft}>
                                <Text style={styles.filterItemLeftText}>产品名称:</Text>
                            </View>
                            <View style={styles.filterItemRight}>
                                <TextInput style={styles.inputText} value={this.state.cpms} onChangeText={(text) => { this.onChangeInput('cpms', text) }} />
                            </View>
                        </View>
                        <View style={[styles.filterItem, styles.filterItemInput]}>
                            <View style={styles.filterItemLeft}>
                                <Text style={styles.filterItemLeftText}>发行机构:</Text>
                            </View>
                            <View style={styles.filterItemRight}>
                                <TextInput style={styles.inputText} value={this.state.fxjgms} onChangeText={(text) => { this.onChangeInput('fxjgms', text) }} />
                            </View>
                        </View>
                        {
                            filterListNew.map((item, i) => {
                                return (
                                    <View style={[styles.filterItem, styles.filterItemCheck]} key={i}>
                                        <View style={[styles.filterItemLeft, styles.filterItemLeftCheck]}>
                                            <Text style={styles.filterItemLeftText}>{item.label}:</Text>
                                        </View>
                                        <View style={styles.filterItemRight}>
                                            <View style={styles.filterItemRightRow}>
                                                {
                                                    item.list.map((item2, i2) => {
                                                        if (item2.val == '') {
                                                            return (
                                                                <TouchableOpacity style={[styles.filterBtn, item2.isShow ? styles.filterBtnActivity : null]} key={i2} onPress={() => {
                                                                    if (item.type == 'checkbox') {
                                                                        this.onPressCheckbox(i, i2)
                                                                    }
                                                                    else {
                                                                        this.onPressRadio(i, i2)
                                                                    }

                                                                }}>
                                                                    <Text style={[styles.filterBtnText, item2.isShow ? styles.filterBtnActivityText : null]}>{item2.label}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    })
                                                }
                                            </View>
                                            <View style={styles.filterItemRightRow}>
                                                {
                                                    item.list.map((item2, i2) => {
                                                        if (item2.val !== '') {
                                                            return (
                                                                <TouchableOpacity style={[styles.filterBtn, item2.isShow ? styles.filterBtnActivity : null]} key={i2} onPress={() => {
                                                                    if (item.type == 'checkbox') {
                                                                        this.onPressCheckbox(i, i2)
                                                                    }
                                                                    else {
                                                                        this.onPressRadio(i, i2)
                                                                    }
                                                                }}>
                                                                    <Text style={[styles.filterBtnText, item2.isShow ? styles.filterBtnActivityText : null]}>{item2.label}</Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        <View style={[styles.filterItem, styles.filterItemInput]}>
                            <View style={styles.filterItemLeft}>
                                <Text style={styles.filterItemLeftText}>募集日期:</Text>
                            </View>
                            <View style={[styles.filterItemRight, styles.filterItemRightDate]}>
                                <Text style={styles.filterItemRightDateText}>从</Text>
                                <DatePicker that={this} name={'mjqsrq'} ref={'DatePicker'} />
                                <Text style={styles.filterItemRightDateText}>到</Text>
                                <DatePicker that={this} name={'mjjsrq'} ref={'DatePicker2'} />
                            </View>
                        </View>
                        {
                            isShow ?
                                <View style={[styles.filterItem, styles.filterItemInput]}>
                                    <View style={styles.filterItemLeft}>
                                        <Text style={styles.filterItemLeftText}>销售区域:</Text>
                                    </View>
                                    <View style={[styles.filterItemRight, styles.filterItemRightDate]}>
                                        <TouchableOpacity onPress={() => { this.setState({ modal: true }) }} style={styles.formInput}>
                                            <Text style={styles.formInputText}>{this.state.cpxsqy !== '' ? this.state.cpxsqy.name : ''}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                null
                        }

                        <TouchableOpacity style={styles.showFilters} onPress={this.onShow}>
                            <Icon name={isShow ? 'triangleHollow-up' : 'triangleHollow-down'} size={20} color={'#999'} />
                            <Text style={styles.showFiltersText}>{isShow ? '收起列表' : '展开列表'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.title}>选择展示要素</Text>
                        <View style={[styles.fieldCon, styles.fieldDefault]}>
                            {
                                this.state.fields.map((item, i) => {
                                    if (i < 5) {
                                        return (
                                            <TouchableOpacity style={[styles.fieldBtn, item.isShow ? styles.fieldBtnActivity : null]} key={i} onPress={() => { this._onPress(i) }}>
                                                <Text style={[styles.fieldBtnText, item.isShow ? styles.fieldBtnTextActivity : null]} numberOfLines={1}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }

                                })
                            }
                        </View>
                        <View style={[styles.fieldCon, styles.fieldOptional]}>
                            {
                                this.state.fields.map((item, i) => {
                                    if (i >= 5) {
                                        return (
                                            <TouchableOpacity style={[styles.fieldBtn, item.isShow ? styles.fieldBtnActivity : null]} key={i} onPress={() => { this._onPress(i) }}>
                                                <Text style={[styles.fieldBtnText, item.isShow ? styles.fieldBtnTextActivity : null]} numberOfLines={1}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }

                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    popup
                    visible={this.state.modal}
                    onClose={this.onCloseModal}
                    maskClosable={true}
                    animationType="slide-up"
                    afterClose={() => { alert('afterClose'); }}
                >
                    <View style={styles.areaModalContainer}>
                        {
                            areadata.map((item, i) => {
                                return (
                                    <TouchableOpacity style={styles.areaModalItem} key={i} onPress={() => {
                                        this.setState({
                                            cpxsqy: item
                                        }, () => {
                                            this.onCloseModal()
                                        })

                                    }}>
                                        <Text style={styles.areaModalItemText}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </Modal>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={[styles.submitBtn, styles.submitResetBtn]} onPress={this._onReset}>
                        <Text style={[styles.submitBtnText, styles.submitResetBtnText]}>重置</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.submitBtn, styles.submitSearchBtn]} onPress={this._onSearch}>
                        <Text style={[styles.submitBtnText, styles.submitSearchBtnText]}>查询</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    // 选择或取消选择要素
    _onPress = (index) => {
        this.setState({
            fields: this.state.fields.map((item, _index) => _index == index ? { ...item, isShow: !item.isShow } : item)
        })
    }
    // 重置
    _onReset = () => {
       
        this.setState({
            fields: this.props.fields,
            cpdjbm: '',
            cpms: '',
            fxjgms: '',
            cpzt: '',
            jglb: '',
            mjfsms: '',
            cplxms: '',
            cptzxzms: '',
            fxdjms: '',
            qxms: '',
            cpsylxms: '',
            tzzlxdm: '',
            mjqsrq: '',
            mjjsrq: '',
            cpxsqy: '',
            filterList: this.state.filterList.map((item, _index) => { return { ...item, list: item.list.map((item2, _index2) => _index2 === 0 ? { ...item2, isShow: true } : { ...item2, isShow: false }) } })
        })
        this.refs.DatePicker.reset();
        this.refs.DatePicker2.reset();
    }
    // 提交查询
    _onSearch = () => {
        let surl = '';
        const { that } = this.props;
        const { cpdjbm, cpms, fxjgms, cpzt, jglb, mjfsms, cplxms, cptzxzms, fxdjms, qxms, cpsylxms, tzzlxdm, mjqsrq, mjjsrq, cpxsqy } = this.state;

        const jglbStr = jglb.toString();
        const cplxmsStr = cplxms.toString();
        const cptzxzmsStr = cptzxzms.toString();
        const fxdjmsStr = fxdjms.toString();
        const qxmsStr = qxms.toString();
        const cpsylxmsStr = cpsylxms.toString();
        const tzzlxdmStr = tzzlxdm.toString();
        const cpxsqyStr = cpxsqy !== '' ? cpxsqy.code : '';


        surl = '&cpdjbm=' + cpdjbm + '&cpms=' + cpms + '&fxjgms=' + fxjgms + '&cpzt=' + cpzt + '&jglb=' + jglbStr + '&mjfsms=' + mjfsms + '&cplxms=' + cplxmsStr + '&cptzxzms=' + cptzxzmsStr + '&fxdjms=' + fxdjmsStr + '&qxms=' + qxmsStr + '&cpsylxms=' + cpsylxmsStr + '&tzzlxdm=' + tzzlxdmStr + '&mjqsrq=' + mjqsrq + '&mjjsrq=' + mjjsrq + '&cpxsqy=' + cpxsqyStr;

        that.setState({
            fields: this.state.fields,
            surl: surl
        }, () => {
            that.getData();
            that.setState({
                open: false,
            })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        ...Util.ifIphoneX(
            {
                paddingTop: 50
            },
            {
                paddingTop: 30
            }
        )
    },
    title: {
        marginBottom: 15,
        fontSize: 14,
        color: '#515151',
    },
    filterContainer: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    filterItem: {
        flexDirection: 'row',
    },
    filterItemInput: {
        marginBottom: 12,
        alignItems: 'center',
    },
    filterItemCheck: {
        marginBottom: 12,
    },
    filterItemLeft: {
        width: 60,
    },
    filterItemLeftCheck: {
        height: 24,
        justifyContent: 'center',
    },
    filterItemLeftText: {
        fontSize: 12,
        color: '#999',
    },
    filterItemRight: {
        flex: 1,
    },
    filterItemRightDate: {
        flexDirection: 'row',
    },
    filterItemRightRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filterItemRightDateText: {
        paddingLeft: 5,
        paddingRight: 5,
        lineHeight: 26,
        fontSize: 14,
        color: '#666',
    },
    inputText: {
        padding: 0,
        flex: 1,
        height: 28,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        color: '#999',
        fontSize: 12,
        paddingLeft: 5,
    },
    formInput: {
        paddingLeft: 10,
        flex: 1,
        height: 28,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    formInputText: {
        color: '#999',
        fontSize: 12,
    },
    showFilters: {
        marginTop: 10,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showFiltersText: {
        paddingLeft: 5,
        fontSize: 12,
        color: '#999',
    },
    filterBtn: {
        marginRight: 10,
        marginBottom: 10,
        height: 24,
        minWidth: 72,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
    },
    filterBtnActivity: {
        borderColor: '#007DDC',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    filterBtnText: {
        fontSize: 12,
        color: '#999',
    },
    filterBtnActivityText: {
        color: '#007DDC',
    },
    fieldContainer: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    fieldCon: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    fieldOptional: {
        marginTop: 5,
        paddingTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    fieldBtn: {
        marginRight: 10,
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        width: 90,
        height: 22,
        overflow: 'hidden',
        backgroundColor: '#eee',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fieldBtnText: {
        fontSize: 12,
        color: '#999',
    },
    fieldBtnActivity: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007DDC',
    },
    fieldBtnTextActivity: {
        color: '#007DDC',
    },
    areaModalContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        ...Util.ifIphoneX(
            {
                paddingBottom: 20
            }
        )
    },
    areaModalItem: {
        marginBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        width: Theme.screenWidth / 7,
        height: 20,
    },
    areaModalItemText: {
        fontSize: 12,
        color: '#999',
    },
    submitContainer: {
        borderTopColor: '#999',
        borderTopWidth: 1,
        height: 50,
        flexDirection: 'row',
    },
    submitBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitSearchBtn: {
        backgroundColor: '#1989FA'
    },
    submitBtnText: {
        fontSize: 16,
        color: '#999',
    },
    submitSearchBtnText: {
        color: '#fff',
    },
})