import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Theme from '../../../../../util/theme';
import Util from '../../../../../util/util';


export default class TrustDetailZonglanTop extends React.Component {

    render() {
        const { data} = this.props;
        return (
            <View style={[Theme.box, styles.container]}>
                <View style={styles.platInfo}>
                    <View style={styles.platInfoLeft}>
                        <View style={styles.platName}>
                            <Text style={styles.platNameText}>{data.trust_name}</Text>
                        </View>
                        <Text style={styles.platInfoLeftText}>成立时间：{data.creatyear}年</Text>
                        <TouchableOpacity
                            style={styles.siteurl}
                            onPress={() => {
                                Util.Linked(data.info_siteurl)
                            }}
                        >
                            <Text style={[styles.platInfoLeftText]}>官方网站：<Text style={styles.siteurlText}>{data.info_siteurl}</Text></Text>
                        </TouchableOpacity>
                    </View>
                   
                        
                </View>

            </View>
        )

    }
}
const styles = StyleSheet.create({

    container: {
        paddingBottom: 10,
    },
    platInfo: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    platInfoRight: {
        paddingLeft: 15,
        borderLeftWidth: 1,
        borderLeftColor: '#eee',
    },
    platInfoLeft: {
        width: Theme.screenWidth >= 375 ? 210 : 180,
    },
    platName: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    platNameText: {
        fontSize: 22,
        color: '#303030',
        fontWeight: 'bold',
    },
    siteurl: {
        marginTop: 8,
    },

    platInfoLeftText: {
        fontSize: 11,
        color: '#999',

    },
    siteurlText: {
        textDecorationLine: 'underline',
    },
    platInfoRightList: {
        paddingTop: 5,
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    platInfoRightListLabel: {
        fontSize: 11,
        color: '#999',
    },
    platInfoRightListNum: {
        fontSize: 12,
        color: Theme.color,
    },

   
    
})
