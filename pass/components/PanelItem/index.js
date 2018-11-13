import styled from 'styled-components';

const PanelItem = styled.div`
  width: 390px;
  height: 56px;
  font-size: 14px;
  color: #C2C2C2;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;

  .ant-input-affix-wrapper {
    height: 55px;
    line-height: 55px;
    .ant-input-prefix {
      left: 0px;
    }
  }
  .ant-input {
    outline: none;
    border: none;
    border-radius: 0;
  }
`;

export default PanelItem;
