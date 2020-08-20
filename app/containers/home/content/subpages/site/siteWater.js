import React from "react";
import { Table, Input, Button, Form, Modal, Radio, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import { CloseCircleOutlined, FormOutlined } from "@ant-design/icons";
import DYTable from "@app/components/home/table";
import "../../../style.scss";

const fromSet = [
  {
    label: "名称",
    name: "name",
    ele: <Input></Input>,
  },
  {
    label: "地址",
    name: "stlc",
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
    ];
class SiteWater extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputValue: "",
    };
  }

  componentDidMount() {
    this.props.actions.getSiteWaterAction();
  }

  render() {
    const {
      getSiteWaterAction,
      addSiteWater,
      showModal,
      hideModal,
      deleteSiteWater,
    } = this.props.actions;
    const { siteWater, loading, visible } = this.props;
    const { inputValue } = this.state;

    //翻页
    function changePage(current) {
      getSiteWaterAction({
        current: current,
        size: 10,
      });
    }
    //
    function onShowSizeChange(current, pagesize) {
      getSiteWaterAction({
        current: current,
        size: pagesize,
      });
    }
    //删除
    function confirm(row) {
      deleteSiteWater(row.siteWaterLevelsID);
    }
    /**
     * 修改
     * @param {id} values
     */
    function update() {}
    //提交
    function onFinish(values) {
      addSiteWater(values);
    }
    let pagination = {
      total: siteWater?.total,
      size: "default",
      current: siteWater?.current,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (current) => changePage(current),
      pageSize: siteWater?.size,
      onShowSizeChange: (current, pageSize) => {
        //设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
        onShowSizeChange(current, pageSize);
      },
      showTotal: () => `共${siteWater.total}条`,
    };
    const testForm = (
      <Form name="siteWater" onFinish={onFinish}>
        {fromSet.map((item) => {
          return (
            <Form.Item label={item.label} name={item.name} key={item.name}>
              {item.ele}
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
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
              getSiteWaterAction({
                current: 1,
                name: inputValue,
                size: 10,
              });
            }}
          >
            查询
          </Button>
          <Button
            type="ghost"
            onClick={() => {
              getSiteWaterAction();
              this.setState({
                inputValue: "",
              });
            }}
          >
            重置
          </Button>
          <Button onClick={() => showModal()}>添加</Button>
        </div>
        {/* <Table
          columns={columns}
          loading={loading}
          dataSource={siteWater?.records}
          scroll={{ y: 700 }}
          rowKey={(row) => row.siteWaterLevelsID}
          pagination={pagination}
        /> */}
        <DYTable
          columns={columns}
          loading={loading}
          dataSource={siteWater?.records}
          rowkey={(row) => row.siteWaterLevelsID}
          pagination={pagination}
          confirm={confirm}
          update={update}
        ></DYTable>
        <Modal
          title="新增"
          visible={visible}
          destroyOnClose
          onCancel={() => hideModal()}
          footer={null}
        >
          {testForm}
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state, "STATE");
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
