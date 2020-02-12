import styled from 'styled-components'
import { isMobileOnly } from 'react-device-detect'

export default styled.ul`
  font-size: 13px;
  padding: 0;
  margin: 0;
  color: ${({ team }) => (team ? '#fff' : '#0072ce')};
  li {
    display: ${isMobileOnly ? 'block' : 'inline-block'};
    margin-right: 8px;
    list-style: none;
    &:before {
      margin-right: 0.3em;
      content: '✔';
      color: ${({ team }) => (team ? '#fff' : '#0072ce')};
    }
  }
`
