/**
 * Legend 2020-07-07
 */
import React from 'react';
import { Row, Col } from 'antd';

class Legend extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        return (
            <div className="dis-legrnd">
                <div className="dis-legrnd-left">

                </div>
                <div className="dis-legrnd-right">
                    <Row>无雨(0)</Row>  
                    <Row>无雨(0)</Row>
                </div>
            </div>
        );
    }
    componentDidMount() { }
}
export default Legend;