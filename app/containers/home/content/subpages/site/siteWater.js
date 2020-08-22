import React from "react";
import { Input, Button, Modal } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import DYTable from "@app/components/home/table";
import DYForm from "@app/components/home/form";
import { getSiteWaterData } from "@app/data/home";
import "../../../style.scss";

const formItem = [
  {
    label: "名称",
    name: "name",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "地址",
    name: "stlc",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "流域名称",
    name: "bsnm",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },

  {
    label: "行政区划码",
    name: "addvcd",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "距河口距离",
    name: "distancetoport",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "河流名称",
    name: "rvnm",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
];
//表格配置
const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  {
    title: "地址",
    dataIndex: "stlc",
  },
  {
    title: "流域名称",
    dataIndex: "bsnm",
  },
  {
    title: "行政区划码",
    dataIndex: "addvcd",
  },
  {
    title: "距河口距离",
    dataIndex: "distancetoport",
  },
  {
    title: "河流名称",
    dataIndex: "rvnm",
  },
];
class SiteWater extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputValue: "",
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    // this.props.actions.hideModal()
    this.props.actions.getBase({
      request: getSiteWaterData,
      key: "siteWater",
    });
  }

  render() {
    const {
      getBase,
      addSiteWater,
      showModal,
      hideModal,
      deleteSiteWater,
      updateSiteWater,
    } = this.props.actions;
    const { siteWater, loading, visible } = this.props;
    const { inputValue } = this.state;
    const getBaseHoc = (param = { current: 1, size: 10 }) => {
      return getBase({
        request: getSiteWaterData,
        key: "siteWater",
        param: param,
      });
    };
    //翻页
    function changePage(current) {
      getBaseHoc({ current: current, size: 10 });
    }
    //
    function onShowSizeChange(current, pagesize) {
      getBaseHoc({ current: current, size: pagesize });
    }
    //删除
    function confirm(row) {
      deleteSiteWater({
        id: row.siteWaterLevelsID,
        current: siteWater?.current,
        size: siteWater.size,
        recordLength: siteWater.records.length,
      });
    }
    /**
     * 修改
     * @param {id} values
     */
    const update = (row) => {
      this.formRef.current.setFieldsValue(row);
      showModal();
    };
    //提交
    function onFinish(values) {
      values.siteWaterLevelsID ? updateSiteWater(values) : addSiteWater(values);
    }
    return (
      <>
        <div className="view-query">
          <div>
            <Input
              value={inputValue}
              onChange={(e) => {
                this.setState({
                  inputValue: e.target.value,
                });
              }}
              placeholder="输入站点名称"
            ></Input>
          </div>
          <Button
            type="primary"
            onClick={() => {
              getBaseHoc({ current: 1, size: 10, name: inputValue });
            }}
          >
            查询
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              getBaseHoc()
              this.setState({
                inputValue: "",
              });
            }}
          >
            重置
          </Button>
          <Button onClick={() => showModal()}>添加</Button>
        </div>
        <DYTable
          columns={columns}
          loading={loading}
          total={siteWater?.total}
          dataSource={siteWater?.records}
          current={siteWater?.current}
          size={siteWater?.size}
          rowkey={(row) => row.siteWaterLevelsID}
          changePage={(cur) => changePage(cur)}
          onShowSizeChange={(cur, size) => {
            onShowSizeChange(cur, size);
          }}
          confirm={confirm}
          update={update}
        ></DYTable>
        <Modal
          title="新增"
          visible={visible}
          forceRender={true}
          onCancel={() => hideModal()}
          footer={null}
          maskClosable={false}
          afterClose={() => this.formRef.current.resetFields()}
        >
          <DYForm
            id="siteWaterLevelsID"
            formRef={this.formRef}
            name="siteWater"
            formItem={formItem}
            onFinish={onFinish}
          ></DYForm>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log(state, "STATE");
  return {
    siteWater: state.currency.siteWater,
    loading: state.management.loading,
    visible: state.currency.visible,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SiteWater);
