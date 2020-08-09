import React, {Component} from 'react';
import {Button, Row, Col} from 'antd';
import '../style.scss';


const defaultStyle = {
  container: {
    width: 200,
    padding: 10,
  },
  item: {
    padding: 5
  }
};

class RainSwitcher extends Component{
  constructor(props){
    super(props);

    this.buttons = [
      {
        text: '当前',
      },
      {
        text: '前1小时',
      },
      {
        text: '前3小时',
      },
      {
        text: '前12小时',
      },
      {
        text: '前24小时',
      }
    ];

    this.state = {
      selectedButton :this.buttons[0]
    };


  }
  render(){
    let style = this.props.style? this.props.style : defaultStyle.container;
    let itemStyle = this.props.itemStyle ? this.props.itemStyle : defaultStyle.item;

    return (
      <div style={style}>
        {
          this.buttons.map(item => {
            let type = (item === this.state.selectedButton) ? 'default' : 'primary';

            return (
              <Row style={itemStyle}>
                <Col span={24}>
                  <Button type={type} block onClick={this.onButtonClick.bind(this, item)} size={'large'}>
                    {item.text}
                  </Button>
                </Col>
              </Row>
            )
          })
        }
      </div>
    );
  }

  onButtonClick(item){
    if(this.state.selectedButton !== item){
      this.setState({selectedButton: item});
    }
  }
}

export default RainSwitcher;
