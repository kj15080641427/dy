import React from "react";
import { Modal, Card, Row, Col } from "antd";
import "./style.scss";
const dict = {
  whether: { 0: "是", 1: "否" },
  type: {
    1: "分泄洪闸",
    2: "引进水闸",
    3: "节制闸",
    4: "排退水闸",
    5: "挡潮闸",
  },
};
const ModalInfo = (props) => {
  const { visible, setVisible, list, info } = props;
  return (
    <div className="data-center-modal">
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        style={{ padding: "0px" }}
        className="data-center-modal"
      >
        <div className="data-center-card">
          <Card title={info[list[0].value]}>
            <Row>
              {list.map((item) => {
                return (
                  <Col key={item.label} span={item.col ? 12 : 24}>
                    {item.isDict ? (
                      <div>
                        {console.log(
                          info,
                          dict[item.isDict],
                          [info[item.value]],
                          "=="
                        )}
                        {item.label}：{dict[item.isDict][info[item.value]]}
                        {/* {info[item.value] ? whether[0] : whether[1]} */}
                      </div>
                    ) : (
                      <div>
                        {item.label}：{info[item.value]}
                      </div>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Card>
        </div>
      </Modal>
    </div>
  );
};
export default ModalInfo;
