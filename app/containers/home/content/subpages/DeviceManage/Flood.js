
import React, { Component } from 'react';
import "./style.scss";
import DYForm from "@app/components/home/form";
import { Input, Tree, Table, Space, Button, Divider, Modal, DatePicker, Spin } from "antd";
const { Search, TextArea } = Input;

const AllApi = require("@app/data/home");

class DeviceManageFlood extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        showLoading: true,
        treeData: [],
        deviceList: [
          { a: '遥测终端机', b: '05461000192', c: '四信', d: 'FN-9153N', e: '2019-05', f: '2019-12-11' },
          { a: '遥测终端机', b: '05461000192', c: '四信', d: 'FN-9153N', e: '2019-05', f: '2019-12-11' },
          { a: '遥测终端机', b: '05461000192', c: '四信', d: 'FN-9153N', e: '2019-05', f: '2019-12-11' },
          { a: '遥测终端机', b: '05461000192', c: '四信', d: 'FN-9153N', e: '2019-05', f: '2019-12-11' },
          { a: '遥测终端机', b: '05461000192', c: '四信', d: 'FN-9153N', e: '2019-05', f: '2019-12-11' },
          { a: '遥测终端机', b: '05461000192', c: '四信', d: 'FN-9153N', e: '2019-05', f: '2019-12-11' }
        ],
        deviceListColumns: [{
          align: 'center',
          title: '设备名称',
          dataIndex: 'a'
        }, {
          align: 'center',
          title: '设备编号',
          dataIndex: 'b'
        }, {
          align: 'center',
          title: '厂家',
          dataIndex: 'c'
        }, {
          align: 'center',
          title: '型号',
          dataIndex: 'd'
        }, {
          align: 'center',
          title: '生产日期',
          dataIndex: 'e'
        }, {
          align: 'center',
          title: '安装时间',
          dataIndex: 'f'
        }, {
          align: 'center',
          title: '操作',
          dataIndex: 'g',
          render: (text, record) => (<Space>
            <a onClick={() => this.handleRepair(record)}>维修</a>
            <a onClick={() => this.handleChange(record)}>更换</a>
            <a onClick={() => this.handleRemove(record)}>拆除</a>
          </Space>)
        }],
        repairList: [
          { a: '遥测终端', b: '05461000192', c: '更换设备', d: '原设备不能使用，更新型号', e: '张三', f: '2019-12-11' },
          { a: '遥测终端', b: '05461000192', c: '更换设备', d: '原设备不能使用，更新型号', e: '张三', f: '2019-12-11' },
          { a: '遥测终端', b: '05461000192', c: '更换设备', d: '原设备不能使用，更新型号', e: '张三', f: '2019-12-11' }
        ],
        repairListColumns: [{
          align: 'center',
          title: '设备名称',
          dataIndex: 'a'
        }, {
          align: 'center',
          title: '设备编号',
          dataIndex: 'b'
        }, {
          align: 'center',
          title: '维护类型',
          dataIndex: 'c'
        }, {
          align: 'center',
          title: '说明',
          dataIndex: 'd'
        }, {
          align: 'center',
          title: '维护人',
          dataIndex: 'e'
        }, {
          align: 'center',
          title: '维护时间',
          dataIndex: 'f'
        }],
        addFormVisible: false,
        repairFormVisible: false,
        changeFormVisible: false
      };
  }
  async componentDidMount () {
    const { device } = this.props
    const { data } = await AllApi[`getSite${device.typeName}Page`]({ current: 1, size: -1 })
    const treeData = [{
      title: '东营区', key: '370502', children: []
    }, {
      title: '河口区', key: '370503', children: []
    }, {
      title: '垦利区', key: '370521', children: []
    }, {
      title: '利津县', key: '370522', children: []
    }, {
      title: '广饶县', key: '370523', children: []
    }]
    treeData.map(td => {
      data.records.filter(d => (d.region || d.addvcd) === td.key).map(d => {
        td.children.push(Object.assign(d, { key: d[`site${device.typeName}ID`], title: d.name }))
      })
    })
    this.setState({ treeData, showLoading: false })
  }

  handleTreeSelect (treeKey, event) {
    const { node } = event
    this.setState({ deviceList: node.children })
  }

  handleDiviceAdd () {
    console.log('add')
    this.setState({ addFormVisible: true })
  }

  handleRepair (record) {
    this.setState({ repairFormVisible: true })
  }

  handleChange (record) {
    this.setState({ changeFormVisible: true })
  }

  handleRemove (record) {
    Modal.confirm({
      title: '拆除设备',
      content: (<p>
        确认要拆除当前选择的设备？
      </p>),
      onOk: async () => {
        this.setState({ showLoading: true })
        try {
          const { device } = this.props
          await AllApi[`delete${device.apiName}`]({ siteBaseID: record.siteBaseID })
        } catch (e) {
          console.error(e)
        }
        this.setState({ showLoading: false })
      }
    });
  }

  handleAddFormSave () {
  }

  handleRepairFormSave () {
  }

  handleChangeFormSave () {
  }

  render () {
    const { showLoading, treeData, deviceList, deviceListColumns, repairList, repairListColumns, addFormVisible, repairFormVisible, changeFormVisible } = this.state;

    return (
      <Spin spinning={showLoading}>
        <div className="device-manage">
          <Search
            placeholder="请输入搜索内容"
            onSearch={this.test}
          />
          <div className="device-manage-content">
            <div className="device-manage-content-left">
              <Tree
                key={this.props.siteType}
                autoExpandParent
                onSelect={this.handleTreeSelect}
                treeData={treeData}
              />
            </div>
            <div className="device-manage-content-right">
              <div className="device-manage-content-right-title">
                <div className="device-manage-content-right-title-sub">
                  设备列表
                </div>
                <Space size="middle">
                  <Button onClick={() => this.handleDiviceAdd()}>新增</Button>
                  <Button>导入</Button>
                  <Button>导出</Button>
                </Space>
              </div>
              <Table bordered dataSource={deviceList} columns={deviceListColumns} />
              <Divider />
              <div className="device-manage-content-right-title">
                <div className="device-manage-content-right-title-sub">
                  维修记录
                </div>
                <Button>导出</Button>
              </div>
              <Table bordered dataSource={repairList} columns={repairListColumns} />
            </div>
          </div>
        </div>
        <Modal centered title="设备信息" visible={addFormVisible} footer={null} onCancel={() => this.setState({ addFormVisible: false })}>
          <DYForm
            showCancel
            formItem={[{
              label: "设备名称",
              name: "a",
              rules: [{ required: true }],
              ele: <Input></Input>
            }, {
              label: "设备编号",
              name: "b",
              ele: <Input></Input>
            }, {
              label: "规格型号",
              name: "c",
              ele: <Input></Input>
            }, {
              label: "生产厂家",
              name: "d",
              ele: <Input></Input>
            }, {
              label: "生产日期",
              name: "e",
              ele: <DatePicker></DatePicker>
            }]}
            onFinish={this.handleAddFormSave}
            cancelClick={() => this.setState({ addFormVisible: false })}
          ></DYForm>
        </Modal>
        <Modal centered title="维修设备" visible={repairFormVisible} footer={null} onCancel={() => this.setState({ repairFormVisible: false })}>
          <DYForm
            showCancel
            formItem={[{
              label: "维护人员",
              name: "a",
              ele: <Input></Input>
            }, {
              label: "维护日期",
              name: "b",
              ele: <DatePicker></DatePicker>
            }, {
              label: "维修情况说明",
              name: "c",
              rules: [{ required: true }],
              ele: <TextArea rows={4} />
            }]}
            onFinish={this.handleRepairFormSave}
            cancelClick={() => this.setState({ repairFormVisible: false })}
            ></DYForm>
        </Modal>
        <Modal centered title="更换设备" visible={changeFormVisible} footer={null} onCancel={() => this.setState({ changeFormVisible: false })}>
          <DYForm
            showCancel
            formItem={[{
              label: "设备名称",
              name: "a",
              rules: [{ required: true }],
              ele: <Input></Input>
            }, {
              label: "设备编号",
              name: "b",
              ele: <Input></Input>
            }, {
              label: "规格型号",
              name: "c",
              ele: <Input></Input>
            }, {
              label: "生产厂家",
              name: "d",
              ele: <Input></Input>
            }, {
              label: "生产日期",
              name: "e",
              ele: <DatePicker></DatePicker>
            }, {
              label: "维护人员",
              name: "f",
              ele: <Input></Input>
            }, {
              label: "更换日期",
              name: "g",
              ele: <DatePicker></DatePicker>
            }, {
              label: "情况说明",
              name: "h",
              ele: <TextArea rows={4} />
            }]}
            onFinish={this.handleChangeFormSave}
            cancelClick={() => this.setState({ changeFormVisible: false })}
            ></DYForm>
        </Modal>
      </Spin>
    )
  }
}

export default DeviceManageFlood;
