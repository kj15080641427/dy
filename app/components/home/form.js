import React from "react";
import { Button, Form, Popconfirm, Space } from "antd";

const DYForm = (props) => {
  const {
    onFinish,
    formItem = [],
    name,
    formRef,
    showCancel = false,
    cancelClick,
    showDelete = false,
    deleteClick,
  } = props;

  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      {formItem.map((item, index) => (
        <Form.Item
          labelAlign="left"
          label={item.label}
          name={item.name}
          key={index}
          rules={item.rules}
          width={item.width}
          style={item.style}
          // required
        >
          {item.ele}
        </Form.Item>
      ))}

      {/*<Form.Item name={id}/>*/}
      <Form.Item style={{ textAlign: "right" }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          {showDelete ? (
            <Popconfirm
              title="事件相关调度信息也将删除,是否确认删除?"
              onConfirm={deleteClick}
            >
              <Button style={{ marginLeft: "50px" }}>删除事件</Button>
            </Popconfirm>
          ) : (
            ""
          )}
          {showCancel ? <Button onClick={cancelClick}>取消</Button> : ""}
        </Space>
      </Form.Item>
    </Form>
  );
};
export default DYForm;
