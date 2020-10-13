
import React, { Component } from 'react';
import "./style.scss";
import DYForm from "@app/components/home/form";
import { Input, Tree, Table, Space, Button, Divider, Modal, DatePicker } from "antd";
const { Search, TextArea } = Input;

class DeviceManageFlood extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        treeData: [{
          title: '东营区',
          dataIndex: '东营区',
          children: [{
            title: '明泓匣（匣前）',
            dataIndex: '明泓匣（匣前）'
          }, {
            title: '明泓匣（匣后）',
            dataIndex: '明泓匣（匣后）'
          }]
        }, {
          title: '河口区',
          dataIndex: '河口区',
          children: [{
            title: '四倾二',
            dataIndex: '四倾二'
          }, {
            title: '丁王',
            dataIndex: '丁王'
          }, {
            title: '龙王匣（匣下游）',
            dataIndex: '龙王匣（匣下游）'
          }]
        }, {
          title: '开发区',
          dataIndex: '开发区',
          children: [{
            title: '开发区1',
            dataIndex: '开发区1'
          }]
        }, {
          title: '广饶县',
          dataIndex: '广饶县',
          children: [{
            title: '稻三匣',
            dataIndex: '稻三匣'
          }]
        }, {
          title: '垦利区',
          dataIndex: '垦利区',
          children: [{
            title: '永镇水库',
            dataIndex: '永镇水库'
          }]
        }],
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

  handleTreeSelect () {
    console.log(arguments)
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
      </p>)
    });
  }

  handleAddFormSave () {
  }

  handleRepairFormSave () {
  }

  handleChangeFormSave () {
  }

  render () {
    const { treeData, deviceList, deviceListColumns, repairList, repairListColumns, addFormVisible, repairFormVisible, changeFormVisible } = this.state;

    return (
      <>
        <div className="device-manage">
          <Search
            placeholder="请输入搜索内容"
            onSearch={this.test}
          />
          <div className="device-manage-content">
            <div className="device-manage-content-left">
              <Tree
                defaultExpandAll
                defaultSelectedKeys={['明泓匣（匣前）']}
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
      </>
    )
  }
}

export default DeviceManageFlood;
