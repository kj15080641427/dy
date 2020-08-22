import React from "react";
import { Table, Input, Button, Form } from "antd";

// class DYForm extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//     this.testRef = React.createRef();
//   }
//   render() {
//     const { onFinish, formItem = [], name } = this.props;
//     return (
//       <Form name={name} onFinish={onFinish} ref={this.testRef}>
//         {console.log(this.testRef, "childREF????")}
//         {formItem.map((item, index) => {
//           return (
//             <Form.Item
//               label={item.label}
//               name={item.name}
//               key={index}
//               rules={item.rules}
//             >
//               {item.ele}
//             </Form.Item>
//           );
//         })}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             提交
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }
const DYForm = (props) => {
  const { onFinish, formItem = [], name, formRef,id } = props;

  return (
    <Form name={name} onFinish={onFinish} ref={formRef}>
      {formItem.map((item, index) => {
        return (
          <Form.Item
            label={item.label}
            name={item.name}
            key={index}
            rules={item.rules}
            required
          >
            {item.ele}
          </Form.Item>
        );
      })}
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
