import React, {useState} from 'react'
import {Radio} from "antd";
import RwvData from "../dataMonitoring/RwvData";
import RiverAnnunciate from "../dataMonitoring/RiverAnnunciate";
import Model from "../dataMonitoring/model";
import FilterCondition from "@app/components/filter/FilterCondition";

const History = () => {
    const [value, setValue] = useState("1");
    return (
        <>
            <div className="home-layout-tabs">
                <Radio.Group
                    optionType="button"
                    onChange={(e) => {
                        console.log(e);
                        setValue(e.target.value);
                    }}
                    value={value}
                >
                    <Radio.Button value="1">历史监测数据</Radio.Button>
                </Radio.Group>
            </div>
            <div>
                {value == 1 ? (
                    <FilterCondition />
                ) : value == 2 ? (
                    <RiverAnnunciate />
                ) : value == 3 ? (
                    <Model />
                ) : null}
            </div>
        </>
    );
};

export default History;
