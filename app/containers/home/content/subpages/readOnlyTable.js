/**
 * Expert 2020-06-04
 * zdl
 * 专家库
 */
import React from "react";
import { Table, Button, Form } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

class ReadOnlyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.props.get().then((res) =>
      this.setState({
        loading: false,
        data: res.data,
      })
    );
  }

  render() {
    const { rowSelect = [], get, columns = [], rowKey } = this.props;
    const onFinish = (values) => {
      this.setState({
        loading: true,
      });
      get(values).then((res) =>
        this.setState({
          loading: false,
          data: res.data,
        })
      );
    };
    const onReset = () => {
      this.setState({
        loading: true,
      });
      this.formRef.current.resetFields();
      get().then((res) =>
        this.setState({
          loading: false,
          data: res.data,
        })
      );
    };
    const { data, loading } = this.state;
    return (
      <>
        <Form ref={this.formRef} layout="inline" onFinish={onFinish}>
          {rowSelect.map((item) => (
            <Form.Item label={item.label} name={item.name} key={item.name}>
              {item.element}
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={onReset} icon={<RedoOutlined />}>
              重置
            </Button>
          </Form.Item>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(row) => row[rowKey]}
          loading={loading}
        />
      </>
    );
  }
}
ReadOnlyTable.propTypes = {
  rowSelect: PropTypes.array,
  get: PropTypes.func,
  columns: PropTypes.array,
  rowKey: PropTypes.string,
  loading: PropTypes.bool,
};
export default ReadOnlyTable;
