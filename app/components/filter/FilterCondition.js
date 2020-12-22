import React, {useState} from 'react';
import {Input, TreeSelect, DatePicker, InputNumber, Checkbox, Button, Select} from 'antd';
import {SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import './style.scss';

const {RangePicker} = DatePicker;


const FilterCondition = (props) => {
    const [rangeFlag, setRangeFlag] = useState(false);

    return (
        <div className={'fc_container'}>
            <div className={'fc_itemContainer'}>
                <TreeSelect
                    style={{width: '100%'}}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder={'行政区域'}/>
            </div>
            <div className={'fc_itemContainer'}>
                <Input placeholder={'站点名称'}/>
            </div>
            <div className={'fc_itemContainer'}>
                <RangePicker showTime/>
            </div>
            <div className={'fc_itemContainer'}>
                <div>
                    <Checkbox onChange={(e) => setRangeFlag(e.target.checked)}>{'选择范围'}</Checkbox>
                </div>
                <div>
                    <InputNumber placeholder={'最小值'} disabled={!rangeFlag}/>
                    <InputNumber placeholder={'最大值'} disabled={!rangeFlag}/>
                </div>
            </div>
            <div className={'fc_itemContainer'}>
                <Select placeholder={'数据来源'}/>
            </div>
            <div className={'fc_itemContainer'}>
                <Button type={'primary'} icon={<SearchOutlined />}>查询</Button>
            </div>
            <div className={'fc_itemContainer'}>
                <Button>重置</Button>
            </div>
            <div className={'fc_itemContainer'}>
                <Button icon={<DownloadOutlined />}>导出</Button>
            </div>
        </div>
    );
};

const getTreeSelected = () =>{

};

export default FilterCondition;
