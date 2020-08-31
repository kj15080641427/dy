import React from "react";
import BaseLayout from "../../connectComponents";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../../redux/actions";
import { Input, Select, Button, Modal } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import BaseDict from "../../site/baseDict";
import SiteDike from "../../site/siteDike";
import SiteGate from "../../site/siteGate";
import SiteVideo from "../../site/siteVideo";

import SitePump from "../../site/sitePump";

// import SiteVideo from "../../site/siteVideo";
// import SiteGate from "../../site/siteGate";
// import SiteVideo from "../../site/siteVideo";
import {
  getSiteBase,
  delSiteBase,
  addSiteBase,
  updSiteBase,
} from "@app/data/home";
const formItem = [
  {
    label: "站点名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "详细地址",
    name: "address",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "别名",
    name: "aliasName",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "经度",
    name: "lon",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "纬度",
    name: "lat",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
];
const { Option } = Select;

const rowSelect = [
  { label: "名称", name: "name", element: <Input></Input> },
  // {
  //   label: "来源",
  //   name: "dataSource",
  //   element: (
  //     <Select style={{ width: 200 }}>
  //       <Option value={null}>全部</Option>
  //       <Option value={1}>水文局</Option>
  //       <Option value={2}>气象局</Option>
  //       <Option value={3}>水务局积水点</Option>
  //       <Option value={4}>农村基层防汛监测预警平台</Option>
  //       <Option value={5}>河道</Option>
  //       <Option value={6}>河口区水利局</Option>
  //       <Option value={7}>水务局河道</Option>
  //       <Option value={8}>广饶县</Option>
  //       <Option value={9}>开发区城管局</Option>
  //       <Option value={10}>天鹅湖蓄滞洪区</Option>
  //     </Select>
  //   ),
  // },
  // {
  //   label: "测站检测类型",
  //   name: "indtype",
  //   element: (
  //     <Select style={{ width: 200 }}>
  //       <Option value={null}>全部</Option>
  //       <Option value={1}>水文</Option>
  //       <Option value={2}>区域水文</Option>
  //       <Option value={3}>降水</Option>
  //       <Option value={4}>中小河流水文</Option>
  //       <Option value={5}>中小河流降水</Option>
  //       <Option value={6}>自建降水</Option>
  //       <Option value={7}>中小河流水位</Option>
  //       <Option value={8}>水位</Option>
  //       <Option value={9}>积水点水位站(易捞点)</Option>
  //       <Option value={10}>积水点雨量站</Option>
  //       <Option value={11}>天鹅湖蓄滞洪区</Option>
  //     </Select>
  //   ),
  // },
];

class BaseStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "video",
    };
  }

  componentDidMount() {}
  render() {
    const { hideRPModal, siteRelation } = this.props.actions;
    const { modalVisible } = this.props;
    const { selected } = this.state;
    const columns = [
      {
        title: "站名",
        dataIndex: "name",
        ellipsis: true,
      },
      {
        title: "别名",
        dataIndex: "aliasName",
        ellipsis: true,
      },
      {
        title: "详细地址",
        dataIndex: "address",
        ellipsis: true,
      },
      {
        title: "纬度",
        dataIndex: "lat",
      },
      {
        title: "经度",
        dataIndex: "lon",
      },
      {
        title: "创建时间",
        dataIndex: "gmtcreate",
      },
      {
        title: "修改时间",
        dataIndex: "gmtmodify",
        ellipsis: true,
      },
      {
        title: "关联",
        dataIndex: "",
        render: (e) => {
          return (
            <Button
              onClick={(row) => {
                siteRelation();
              }}
              icon={<SwapOutlined />}
            >
              关联
            </Button>
          );
        },
      },
    ];
    return (
      <>
        <BaseLayout
          get={getSiteBase} //分页查询接口
          add={addSiteBase} //添加数据接口
          upd={updSiteBase} //更新数据接口
          del={delSiteBase} //删除数据接口
          columns={columns} //表格配置项
          formItem={formItem} //表单配置项
          rowSelect={rowSelect} //查询配置项
          keyId={"siteBaseID"} // 数据的唯一ID
          storeKey={"baseStation"} //store中的key值. 要与 mapStatetoProps 中的key相同
        >
          <Modal
            width={"80%"}
            title={`关联`}
            visible={modalVisible}
            maskClosable={false}
            destroyOnClose
            okText="关联"
            onOk={() => {
              // setRolePermission({
              //   roleId: row.roleId,
              //   permissionIdList: permissionList,
              // });
            }}
            onCancel={() => {
              hideRPModal();
            }}
          >
            <Select
              style={{ width: 200 }}
              defaultValue="video"
              onChange={(e) =>
                this.setState({
                  selected: e,
                })
              }
            >
              <Option value="video">视频</Option>
              <Option value="rain">雨量</Option>
              <Option value="water">水位</Option>
              <Option value="point">积水点</Option>
              <Option value="dike">堤防工程</Option>
              <Option value="reservoir">水库信息</Option>
              <Option value="river">河流信息</Option>
              <Option value="pump">泵站信息</Option>
              <Option value="gate">闸信息</Option>
            </Select>
            {selected == "video" ? (
              <SiteVideo />
            ) : selected === "gate" ? (
              <SiteGate />
            ) : selected === 'dike'?<SiteDike/> :''}
          </Modal>
        </BaseLayout>
      </>
    );
  }
}
const parentMapStateToProps = (state) => {
  return {
    modalVisible: state.management.modalVisible,
  };
};
const parentMapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(
  parentMapStateToProps,
  parentMapDispatchToProps
)(BaseStation);
