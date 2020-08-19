/**
 * water 2020-07-17
 * zdl
 * 视频站点增加
 */
import React from 'react';
import {
	Form,
	Input,
	Tooltip,
	Cascader,
	Select,
	Row,
	Col,
	Checkbox,
	Button,
	AutoComplete,
	Radio,
	message,
	Modal,
	Switch,
	DatePicker
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { stationSave, stationUpdate } from '@app/data/request';
import moment from 'moment'

const { Option } = Select;
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};
class AddStation extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
		this.formRef = this.props.form
	}
	onFinish = values => {
		values = {
			...values,
			gmtcreate: moment(values.gmtcreate).format("YYYY-MM-DD HH:mm:ss"),
			gmtmodify: moment(values.gmtmodify).format("YYYY-MM-DD HH:mm:ss")
		}
		if (!values.siteBaseID) {
			stationSave(values).then((result) => {
				if (result.code === 200) {
					message.success('新增成功！');
					this.props.selectPage();
					this.onCancel();
				} else {
					message.error(result.msg);
				}
			})
		} else {
			stationUpdate(values).then((result) => {
				if (result.code === 200) {
					message.success('修改成功！');
					this.props.selectPage()
					this.onCancel();
				} else {
					message.error(result.msg);
				}
			})
		}
	};
	onCancel = () => {
		this.props.onCancel()//调用父组件给的方法
	};
	render() {
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
			},
		};
		return (
			<>
				<Modal
					forceRender={true}
					onCancel={this.onCancel}
					visible={this.props.visible}
					title='新增站点'
					footer={null}
					width={"50%"}
				>
					<Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}
					>
						<Row>
							<Col span={12}>
								<Form.Item
									name="name"
									label="站点名称"
									rules={[
										{
											required: true,
											message: '请输入站点名称!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="address"
									label="详细地址"
									rules={[
										{
											required: true,
											message: '请输入站点名称!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="aliasName"
									label="别名"
									rules={[
										{
											required: true,
											message: '请输入站点名称!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>

							<Col span={12}>
								<Form.Item
									name="exchangeorg"
									label="交换管理单位"
									rules={[
										{
											required: true,
											message: '请输入站点名称!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="gmtcreate"
									label="记录创建时间"
									rules={[
										{
											required: true,
											message: '请输入创建时间!',
										},
									]}
								><DatePicker format="YYYY-MM-DD HH:mm" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="gmtmodify"
									label="记录修改时间"
									rules={[
										{
											required: true,
											message: '请输入站点名称!',
										},
									]}
								><DatePicker format="YYYY-MM-DD HH:mm" />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="lon"
									label="经度"
									rules={[
										{
											required: true,
											message: '请输入经度!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="lat"
									label="纬度"
									rules={[
										{
											required: true,
											message: '请输入纬度!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="level"
									label="级别"
									rules={[
										{
											required: true,
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="memerof"
									label="隶属单位"
									rules={[
										{
											required: true,
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="region"
									label="地区编码"
									rules={[
										{
											required: true,
											message: '请输入地区编码!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="spellcode"
									label="拼音码"
									rules={[
										{
											required: true,
											message: '请输入地区编码!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="state"
									label="状态"
									rules={[
										{
											required: true,
											message: '请输入地区编码!',
										},
									]}
								>
									<Radio.Group onChange={this.onChange} value={this.state.value}>
										<Radio value={1}>true</Radio>
										<Radio value={0}>false</Radio>
									</Radio.Group>
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="stationdesc"
									label="站点描述"
									rules={[
										{
											required: true,
											message: '请输入站点描述!',
										},
									]}
								><Input />
								</Form.Item>
							</Col>
							<Form.Item
								name="siteBaseID"
								label=""
							>
							</Form.Item>
						</Row>

						<Form.Item {...tailFormItemLayout}>
							<Button type="primary" htmlType="submit">
								保存
</Button>
						</Form.Item>
					</Form>
				</Modal>
			</>
		);
	}
	componentDidMount() {
	}
}
export default AddStation;