// import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styled, { keyframes, css } from 'styled-components'

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const sizeProps = props =>
  css`
    ${props.width && `width: ${props.width}`};
    ${props.width && `left: calc(50vw - ${props.width}/2)`};
    ${props.height && `height: ${props.height}`};
    ${props.height && `top: calc(50vh - ${props.height}/2)`};
  `

export default styled(Modal)`
  ${sizeProps};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;

  :focus {
    outline: 0;
  }
`
