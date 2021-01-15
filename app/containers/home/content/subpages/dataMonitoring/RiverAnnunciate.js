// /**
//  * RiverAnnunciate 2020-07-25
//  * 河道通告报表
//  */
// import React from "react";
// import { Table, Button, Input } from "antd";
// import { tableColumnRiver } from "./columns/columsData";
// import { downlRiverdata } from "@app/data/request";
// // import "./style.scss";
// class RiverAnnunciate extends React.PureComponent {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       data: [],
//       loding: false,
//       time: "",
//       name: "",
//     };
//     this.init = this.init.bind(this);
//   }
//   onChange = (e) => {
//     this.setState({
//       name: e.target.value,
//     });
//   };
//   downl = () => {
//     var url = "/api/download/river";
//     if (this.state.time !== "") {
//       url += "?tm=" + this.state.time;
//     }
//     window.location.href = url;
//   };
//   render() {
//     return (
//       <>
//         <div className="view-query">
//           <div className="view-query">
//             <Input
//               placeholder="输入河流名称"
//               onChange={(e) => this.onChange(e)}
//             ></Input>
//           </div>
//           <Button type="primary" size="large" onClick={this.init}>
//             查询
//           </Button>
//           {/* <Button type="primary" size="large" onClick={this.downl}>
//             导出
//           </Button> */}
//         </div>

//         <br />
//         <Table
//           columns={tableColumnRiver}
//           dataSource={this.state.data}
//           loading={this.state.loding}
//         ></Table>
//       </>
//     );
//   }
//   init() {
//     this.setState({
//       loding: true,
//     });
//     downlRiverdata({
//       current: 0,
//       name: this.state.name,
//       size: 10,
//     }).then((result) => {
//       this.setState({
//         data: result.data.records,
//         loding: false,
//       });
//     });
//   }
//   componentDidMount() {
//     this.init();
//   }
// }
// export default RiverAnnunciate;

import React from "react";
import { tableColumnRiver } from "./columns/columsData";
import BaseLayout from "../connectComponents";
import { Input } from "antd";
import {
  delSiteRiver,
  getSiteRiver,
  addSiteRiver,
  updSiteRiver,
} from "@app/data/home";

const formItem = [
  {
    label: "河流名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "流域名称",
    name: "basin",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "经度",
    name: "lonsrs",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "纬度",
    name: "latsrs",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "河口经度",
    name: "londest",
    ele: <Input></Input>,
  },
  {
    label: "河口纬度",
    name: "latdest",
    ele: <Input></Input>,
  },
  {
    label: "河源地址",
    name: "regionsrs",
    ele: <Input></Input>,
  },
  {
    label: "河口地区",
    name: "regiondest",
    ele: <Input></Input>,
  },

  {
    label: "河源详细地址",
    name: "regionsrs",
    ele: <Input></Input>,
  },

  {
    label: "河口地址信息",
    name: "addressdest",
    ele: <Input></Input>,
  },
  {
    label: "上一级河流",
    name: "riverlevelabove",
    ele: <Input></Input>,
  },
  {
    label: "流经范围",
    name: "flowrange",
    ele: <Input.TextArea></Input.TextArea>,
  },
  {
    label: "河流总长",
    name: "riverlen",
    ele: <Input></Input>,
  },
  {
    label: "流域总面积",
    name: "riverarea",
    ele: <Input></Input>,
  },
  {
    label: "东营流域面积",
    name: "riveraready",
    ele: <Input></Input>,
  },
  {
    label: "防洪量最小",
    name: "antifloodflowmin",
    ele: <Input></Input>,
  },
  {
    label: "防洪量最大",
    name: "antifloodflowmax",
    ele: <Input></Input>,
  },
  {
    label: "流经东营长度",
    name: "riverlendy",
    ele: <Input></Input>,
  },
];
// 表格配置

const rowSelect = [{ label: "名称", name: "name", element: <Input></Input> }];

class RiverAnnunciate extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BaseLayout
        get={getSiteRiver} // 分页查询接口
        add={addSiteRiver} // 添加数据接口
        upd={updSiteRiver} // 更新数据接口
        del={delSiteRiver} // 删除数据接口
        columns={tableColumnRiver} // 表格配置项
        formItem={formItem} // 表单配置项
        keyId={"gateID"} // 数据的唯一ID
        storeKey={"SiteRiver"} // store中的key值
        rowSelect={rowSelect}
      ></BaseLayout>
    );
  }
}

export default RiverAnnunciate;
