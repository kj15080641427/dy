import React, { useState, useEffect } from "react";
import {
  Radio,
  DatePicker,
  Select,
  Modal,
  Input,
  Button,
  Checkbox,
  Form,
  Col,
} from "antd";
import DYTable from "@app/components/home/table";
import "./index.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions";
import { connect } from "react-redux";
import moment from "moment";

const { RangePicker } = DatePicker;
const obj = {
  0: "未处理",
  1: "已研判",
};

const RainStorm = (props) => {
  const { rainStorm, rainStormNum, rainStormLoading } = props;
  const { getRainStorm, getRainStormType } = props.actions;
  const [visible, setVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [info, setInfo] = useState({});
  const [status, setStatus] = useState("");
  const [label, setLabel] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  useEffect(() => {
    getRainStorm();
    getRainStormType();
  }, []);

  const columns = [
    { title: "发文内容", dataIndex: "text" },
    { title: "话题标签", dataIndex: "label" },
    { title: "发文人", dataIndex: "name" },
    { title: "创建时间", dataIndex: "time" },
    { title: "点赞数", dataIndex: "attitudesCount" },
    { title: "转发数", dataIndex: "aepostsCount" },
    { title: "评论数", dataIndex: "commentsCount" },
    { title: "博主粉丝数量", dataIndex: "followersCount" },
    { title: "热度评分", dataIndex: "score" },
    { title: "状态", dataIndex: "states", render: (e) => obj[e] },
    {
      title: "操作",
      dataIndex: "",
      render: (_, record) => (
        <a
          onClick={() => {
            setVisible(true);
            setInfo(record);
          }}
        >
          详情
        </a>
      ),
    },
  ];

  const all = [
    {
      label: "第一个主题",
    },
    {
      label: "第2个主题",
    },
  ];
  const closeModal = () => setVisible(false);
  const closeTypeModal = () => setTypeVisible(false);
  const onFinish = (values) => {
    if (values) {
      let start = moment(values[0]).format("YYYY-MM-DD HH:mm:ss");
      let end = moment(values[1]).format("YYYY-MM-DD HH:mm:ss");
      setStartTime(start);
      setEndTime(end);
      getRainStorm({
        size: 10,
        current: 1,
        monitor: 2,
        states: status,
        label: label,
        beginTime: start,
        endTime: end,
      });
    } else {
      setStartTime("");
      setEndTime("");
      getRainStorm({
        size: 10,
        current: 1,
        monitor: 2,
        states: status,
        label: label,
        beginTime: "",
        endTime: "",
      });
    }
  };
  return (
    <div className="piblic-sentiment">
      <div className="home-his-layout-tabs">
        <Radio.Group optionType="button" defaultValue="1">
          <Radio.Button value="1">舆情预警</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        监测主题：共计{rainStormNum?.allCount}个 监测
        {rainStormNum?.monitorCount}个
        <Button
          onClick={() => setTypeVisible(true)}
          className="public-button public-button-submit"
        >
          管理
        </Button>
      </div>
      <div>
        <Form className="public-sentiment-selected">
          <Col>
            <Form.Item label="时间" name="time">
              <RangePicker onChange={onFinish}></RangePicker>
            </Form.Item>
          </Col>
          <Col className="public-type">
            <Form.Item label="话题" name="label">
              <Select
                defaultValue=""
                onChange={(e) => {
                  setLabel(e);
                  getRainStorm({
                    size: 10,
                    current: 1,
                    monitor: 2,
                    states: status,
                    label: e,
                    beginTime: startTime,
                    endTime: endTime,
                  });
                }}
                value={label}
              >
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">话题1</Select.Option>
                <Select.Option value="2">话题2</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col className="public-state">
            <Form.Item label="状态" name="states">
              <Select
                defaultValue=""
                onChange={(e) => {
                  setStatus(e);
                  getRainStorm({
                    size: 10,
                    current: 1,
                    monitor: 2,
                    states: e,
                    label: label,
                    beginTime: startTime,
                    endTime: endTime,
                  });
                }}
                value={status}
              >
                <Select.Option value="">全部</Select.Option>
                <Select.Option value="1">未处理</Select.Option>
                <Select.Option value="2">已研判</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Form>
      </div>
      <DYTable
        columns={columns}
        showEdit={false}
        loading={rainStormLoading}
        dataSource={rainStorm?.records}
        rowkey={(row) => row.rainstormId}
        total={rainStorm?.total}
      ></DYTable>
      <Modal
        footer={null}
        visible={typeVisible}
        onCancel={closeTypeModal}
        title="主题管理"
      >
        <div className="public-sentiment-layout">
          <Input></Input>
          <Button>新增</Button>
        </div>
        <div className="public-sentiment-type-box">
          <div className="public-sentiment-type-left">
            <Button>所有主题</Button>
            <div>
              {all.map((item, index) => (
                <Checkbox key={index}>{item.label}</Checkbox>
              ))}
            </div>
          </div>
          <div className="public-sentiment-type-right">
            <Button>已监控主题</Button>
          </div>
        </div>
      </Modal>
      <Modal
        footer={null}
        visible={visible}
        onCancel={closeModal}
        className="piblic-sentiment-modal"
        width="800px"
        closable={false}
      >
        <div className="piblic-table-layout-export">导出</div>
        <table border="1" className="piblic-table-layout">
          <tbody>
            <tr>
              <td colSpan={18} className="piblic-table-layout-title">
                舆论详情
              </td>
            </tr>
            <tr>
              <th>信息标题</th>
              <td>暂无</td>
              <th>标签</th>
              <td>{info.label}</td>
            </tr>
            <tr>
              <th>信息URL</th>
              <td colSpan={18}></td>
            </tr>

            <tr>
              <th>发文人</th>
              <td>{info.name}</td>
              <th>粉丝数量</th>
              <td>{info.followersCount}</td>
            </tr>

            <tr>
              <th>评论数</th>
              <td>{info.commentsCount}</td>
              <th>热度评分</th>
              <td>{info.score}</td>
            </tr>

            <tr>
              <th>创建时间</th>
              <td colSpan={18}>{info.time}</td>
            </tr>

            <tr>
              <th>上报内容</th>
              <td colSpan={18}>{info.text}</td>
            </tr>

            <tr>
              <th>入库时间</th>
              <td colSpan={18}>{info.time}</td>
            </tr>

            <tr>
              <th>操作人</th>
              <td>暂无</td>
              <th>处理时间</th>
              <td>暂无</td>
            </tr>

            <tr>
              <th>备注</th>
              <td colSpan={18}>
                <Input.TextArea placeholder="请输入备注"></Input.TextArea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="public-button-box">
          <Button className="public-button public-button-submit">研判</Button>
          <Button className="public-button" onClick={closeModal}>
            返回
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    rainStorm: state.management.rainStorm,
    rainStormNum: state.management.rainStormNum,
    rainStormLoading: state.management.rainStormLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RainStorm);
