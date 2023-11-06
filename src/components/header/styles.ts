import React from "react";
import styled from "styled-components";

export const HeaderBar = styled.header`
  background-color: #be0000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 1rem;
`;

export const Logo = styled.h1`
  cursor: pointer;
  font-size: 1.5rem;
  &:hover {
    color: #ddd;
  }
`;

export const Nav = styled.nav`
  & > * {
    margin-left: 1rem;
    text-decoration: none;
    color: #fff;
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    &:hover {
      color: #ddd;
    }
  }
`;
