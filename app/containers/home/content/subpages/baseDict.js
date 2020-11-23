import React, { useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { getDict } from "../../redux/actions";
const BaseDict = (props) => {
  const { baseDict, type, value } = props; //value 是编辑表单时传过来的值
  const [selected, setSelected] = useState(props.value);
  return (
    <Select value={selected || value} onChange={(e) => setSelected(e)}>
      {console.log(selected, "value")}
      {baseDict
        .filter((i) => i.type == type)
        .map((item) => {
          console.log(item.stateRelationID, "id");
          return (
            <Select.Option key={item.name} value={item.stateRelationID}>
              {item.name}
            </Select.Option>
          );
        })}
    </Select>
  );
};

const mapStateToProps = (state) => {
  return {
    baseDict: state.currency.baseDict,
  };
};
export default connect(mapStateToProps)(BaseDict);
