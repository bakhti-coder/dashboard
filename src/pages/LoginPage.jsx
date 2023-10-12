import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import axios from "axios";
import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import { TOKEN } from "../constants/Token";

const LoginPage = ({ setIsLogin }) => {
  const navigate = useNavigate();

  const [btnLoader, setBtnLoader] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values.user;
    try {
      setBtnLoader(true);
      const res = await axios.post("https://reqres.in/api/login/", {
        email: email,
        password: password,
      });
      localStorage.setItem(TOKEN, res.data.token);
      message.success("Succses");
      setIsLogin(true);
      navigate("/dashboard");
    } catch (error) {
      message.error("Incorrect email or password");
    } finally {
      setBtnLoader(false);
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      password: "${label} is not a valid number!",
    },
    password: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <Form
        validateMessages={validateMessages}
        name="login"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name={["user", "email"]}
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name={["user", "password"]}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 24,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          {btnLoader ? (
            <Button style={{ width: "100%" }} type="primary" loading>
              Loading
            </Button>
          ) : (
            <Button style={{ width: "100%" }} type="primary" htmlType="submit">
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
    </Flex>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.bool,
};

export default LoginPage;
