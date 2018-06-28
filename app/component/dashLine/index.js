import React from 'react'
import {
    View,
    ART
} from 'react-native'

const { Surface, Shape, Path } = ART;

export default class DashLine extends React.Component {

    render() {

        const path = Path()
            .moveTo(1, 1)
            .lineTo(this.props.width, 1);

        return (
            <Surface width={this.props.width} height={1}>
                <Shape d={path} stroke="#ddd" strokeWidth={2} strokeDash={[2, 5]} />
            </Surface>
        )
    }
}
