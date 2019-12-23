import React, { memo, useState, useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import Downshift from 'downshift'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import { Desktop } from 'components/svgs'

const Text = styled.h3`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.c2};
  transition: color 0.3s;
  margin: 0;
  font-weight: 300;
  line-height: 1;
  :hover {
    color: ${({ theme }) => theme.colors.c3};
  }
`

const PreviewButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: 'relative';
  background: none;
  border: none;
  text-decoration: none;
  line-height: 1;
  padding: 0;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  :focus {
    outline: 0;
  }

  span {
    color: ${({ theme }) => theme.colors.c2};
  }

  :hover {
    span {
      color: ${({ theme }) => theme.colors.c3};
    }
  }

  > {
    vertical-align: bottom;
  }
`

const LinkText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 300;
  margin: 0;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
    svg {
      fill: ${({ theme }) => theme.colors.c3};
    }
  }
`

const DropdownWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  background: none;
  display: flex;
  right: ${props => (props.isEmbed ? '-75px' : '-10px')};
  display: ${({ display }) => (display ? 'visible' : 'hidden')};
`

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: auto;
  box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-style: solid;
  background-color: ${({ theme }) => theme.colors.c2};
  z-index: 3;
  position: relative;
`

const OptionText = styled(Text)`
  color: ${({ theme }) => theme.colors.c1};
  font-weight: 300;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.colors.c2};
    transition: color 0.1s;
    text-decoration: none;
  }
`

const Option = styled.a`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: auto;
  height: 32px;
  font-size: 16px;
  border-bottom-left-radius: ${props => props.isLast && '3px'};
  border-bottom-right-radius: ${props => props.isLast && '3px'};
  z-index: 4;
  text-decoration: none;
  font-weight: 300;
  min-width: ${props => (props.isEmbed ? '0' : '150px')};

  svg {
    fill: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    width: 2.2vh;
    height: auto;
    margin-right: 5px;
  }

  :hover {
    background-color: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    cursor: pointer;
    text-decoration: none;
    ${OptionText} {
      color: ${({ theme }) => theme.colors.c2};
      transition: color 0.1s;
      text-decoration: none;
    }
  }

  :hover svg {
    fill: ${({ theme, invert }) =>
      invert ? theme.colors.c2 : theme.colors.c1};
    cursor: pointer;
  }
`

const PreviewLink = styled.a`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: 'none';
  position: relative;
  display: flex;
  height: ${props => (props.isEmbed ? '18px' : 'auto')};
  padding: 0;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`

const PortOption = styled(OptionText)`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 16px;
  font-weight: 300;
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.colors.c2};
    transition: color 0.1s;
    text-decoration: none;
  }
`

const StyledDesktopIcon = styled(Desktop)`
  height: 20px;
  width: 20px;
  fill: ${({ theme }) => theme.colors.c2};
`

const PreviewDropdown = props => {
  const [ports, setPorts] = useState([])
  const project = useSelector(selectors.api.getCurrentProject)

  useEffect(() => {
    if (props.isEditor) {
      if (project?.machineName) {
        setPorts(
          project.additionalPorts.map(portPair => {
            let href
            /* Env's are loaded as strings on production */
            if (process.env.REACT_APP_IS_OPENSOURCE === 'true') {
              href = `https://${portPair[1]}.vmopen${
                project.machineName.match(/\d+/g)[0]
              }.silisky.com`
            } else if (process.env.NODE_ENV === 'development') {
              href = `https://${portPair[1]}.vmdev${
                project.machineName.match(/\d+/g)[0]
              }.silisky.com`
            } else {
              href = `https://${portPair[1]}.${project.machineName}.silisky.com`
            }
            return {
              label: `http://0.0.0.0:${portPair[0]}`,
              href,
            }
          })
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.machineName, project?.additionalPorts])

  return (
    <>
      {props.isEditor && (
        <Downshift>
          {({ getToggleButtonProps, isOpen }) => (
            // This has to be done with <div>. Using styled components causes Downshift crash
            <div style={{ position: 'relative' }}>
              <PreviewButton {...getToggleButtonProps({})} {...props}>
                {isMobileOnly ? (
                  <StyledDesktopIcon {...props} />
                ) : (
                  <LinkText {...props}>Preview</LinkText>
                )}
              </PreviewButton>
              <DropdownWrapper {...props}>
                {isOpen && (
                  <MenuWrapper>
                    {ports.map((item, index, arr) => (
                      <Option
                        invert
                        {...props}
                        key={item.value}
                        href={item.href}
                        isLast={index === arr.length - 1}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <PreviewLink
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <PortOption invert>{item.label}</PortOption>
                        </PreviewLink>
                      </Option>
                    ))}
                  </MenuWrapper>
                )}
              </DropdownWrapper>
            </div>
          )}
        </Downshift>
      )}
    </>
  )
}

export default memo(PreviewDropdown)
