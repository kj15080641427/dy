/**
 * 雨量站点量级统计
 * 2020-08-01
 * phz
 */
import React, {PureComponent} from 'react';
import {Table} from 'antd';
import "../style.scss";

const rowColumns = [
  {
    title: '站点名称',
    dataIndex: 'name'
  },
  {
    title: '所属县区',
    dataIndex: 'region'
  },
  {
    title: '降雨量(mm)',
    dataIndex: 'drp'
  }
];


class RainStatistics extends PureComponent{
  constructor(props){
    super(props);

    this.bindData(props.dataSource);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.bindData(nextProps.dataSource);
  }

  bindData(dataSource){
    let data1 = dataSource ? dataSource[0]: [];
    let data2 = dataSource ? dataSource[1]: [];
    let data3 = dataSource ? dataSource[2]: [];
    let data4 = dataSource ? dataSource[3]:[];
    let data5 = dataSource ? dataSource[4]: [];
    let data6 = dataSource ? dataSource[5] : [];

    this.rainTypes = [
      {
        title: `特大暴雨(250mm以上)(${data1.length})`,
        key:1,
        dataSource: data1,
      },
      {
        title: `大暴雨(100~250mm)(${data2.length})`,
        key: 2,
        dataSource: dataSource ? dataSource[1]: null,
      },
      {
        title: `暴雨(50~100mm)(${data3.length})`,
        key: 3,
        dataSource: dataSource ? dataSource[2]: null,
      },
      {
        title: `大雨(25~50mm)(${data4.length})`,
        key: 4,
        dataSource: dataSource ? dataSource[3]:null,
      },
      {
        title: `中雨(10~25mm)(${data5.length})`,
        key: 5,
        dataSource: dataSource ? dataSource[4]: null,
      },
      {
        title: `小雨(0~10mm)(${data6.length})`,
        key: 6,
        dataSource: dataSource ? dataSource[5] : null,
      }
    ];
  }

  render(){
    return (
      <>
        <Table
          size={'small'}
          columns={[{dataIndex:'title', key: 'key'}]}
          dataSource={this.rainTypes}
          rowKey={(row) => row.key}
          expandable = {{expandedRowRender: this.tableRowRender.bind(this)}}
          showHeader={false}
          scroll={{ y: 350 }}
          pagination={false}
        />
      </>
    );
  }

  tableRowRender(record /*,index,*/ /*indent*/, /*expanded*/){
    return(
      <Table
        columns={rowColumns}
        size={'small'}
        scroll={{ y: 400 }}
        pagination={{
          defaultPageSize: 50,
        }}
        dataSource={record.dataSource}
        onRow={this.onRow.bind(this)}
      />
    );
  }

  onRow(record){
    return {
      onClick: () => {
        this.props.onRowClick &&
          this.props.onRowClick(record);
      },
      onDoubleClick: () => {
        this.props.onRowDoubleClick &&
          this.props.onRowDoubleClick(record);
      }
    }
  }
}

export default RainStatistics;
