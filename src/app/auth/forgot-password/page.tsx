"use client";

import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Descriptions, Form, Input } from "antd";
import {
  ButtonCss,
  DescriptionCss,
  FlexColCss,
  HeadingCss,
} from "../sign-in/page";

function ForgotPasswordPage() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <FlexColCss>
      <HeadingCss>Forgot password</HeadingCss>
      <DescriptionCss>Enter your email to reset the password</DescriptionCss>
      <Form
        name="forgot-password"
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
        <Form.Item>
          <ButtonCss block type="primary" htmlType="submit">
            Send reset link
          </ButtonCss>
          or <a href="/auth/sign-in">Sign in now!</a>
        </Form.Item>
      </Form>
    </FlexColCss>
  );
}

export default ForgotPasswordPage;
