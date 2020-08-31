import React from "react";
import { Table, Input, Button, Form, Modal, Radio, Popconfirm } from "antd";
import { CloseCircleOutlined, FormOutlined } from "@ant-design/icons";

export default (props) => {
  const {
    confirm,
    update,
    loading,
    dataSource,
    rowkey,
    total,
    current,
    size,
    changePage,
    onShowSizeChange,
    rowSelection,
    columns = [],
    showEdit=true
  } = props;
  const columnsBase = [
    {
      title: "操作",
      dataIndex: "isShow",
      className: "column-money",
      width: 200,
      fixed: "right",
      render: (isShow, row) => {
        return (
          <Radio.Group value="large">
            <Popconfirm
              title="确定永久删除该数据吗?"
              onConfirm={() => confirm(row)}
              okText="确定"
              cancelText="取消"
            >
              <Button icon={<CloseCircleOutlined />}>删除</Button>
            </Popconfirm>
            <Button onClick={() => update(row)} icon={<FormOutlined />}>
              修改
            </Button>
          </Radio.Group>
        );
      },
    },
  ];
  let pagination = {
    total: total,
    size: "default",
    current: current,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: (current) => changePage(current),
    pageSize: size,
    onShowSizeChange: (current, pageSize) => {
      //设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      onShowSizeChange(current, pageSize);
    },
    showTotal: () => `共${total}条`,
  };
  return (
    <Table
      columns={showEdit?[...columns,...columnsBase]:columns}
      loading={loading}
      dataSource={dataSource}
      scroll={{ y: 700 }}
      rowKey={(row) => rowkey(row)}
      pagination={pagination}
      rowSelection={rowSelection}
      // {...props}
    />
  );
};
