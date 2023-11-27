import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FormOutlined,
  TagsOutlined,
  CommentOutlined,
  PlusOutlined /* other icons */,
} from "@ant-design/icons";
import noteContext from "../context/notes/noteContext";
import { message } from 'antd';


const schema = yup.object({
  title: yup.string().required("title is required").min(3),
  description: yup.string().required("description is required").min(4),
  tag: yup.string().optional().max(8),
});

function Addnote(props) {

  // const [note, setnote] = useState(null);

  const context = useContext(noteContext);
  const { addnote,fetchNotes,setisSpin} = context;
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  // give data fill on the form


  const onSubmit = async  (data) => {
    console.log(data);
    console.log(data.title, data.description, data.tag);
    await addnote(data.title, data.description,data.tag);
    await fetchNotes ();
    console.log("note added done")
   props.showalert("Note Added","success")
    message.success('Note added successfully');
  };
  return (
    <>
      <h2 style={{ textAlign: "center",color:"#006D77"  }}>Add Note</h2>
      <Row>
        <Col lg={12} sm={20} xs={20} style={{ marginLeft: "13%" }}>
          <div id="form-design">
            <Form id="main-form" onFinish={handleSubmit(onSubmit)}>
              <Form.Item>
                <Button
                  // onClick={handleClick}
                  type="primary"
                  shape="circle"
                  style={{
                    height: "50px",
                    width: "50px",
                    marginLeft: "99%",
                    marginTop: "-6%",
                    backgroundColor:"#006D77"
                  }}
                  icon={<PlusOutlined style={{ fontSize: "24px" }} />}
                  htmlType="submit"
                ></Button>
              </Form.Item>
              <p label="title">Title</p>
              <Form.Item>
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter title"
                      suffix={<FormOutlined style={{color:"#006D77"}}/>}
                      allowClear
                    />
                  )}
                />
                <div style={{ height: "5px" }}>
                  <p style={{ color: "red" }}>{errors.title?.message}</p>
                </div>
              </Form.Item>
              <p label="description">Description:</p>
              <Form.Item>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter description"
                      suffix={<CommentOutlined style={{color:"#006D77"}} />}
                      allowClear
                    />
                  )}
                />
                <div style={{ height: "5px" }}>
                  <p style={{ color: "red" }}>{errors.description?.message}</p>
                </div>
              </Form.Item>
              <p label="tag">Tag:</p>
              <Form.Item>
                <Controller
                  name="tag"
                  control={control}
                  defaultValue="general"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter tag"
                      suffix={<TagsOutlined style={{color:"#006D77"}} />}
                      allowClear
                    />
                  )}
                />
                <div style={{ height: "5px" }}>
                  <p style={{ color: "red" }}>{errors.tag?.message}</p>
                </div>
              </Form.Item>
              <Form.Item>
                <Checkbox style={{ paddingBottom: "30px" }}>
                  I have Read All Fields
                </Checkbox>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Addnote;
