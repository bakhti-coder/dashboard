import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import request from "../server";

const TeachersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setSelected(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await request.get("teachers");
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      setIsBtnLoading(true);
      let values = await form.validateFields();
      if (selected === null) {
        await request.post("teachers", values);
      } else {
        await request.put(`teachers/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
      if (selected === null) {
        message.success("Teachers added");
      } else {
        message.success("Teachers edit succses");
      }
    } catch (error) {
      message.error("Network error");
    } finally {
      setIsBtnLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editTeacher = async (id) => {
    try {
      setIsModalOpen(true);
      setSelected(id);
      let { data } = await request.get(`teachers/${id}`);
      form.setFieldsValue(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTeacher = (id) => {
    Modal.confirm({
      title: "Do you want to exit?",
      onOk: async () => {
        try {
          await request.delete(`teachers/${id}`);
          getData();
          message.success("Teacher succses delete");
        } catch (error) {
          message.error("Network error");
        }
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => (
        <Image src={data} height={60} style={{ borderRadius: "50%" }} />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "IsMaried",
      key: "isMaried",
      dataIndex: "isMaried",
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (data) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editTeacher(data)}>
            Update
          </Button>
          <Button onClick={() => deleteTeacher(data)} type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>Teachers ({data.length})</h1>
            <Button type="primary" onClick={showModal}>
              Add teachers
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
      <Modal
        confirmLoading={isBtnLoading}
        title="Add Teacher"
        onOk={handleOk}
        okText={selected === null ? "Add" : "Save teachers"}
        onCancel={handleCancel}
        open={isModalOpen}
      >
        <Form
          form={form}
          name="login"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name={["firstName"]}
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name={["avatar"]}
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name={["lastName"]}
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Age"
            name={["age"]}
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="isMaried"
            initialValue={false}
            valuePropName="checked"
            wrapperCol={{
              span: 24,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeachersPage;
