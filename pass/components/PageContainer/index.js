import styled from 'styled-components';
import { primaryColorBg } from '../../global-styles';

const PageContainer = styled.div`
  background-color: ${primaryColorBg};
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  z-index: -1000;
  height: 100%;
  line-height: 100%;
`;

export default PageContainer;
