import styled from 'styled-components';

const PanelItemFlex = styled.div`
  display: flex;
  align-items: center;
  width: 390px;
  height: 56px;
  font-size: 14px;
  color: #C2C2C2;
  border-bottom: 1px solid #e6e6e6;

  Button img {
    width: 82px;
    height: 32px;
  }

  .ant-input-affix-wrapper {
    height: 55px;
    line-height: 55px;
    .ant-input-prefix {
      left: 0px;
    }
  }
  .ant-input {
    border: none;
    border-radius: 0;
  }
`;

export default PanelItemFlex;
