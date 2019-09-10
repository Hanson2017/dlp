import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

export default class FilterBtn extends Component {
    render() {
        const that = this.props.that;
        const label = this.props.label;
        const index = this.props.index;
        const isShowFilter = that.state.isShowFilter[index];
        return (
            <TouchableOpacity style={styles.screen} onPress={() => {
                if (isShowFilter) {
                    that.showFilter(index)
                    that.inAnimated(index)
                }
                else {
                    that.cancelFilter(index)
                }

            }}>
                <Text style={[styles.screenText, isShowFilter ? null : styles.onScreenText]}>{label}</Text>
                <Animated.View style={{
                    transform: [{
                        rotate: that.state.offset[index].interpolate({
                            inputRange: [0, 180],
                            outputRange: ['0deg', '180deg']
                        }),
                    }]
                }} >

                    <Icon name={'triangle-down'} size={10} color={isShowFilter ? '#444' : '#3e80cc'} />
                </Animated.View>

            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    screenContainer: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 999,
    },
    screen: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenText: {
        marginRight: 3,
        color: '#333',
        fontSize: 13,
    },
    onScreenText: {
        color: '#3e80cc'
    },
})
