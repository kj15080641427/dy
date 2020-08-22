import React from "react";
import { Input, Button, Modal } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import DYTable from "@app/components/home/table";
import DYForm from "@app/components/home/form";
import { getSiteVeioData } from "@app/data/home";
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
    name: "address",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "地区名",
    name: "regionName",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },

  {
    label: "视频名称",
    name: "strname",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "设备唯一身份值",
    name: "strtoken",
    rules: [{ required: true }],
    ele: <Input></Input>,
  },
  {
    label: "视频地址",
    name: "strurl",
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
    dataIndex: "address",
  },
  {
    title: "地区名",
    dataIndex: "regionName",
  },
  {
    title: "视频名称",
    dataIndex: "strname",
  },
  {
    title: "设备唯一身份值",
    dataIndex: "strtoken",
  },
  {
    title: "视频地址",
    dataIndex: "strurl",
  },
];
class SiteRain extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputValue: "",
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.props.actions.getBase({
      request: getSiteVeioData,
      key: "siteVedio",
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
    const { siteVedio, loading, visible } = this.props;
    const { inputValue } = this.state;
    const getBaseHoc = (param = { current: 1, size: 10 }) => {
      return getBase({
        request: getSiteVeioData,
        key: "siteVedio",
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
        current: siteVedio?.current,
        size: siteVedio.size,
        recordLength: siteVedio.records.length,
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
              getBaseHoc({
                current: current,
                size: pagesize,
                strname: inputValue,
              });
            }}
          >
            查询
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              getBaseHoc();
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
          total={siteVedio?.total}
          dataSource={siteVedio?.records}
          current={siteVedio?.current}
          size={siteVedio?.size}
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
            name="siteVedio"
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
    siteVedio: state.currency.siteVedio,
    loading: state.management.loading,
    visible: state.currency.visible,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SiteRain);
