"use client";

import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import { forgotPasswordAction } from "@/app/actions";
import {
  ButtonCss,
  DescriptionCss,
  FlexColCss,
  HeadingCss,
} from "@/app/components/form/styling";
import { FormMessage, Message } from "@/app/components/FormMessage";

function ForgotPasswordPage({ searchParams }: { searchParams: Message }) {
  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("email", values.email);
    await forgotPasswordAction(formData);
  };
  return (
    <FlexColCss>
      <HeadingCss>Reset password</HeadingCss>
      <DescriptionCss>Enter your email to reset the password</DescriptionCss>
      <FormMessage message={searchParams} />
      <Form name="forgot-password" onFinish={onFinish}>
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
          or <a href="/sign-in">Sign in now!</a>
        </Form.Item>
      </Form>
    </FlexColCss>
  );
}

export default ForgotPasswordPage;
