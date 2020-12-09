import React, { useState, useEffect } from "react";
import { Modal, Card, Row, Col } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
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
  rvType: {
    1: "平原水库",
  },
  rvType1: {
    1: "挡水坝",
  },
  rvbartypem: {
    1: "土坝",
  },
  rvbartypes: {
    1: "均质坝",
  },
};
const ModalInfo = (props) => {
  const { visible, setVisible, list, info } = props;
  const [renderList, setRenderList] = useState(list.base);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    console.log(list, "LIII");
    setRenderList(list.base);
  }, list.base);
  return (
    <div className="data-center-modal">
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
          setRenderList(list.base);
          setShowMore(false);
        }}
        style={{ padding: "0px" }}
        destroyOnClose
        className="data-center-modal"
      >
        <div className="data-center-card">
          <Card title={info[renderList[0].value]}>
            <Row>
              {renderList.map((item) => {
                return (
                  <Col key={item.label} span={item.col ? 12 : 24}>
                    {item.isDict ? (
                      <div>
                        {item.label}
                        {item.unit ? item.unit : ""}：
                        {dict[item.isDict][info[item.value]]}
                      </div>
                    ) : (
                      <div>
                        {item.label}
                        {item.unit ? item.unit : ""}：{info[item.value]}
                      </div>
                    )}
                  </Col>
                );
              })}
              <br />
              {showMore ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onClick={() => {
                    setShowMore(false);
                    setRenderList(list.base);
                  }}
                >
                  <UpOutlined style={{ color: "#00a0ea", fontSize: 25 }} />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                  onClick={() => {
                    setShowMore(true);
                    setRenderList([...list.base, ...list.more]);
                  }}
                >
                  <DownOutlined style={{ color: "#00a0ea", fontSize: 25 }} />
                </div>
              )}
            </Row>
          </Card>
        </div>
      </Modal>
    </div>
  );
};
export default ModalInfo;
