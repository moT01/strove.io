import React, { memo } from 'react'
import { Icon } from 'antd'
import { isMobileOnly, isMobile } from 'react-device-detect'

import { theme } from 'consts'

import GetStarted from './getStarted'
import {
  StyledCellHeader,
  StyledSectionWrapper,
  StyledHeadingSection,
  StyledH1,
  StyledProductDescription,
  Illustration,
  SectionDivider,
  IconContainer,
  StyledH3,
  SectionWrapper,
  SmallSectionWrapper,
  StyledCell,
  StyledH2,
  StyledGrid,
  StyledHeaderText,
  StyledFeatureDescription,
  StyledSectionIcon,
  DemoImage,
  BannerWrapper,
} from './styled'

const Banner = () => (
  <>
    <BannerWrapper
      padding={isMobileOnly ? '20px' : '50px'}
      isMobileOnly={isMobileOnly}
    >
      <StyledHeadingSection type={isMobileOnly ? 'bottom' : 'right'}>
        <StyledH1>Cloud alternative for local software development</StyledH1>
        <StyledProductDescription>
          Manage team. Write, run and share code, all in one place
        </StyledProductDescription>
        <GetStarted />
      </StyledHeadingSection>
      {!isMobileOnly && (
        <Illustration
          decoding="async"
          src={require('assets/illustration.png')}
          alt="illustration"
          width="50%"
          height="50%"
        />
      )}
    </BannerWrapper>
    <StyledSectionWrapper
      isSecondary
      background={theme.colors.c2}
      padding={`20px ${isMobile ? '20px' : '25%'}`}
      isMobileOnly={isMobileOnly}
    >
      <SectionDivider flexDirection="column">
        <IconContainer>
          <StyledSectionIcon type="laptop" />
        </IconContainer>
        <StyledH3 color={theme.colors.c3}>
          Toolkit for modern software organizations
        </StyledH3>
        <StyledProductDescription color={theme.colors.c26}>
          Whether you’re creating a banking app, an e-commerce store, or a
          crowdfunding platform, Strove will allow you to deliver your features
          more efficiently and with less effort
        </StyledProductDescription>
      </SectionDivider>
    </StyledSectionWrapper>
    <StyledSectionWrapper
      isSecondary
      padding="20px"
      background="white"
      isMobileOnly={isMobileOnly}
    >
      <SectionDivider isMobile={isMobile}>
        <SectionWrapper isMobile={isMobile} padding="20px 10px">
          <SmallSectionWrapper isMobile={isMobile}>
            <StyledCell>
              <StyledCellHeader>
                <StyledH2 color={theme.colors.c3}>Before</StyledH2>
              </StyledCellHeader>
              <StyledProductDescription>
                Programmers try everything to solve{' '}
                <b>it works on my machine</b> and <b>work from home</b> problems
              </StyledProductDescription>
              <StyledProductDescription>
                Virtual machines
              </StyledProductDescription>
              <StyledProductDescription>
                Docker containers
              </StyledProductDescription>
              <StyledProductDescription>Devops teams</StyledProductDescription>
              <StyledProductDescription>
                Leasing computers
              </StyledProductDescription>
            </StyledCell>
          </SmallSectionWrapper>
        </SectionWrapper>
        <SectionWrapper isMobile={isMobile} padding="20px 10px">
          <SmallSectionWrapper isMobile={isMobile}>
            <StyledCell>
              <StyledCellHeader>
                <StyledH2 color={theme.colors.c3}>After</StyledH2>
              </StyledCellHeader>
              <StyledProductDescription>
                Save hours to days per developer by running code in seconds from
                anywhere
              </StyledProductDescription>
            </StyledCell>
          </SmallSectionWrapper>
        </SectionWrapper>
      </SectionDivider>
    </StyledSectionWrapper>
    <StyledSectionWrapper
      isSecondary
      padding="20px"
      background="white"
      isMobileOnly={isMobileOnly}
    >
      <SectionDivider isMobile={isMobile}>
        <SectionWrapper isMobile={isMobile} padding="20px 10px">
          <SmallSectionWrapper isMobile={isMobile}>
            <StyledCell>
              <StyledCellHeader>
                <StyledH2 color={theme.colors.c3}>Save time</StyledH2>
              </StyledCellHeader>
              <StyledProductDescription>
                Save hours to days per developer by running code in seconds from
                anywhere
              </StyledProductDescription>
            </StyledCell>
          </SmallSectionWrapper>
        </SectionWrapper>
        <SectionWrapper padding="20px 10px">
          <DemoImage
            decoding="async"
            shadowOpacity="0.3"
            src={require('assets/editor.png')}
            alt="editor image"
          />
        </SectionWrapper>
      </SectionDivider>
    </StyledSectionWrapper>
    <StyledSectionWrapper
      isSecondary
      padding="50px 20px 50px"
      background={theme.colors.c27}
      isMobileOnly={isMobileOnly}
    >
      <SectionDivider isMobile={isMobile}>
        <SectionWrapper isMobile={isMobile} padding="20px 10px">
          <SectionWrapper isMobile={isMobile}>
            <DemoImage
              decoding="async"
              shadowOpacity="0.1"
              src={require('assets/teams.png')}
              alt="teams image"
            />
          </SectionWrapper>
        </SectionWrapper>
        <SectionWrapper>
          <SmallSectionWrapper padding="20px 10px">
            <StyledCell>
              <StyledCellHeader>
                <StyledH2 color={theme.colors.c3}>
                  More effective collaboration
                </StyledH2>
              </StyledCellHeader>
              <StyledProductDescription>
                Spend more time on what matters by reducing managing permissions
                and sharing environment to a single click
              </StyledProductDescription>
            </StyledCell>
          </SmallSectionWrapper>
        </SectionWrapper>
      </SectionDivider>
    </StyledSectionWrapper>
    <StyledSectionWrapper
      isSecondary
      padding="0 20px 20px"
      background={theme.colors.c27}
      isMobileOnly={isMobileOnly}
    >
      <StyledGrid>
        <StyledCell>
          <StyledCellHeader>
            <IconContainer>
              <Icon type="clock-circle" style={{ color: theme.colors.c1 }} />
            </IconContainer>
            <StyledHeaderText>Give focus a chance</StyledHeaderText>
          </StyledCellHeader>
          <StyledFeatureDescription>
            A lot of time and work is needed to make code work on local
            machines. Choosing cloud environment lets team do their actual job
            from the get go.
          </StyledFeatureDescription>
        </StyledCell>
        <StyledCell>
          <StyledCellHeader>
            <IconContainer>
              <Icon type="bug" style={{ color: theme.colors.c1 }} />
            </IconContainer>
            <StyledHeaderText>Debug less</StyledHeaderText>
          </StyledCellHeader>
          <StyledFeatureDescription>
            Say goodbye to 'It works on my machine' issue. The code will work
            the same for all team members, no matter the machine or operating
            system.
          </StyledFeatureDescription>
        </StyledCell>
        <StyledCell>
          <StyledCellHeader>
            <IconContainer>
              <Icon type="cloud-sync" style={{ color: theme.colors.c1 }} />
            </IconContainer>
            <StyledHeaderText>Development, organized</StyledHeaderText>
          </StyledCellHeader>
          <StyledFeatureDescription>
            Unlike in the past, sharing the environment with anyone in the team
            can be done with a single click.
          </StyledFeatureDescription>
        </StyledCell>
      </StyledGrid>
    </StyledSectionWrapper>
  </>
)

export default memo(Banner)
