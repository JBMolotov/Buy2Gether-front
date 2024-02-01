import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: top;
`;

export const Card = styled.div`
  margin: 4em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 370px;
  font-family: "Arial", sans-serif;
`;

export const ProfileHeader = styled.div`
  background-color: #eceaf1;
  padding: 20px;
  text-align: center;
`;

export const ProfileName = styled.h2`
  margin: 0;
  color: #333;
`;

export const ProfileDetails = styled.div`
  padding: 15px;
  background-color: #fff;
  border-top: 1px solid #eceff1;
`;

export const DetailItem = styled.p`
  color: #607d8b;
  margin: 5px 0;
  & > strong {
    color: #333;
  }
`;

export const TextField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 14px;
`;
