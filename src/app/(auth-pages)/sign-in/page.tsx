"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/app/components/FormMessage";
import {
  ButtonCss,
  DescriptionCss,
  FlexColCss,
  HeadingCss,
} from "@/app/components/form/styling";

type SignInForm = {
  email: string;
  password: string;
};

function SignInPage({ searchParams }: { searchParams: Message }) {
  const onFinish = async (values: SignInForm) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    await signInAction(formData);
  };
  return (
    <FlexColCss>
      <HeadingCss>Sign in</HeadingCss>
      <DescriptionCss>Please sign in to continue</DescriptionCss>
      <FormMessage message={searchParams} />
      <Form
        name="sign-in"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
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
          <a href="/forgot-password">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <ButtonCss block type="primary" htmlType="submit">
            Sign in
          </ButtonCss>
          or <a href="/sign-up">Register now!</a>
        </Form.Item>
      </Form>
    </FlexColCss>
  );
}

export default SignInPage;
