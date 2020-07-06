/**
 * Tables 2020-07-06
 */
import React from 'react';
import "./style.scss";
import TableWrap from "./table/TableWrap";
import { Table } from 'antd';
class Tables extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
    return ( 
      <div className="dis-tables">
        <div className="dis-table-btns">
          dis-table-btns
        </div>
        <div className="dis-table-con">
          <TableWrap title={"雨量站(120)"} extra={"单位mm"}>
            <Table columns={columns} dataSource={data} />
          </TableWrap>
          <TableWrap title={"雨量站(120)"} >
            <Table columns={columns} dataSource={data} />
          </TableWrap>
          <TableWrap title={"雨量站(120)"} >
            <Table columns={columns} dataSource={data} />
          </TableWrap>
          <TableWrap title={"雨量站(120)"} >
            <Table columns={columns} dataSource={data} />
          </TableWrap>
        </div>
      </div>
    );
  }
  componentDidMount() {}
}
export default Tables;