import React, { useState } from "react";
import { Table, Form, Button, Modal, Card, Input } from "antd";
import "./index.scss";
export default () => {
  const [visible, setVisible] = useState(false);

  const columns = [
    {
      title: "方案名称",
      dataIndex: "name",
    },
    {
      title: "适用类型",
      dataIndex: "name2",
    },
    {
      title: "创建时间",
      dataIndex: "name3",
    },
    {
      title: "维护时间",
      dataIndex: "name4",
    },
    {
      width: "200px",
      title: "操作",
      dataIndex: "",
      render: () => (
        <div>
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            编辑
          </Button>
          <Button>删除</Button>
        </div>
      ),
    },
  ];
  const onSearch = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Form onFinish={onSearch}>
        <div className="dispaych-search-layout">
          <Form.Item label="" name="name">
            <Input id="input"></Input>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
          <Button>重置</Button>
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            新增
          </Button>
        </div>
      </Form>
      <Table
        columns={columns}
        dataSource={[
          {
            name: "1",
            name2: "2",
            name3: "3",
            name4: "4",
          },
        ]}
        rowKey="name"
      ></Table>
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        <div className="dispatch-layout">
          <div>
            {[1, 2, 3, 4].map((item, index) => (
              <Card key={index} title="组织指挥" extra={<a>删除</a>}>
                <div>指挥组织</div>
                <div>哈哈哈哈哈卡刷点卡还是</div>
              </Card>
            ))}
          </div>
          <Card title="调度方案">
            <Form>
              <Form.Item label="标题">
                <Input></Input>
              </Form.Item>
              <Form.Item label="">
                <Input></Input>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Modal>
    </div>
  );
};
