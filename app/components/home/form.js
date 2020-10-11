import React from "react";
import { Button, Form } from "antd";

const DYForm = (props) => {
  const {
    onFinish,
    formItem = [],
    name,
    formRef,
    id,
    showCancel = false,
    cancelClick,
  } = props;

  return (
    <Form
      name={name}
      onFinish={onFinish}
      ref={formRef}
      labelCol={{ span: 5 }}
    >
      {formItem.map((item, index) => (
        <Form.Item
          labelAlign="right"
          label={item.label}
          name={item.name}
          key={index}
          rules={item.rules}
          width={item.width}
          // required
        >
          {item.ele}
        </Form.Item>
      ))}

      <Form.Item name={id}></Form.Item>
      <Form.Item>
        <div
          style={
            showCancel ? { display: "flex", justifyContent: "center" } : {}
          }
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          {showCancel ? (
            <Button style={{ marginLeft: "50px" }} onClick={cancelClick}>
              取消
            </Button>
          ) : (
            ""
          )}
        </div>
      </Form.Item>
    </Form>
  );
};
export default DYForm;
