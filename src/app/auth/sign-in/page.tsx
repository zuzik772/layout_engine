"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, Descriptions } from "antd";
import styled from "styled-components";

function SignInPage() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <FlexColCss>
      <HeadingCss>Sign in</HeadingCss>
      <DescriptionCss>Please sign in to continue</DescriptionCss>
      <Form
        name="login"
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
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/auth/forgot-password">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <ButtonCss block type="primary" htmlType="submit">
            Sign in
          </ButtonCss>
          or <a href="/auth/sign-up">Register now!</a>
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

export const DescriptionCss = styled.p`
  color: ${(p) => p.theme.colors.gray500};
  text-align: center;
`;

export const ButtonCss = styled(Button)`
  margin-bottom: ${(p) => p.theme.sizes.spacing2};
`;
