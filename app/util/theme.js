
'use strict';

import { PixelRatio, Dimensions } from 'react-native';

module.exports = {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    bgColor: '#f1f1f1',
    color: '#0096E6',
    color2:'#007DDC',
    fund1Color:'#4AB3FF',
    fund2Color:'#C69C6D',
    fund3Color:'#916DDE',
    container: {
        flex: 1,
        backgroundColor: '#007DDC',
    },
    content:{
         flex: 1,
          backgroundColor: '#f1f1f1',
    },
    box:{
        backgroundColor: '#fff',
        borderBottomColor:'#ddd',
    },
    flexDrow: {
        flexDirection: 'row',
    },
    flexBtrow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mt5: {
        marginTop: 5,
    },
    mt10: {
        marginTop: 10,
    },
    mt15: {
        marginTop: 15,
    },
    mt20: {
        marginTop: 20,
    },
    red: {
        color: 'red'
    },
    c666: {
        color: '#666',
    },
    upColor:'#E51C23',
    downColor:'#009963',
};