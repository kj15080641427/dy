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
import Flood from './Flood';
import { getCountStation } from '@app/data/request';
class rwvData extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            raincount: {},
            watercount: {},
            vodeocount: {},
            floodcount: {}
        };
    }
    render() {
        console.log("Test this.props.match", this.props.match, this.props.location);
        const { TabPane } = Tabs;
        const { raincount, watercount, floodcount } = this.state
        // const operations = <Button>Extra Action</Button>;
        return (
            <>
                <Tabs
                // tabBarExtraContent={operations}
                >
                    <TabPane tab="雨量站" key="1">
                        <Rain raincount={raincount}></Rain>
                    </TabPane>
                    <TabPane tab="水位站" key="2">
                        <Water watercount={watercount}></Water>
                    </TabPane>
                    <TabPane tab="易涝点" key="3">
                        <Flood floodcount={floodcount}></Flood>
                    </TabPane>
                    <TabPane tab="视频站点" key="4">
                        <Vodeo></Vodeo>
                    </TabPane>
                </Tabs>
            </>
        );
    }
    componentDidMount() {
        getCountStation({
        }).then((result) => {
            this.setState({
                raincount: result.data[0],
                watercount: result.data[1],
                floodcount: result.data[2]
                // vodeocount: result.data[2],
            })
        })
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