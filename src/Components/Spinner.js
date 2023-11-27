import { Spin } from "antd";
import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { LoadingOutlined } from "@ant-design/icons";

function Spinner() {
  const context = useContext(noteContext);
  const { isSpin } = context;

  return (
    <>
      <Spin
        className="custom-spinner"
        spinning={isSpin}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 54,
              margin:'auto'
            }}
            spin
          />
        }
      />
    </>
  );
}

export default Spinner;
