import React from "react";
import { TreeSelect } from "antd";
import { connect } from "react-redux";
import * as action from "../../../../redux/actions";
import { bindActionCreators } from "redux";
import "../task.scss";
class TreeSelected extends React.Component {
  state = {
    value: undefined,
  };

  onChange = (value) => {
    // console.log(value);
    this.props.actions?.setFormUser(value);
    this.setState({ value });
  };

  render() {
    const {
      treeData,
      onChange,
      placeholderInfo,
      treeDefaultExpandAll = true,
    } = this.props;
    return (
      <div className="tree-select-input">
        <TreeSelect
          treeCheckable
          showSearch
          style={{ width: "100%" }}
          value={this.props.formUser}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder={placeholderInfo}
          allowClear
          multiple
          treeDefaultExpandAll={treeDefaultExpandAll}
          onChange={onChange || this.onChange}
          treeData={treeData}
        ></TreeSelect>
      </div>
    );
  }
}

// export default TreeSelected;
const mapStateToProps = (state) => {
  return {
    formUser: state.management.formUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TreeSelected);
