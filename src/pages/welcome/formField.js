import styled, { css } from 'styled-components'
import { isMobileOnly } from 'react-device-detect'

export default styled.input`
  box-shadow: none;
  color: ${({ theme }) => theme.colors.c12};
  outline: 0;
  background: ${({ theme }) => theme.colors.c2};
  height: 56px;
  padding: 10px 0;
  line-height: 36px;
  font-size: 17px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 0.2px;
  border: 0;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
`
