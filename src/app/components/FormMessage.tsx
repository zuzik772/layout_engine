import React from "react";
import styled from "styled-components";

export type Message = { success: string } | { error: string } | { message: string };

export function FormMessage({ message }: { message: Message }) {
  console.log("message", message);
  return (
    <MessageContainer>
      {"success" in message && <SuccessMessage>{message.success}</SuccessMessage>}
      {"error" in message && <ErrorMessage>{message.error}</ErrorMessage>}
      {"message" in message && <InfoMessage>{message.message}</InfoMessage>}
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 360px;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  color: ${(props) => props.theme.colors.success};
  border-left: 2px solid ${(props) => props.theme.colors.success};
  padding-left: 16px;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.error};
  border-left: 2px solid ${(props) => props.theme.colors.error};
  padding-left: 16px;
`;

const InfoMessage = styled.div`
  color: ${(props) => props.theme.colors.primary500};
  border-left: 2px solid ${(props) => props.theme.colors.primary500};
  padding-left: 16px;
`;
