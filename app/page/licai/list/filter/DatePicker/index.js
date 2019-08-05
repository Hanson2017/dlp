import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { DatePicker, } from 'antd-mobile';
import ListItem from './listItem';
import Util from '../../../../../util/util';

export default class DatePickerC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <DatePicker
                minDate={new Date(2019, 1, 1)}
                mode="date"
                title="请选择"
                extra=""
                value={this.state.value}
                onChange={value => this.setState({ value })}
                onOk={e => {

                    this.props.that.onChange(this.props.name, Util.setDate2(e))
                }}
            >
                <ListItem></ListItem>
            </DatePicker>
        )
    }
    reset = () => {
        this.state = {
            value: null,
        };
    }
    show = () => {
        this.setState({
            visible: true
        })
    }
    componentWillMount() {

        const { value } = this.props;

        if (value !== '') {
            this.setState({
                date: new Date(value)
            })
        }
    }
}

