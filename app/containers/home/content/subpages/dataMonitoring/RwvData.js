/**
 * rain 2020-06-7
 * zdl
 * 雨情信息
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '@app/redux/actions/home';
import { Tabs, Button } from 'antd';
import Rain from "./Rain";
import Water from "./Water";
import Vodeo from './Vodeo';
class rwvData extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false
        };
    }
    render() {
        console.log("Test this.props.match", this.props.match, this.props.location);
        const { TabPane } = Tabs;

        // const operations = <Button>Extra Action</Button>;
        return (
            <>
                <Tabs
                // tabBarExtraContent={operations}
                >
                    <TabPane tab="雨量站" key="1">
                        <Rain></Rain>
                    </TabPane>
                    <TabPane tab="水位站" key="2">
                        <Water></Water>
                    </TabPane>
                    <TabPane tab="视频站点" key="3">
                        <Vodeo></Vodeo>
    </TabPane>
                </Tabs>
            </>
        );
    }
    componentDidMount() {

    }
}
function mapStateToProps(state) {
    return {
        test: state.home.test,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(rwvData);