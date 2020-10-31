import React from "react";
import { Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import * as action from "../../../redux/actions/taskEvent";
import { bindActionCreators } from "redux";
import "../task.scss";

const ListRender = (props) => {
  const { listRender, buttonText = "调派专家", listItemText } = props;
  const { changeTaskRenderList, setExpertModal } = props.actions;
  return (
    <Card className="expert-dispatch-right">
      <div className="expert-dispatch-right-div">
        <Card>
          <div
            className="expert-dispatch-close"
            onClick={() => {
              changeTaskRenderList([]);
            }}
          >
            <CloseOutlined />
          </div>
          已选择({listRender?.length})
        </Card>
        {listRender?.map((item, index) => {
          return (
            <div key={index}>
              <Card>
                <div
                  className="expert-dispatch-close"
                  onClick={() => {
                    changeTaskRenderList(listRender.filter((i) => i != item));
                  }}
                >
                  <CloseOutlined />
                </div>
                <div>{item.name}</div>
                <div>{item[listItemText]}</div>
                {/* <div>{item.major}</div> */}
                <div>{item.number}</div>
              </Card>
            </div>
          );
        })}
        {listRender[0] && (
          <div className="expert-right-button">
            <Button onClick={() => setExpertModal(true)} type="primary">
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return {
    listRender: state.management.listRender,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(action, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListRender);
