import React, { useEffect } from "react";
import { TableShow } from "../../components/chart/table";
import { bindActionCreators } from "redux";
import * as actions from "../home/redux/actions";
import { connect } from "react-redux";

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
        { name: "内容", dataIndex: "text", width: "80%" },
        {
          name: "时间",
          dataIndex: "time",
          width: "20%",
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
