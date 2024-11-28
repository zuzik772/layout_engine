"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/app/components/FormMessage";

function SignInPage({ searchParams }: { searchParams: Message }) {
  const onFinish = async (values: any) => {
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

export const FlexColCss = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.sizes.spacing2};
`;
export const HeadingCss = styled.h2`
  color: ${(p) => p.theme.colors.primary500};
  text-align: center;
`;

export const LargeHeadingCss = styled(HeadingCss)`
  font-size: ${(p) => p.theme.sizes.spacing12};
`;

export const DescriptionCss = styled.p`
  color: ${(p) => p.theme.colors.gray500};
  text-align: center;
`;

export const ButtonCss = styled(Button)`
  margin-bottom: ${(p) => p.theme.sizes.spacing2};
`;
