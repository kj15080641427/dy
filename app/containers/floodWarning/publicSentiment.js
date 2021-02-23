import React, { useEffect } from "react";
import { TableShow } from "../../components/chart/table";
import { bindActionCreators } from "redux";
import * as actions from "../home/redux/actions";
import { connect } from "react-redux";
import addimg from "../../resource/增加.svg";

const PublicSent = (props) => {
  const { rainStorm } = props;
  const { getRainStorm } = props.actions;

  useEffect(() => {
    getRainStorm({ size: -1, current: 1, monitor: 2 });
  }, []);

  return (
    <TableShow
      pageSize={13}
      rowKey="rainstormId"
      showHeader={false}
      columns={[
        {
          name: "标签",
          dataIndex: "",
          width: "5%",
          render: () => <img width={20} height={20} src={addimg}></img>,
        },
        {
          name: "内容",
          dataIndex: "text",
          width: "70%",
          render: (e) =>
            e.length <= 24 ? e.slice(0, 4) : `${e.slice(0, 24)}...`,
        },
        {
          name: "时间",
          dataIndex: "time",
          width: "25%",
          render: (e) => e.slice(0, 10),
        },
      ]}
      dataSource={rainStorm?.records}
    ></TableShow>
  );
};
const mapStateToProps = (state) => {
  console.log(state, "S");
  return {
    rainStorm: state.management.rainStorm,
    // rainStormLoading: state.management.rainStormLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicSent);
