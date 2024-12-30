"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

import { signUpAction } from "@/app/actions";
import { FormMessage } from "@/app/components/FormMessage";
import { FlexColCss, HeadingCss, DescriptionCss, ButtonCss } from "@/app/components/form/styling";
import { getMessage } from "../utils";

function SignUpPage() {
  const message = getMessage();

  const onFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    await signUpAction(formData);
  };
  return (
    <FlexColCss>
      <HeadingCss>Sign up</HeadingCss>
      <DescriptionCss>Please create an account</DescriptionCss>
      <FormMessage message={message} />
      <Form name="signup" initialValues={{ remember: true }} style={{ maxWidth: 360 }} onFinish={onFinish}>
        <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <ButtonCss block type="primary" htmlType="submit">
            Sign up
          </ButtonCss>
          or <a href="/sign-in">Login now!</a>
        </Form.Item>
      </Form>
    </FlexColCss>
  );
}

export default SignUpPage;
