import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';


export default class CostInst extends Component {
    render() {
        const {goBack} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>利息和费用组成</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.list}>
                            <View><Text style={styles.listText}>月费率</Text></View>
                            <View><Text style={styles.listText}>7888元</Text></View>
                        </View>
                        <View style={styles.list}>
                            <View><Text style={styles.listText}>审批服务费</Text></View>
                            <View><Text style={styles.listText}>888元</Text></View>
                        </View>
                        <View style={styles.list}>
                            <View><Text style={styles.listText}>总共</Text></View>
                            <View><Text style={styles.listText}>7888元</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={()=>goBack()}>
                        <Icon name={'closeX'} size={50} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        opacity: 0.6,
        paddingBottom: 10,
    },
    body: {
        flex: 1,
        paddingTop: 80,
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    headerText: {
        color: '#fff'
    },
    list:{
        marginBottom:12,
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    listText:{
        color:'#fff',
        fontSize:13,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 70,
    }
})