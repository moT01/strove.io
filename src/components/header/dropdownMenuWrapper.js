import styled from 'styled-components'

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: auto;
  word-break: initial;
  box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-style: solid;
  background-color: ${({ theme }) => theme.colors.c2};
  position: relative;
  word-break: initial;
`
