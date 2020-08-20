import React from "react";
import { Table, Input, Button, Form, Modal, Radio, Popconfirm } from "antd";
import { CloseCircleOutlined, FormOutlined } from "@ant-design/icons";

export default (props) => {
  const {
    confirm,
    update,
    loading,
    columns,
    dataSource,
    rowkey,
    pagination,
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
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
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
  return (
    <Table
      columns={[...columns, ...columnsBase]}
      loading={loading}
      dataSource={dataSource}
      scroll={{ y: 700 }}
      rowKey={(row) => rowkey(row)}
      pagination={pagination}
    />
  );
};
