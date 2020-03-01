import styled, { css } from 'styled-components'
import { isMobileOnly } from 'react-device-detect'

export default styled.input`
  color: ${({ theme }) => theme.colors.c12};
  width: 100%;
  height: 56px;
  padding: 10px 20px;
  line-height: 36px;
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.2px;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
`
