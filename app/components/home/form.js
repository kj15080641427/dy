import React from "react";
import { Button, Form } from "antd";

const DYForm = (props) => {
  const { onFinish, formItem = [], name, formRef, id } = props;

  return (
    <Form name={name} onFinish={onFinish} ref={formRef}>
      {formItem.map((item, index) => (
        <Form.Item
          label={item.label}
          name={item.name}
          key={index}
          rules={item.rules}
          // required
        >
          {item.ele}
        </Form.Item>
      ))}
      <Form.Item name={id}></Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};
export default DYForm;
