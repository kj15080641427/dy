import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Card, Input, message } from "antd";
import {
  addProgramme,
  getProgramme,
  updProgramme,
  delProgramme,
  queryProgramme,
  //子方案
  addProgrammeSon,
  getProgrammeSon,
  updProgrammeSon,
  delProgrammeSon,
} from "@app/data/home";
import "./index.scss";
export default () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [sonPrograme, setSonPrograme] = useState([]);
  useEffect(() => {
    getProgramme({
      size: 10,
      current: 1,
    }).then((res) => {
      setDataSource(res.data.records);
    });
  }, []);
  const columns = [
    {
      title: "方案名称",
      dataIndex: "name",
    },
    {
      title: "适用类型",
      dataIndex: "type",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "维护时间",
      dataIndex: "repairTime",
    },
    {
      width: "200px",
      title: "操作",
      dataIndex: "",
      render: (_, row) => (
        <div>
          <Button
            onClick={() => {
              console.log(row);
              queryProgramme(row.programmeId).then((res) => {
                setSonPrograme(res.data.programmeSonList);
              });
              setVisible(true);
            }}
          >
            编辑
          </Button>
          <Button
            onClick={() => {
              delProgramme(row.programmeId).then((res) =>
                message.info("删除成功")
              );
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  const onSearch = (values) => {
    console.log(values);
  };
  const add = (values) => {
    addProgramme(values);
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
      <Table columns={columns} dataSource={dataSource} rowKey="name"></Table>
      <Modal visible={visible} onCancel={() => setVisible(false)}>
        <div className="dispatch-layout">
          <div>
            {sonPrograme?.map((item, index) => (
              <Card
                key={index}
                title={item.name}
                extra={
                  <a
                    onClick={() => {
                      delProgrammeSon(item.programmeSonId);
                    }}
                  >
                    删除
                  </a>
                }
              >
                <div>{item.content}</div>
              </Card>
            ))}
          </div>
          <Card title="调度方案">
            <Form onFinish={add}>
              <Form.Item label="方案名称">
                <Input></Input>
              </Form.Item>
              <Form.Item label="适用类型">
                <Input></Input>
              </Form.Item>
              <Button htmlType="submit">新增</Button>
            </Form>
          </Card>
        </div>
      </Modal>
    </div>
  );
};
