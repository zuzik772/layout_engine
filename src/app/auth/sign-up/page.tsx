"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import {
  ButtonCss,
  DescriptionCss,
  FlexColCss,
  HeadingCss,
} from "../sign-in/page";

function SignUpPage() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <FlexColCss>
      <HeadingCss>Sign up</HeadingCss>
      <DescriptionCss>Please create an account</DescriptionCss>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <ButtonCss block type="primary" htmlType="submit">
            Sign up
          </ButtonCss>
          or <a href="/auth/sign-in">Login now!</a>
        </Form.Item>
      </Form>
    </FlexColCss>
  );
}

export default SignUpPage;
