import React, { useState, memo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Formik, Field } from 'formik'
import { withRouter } from 'react-router-dom'

import { mutation, handleStopProject, updateOrganizations } from 'utils'
import { useAnalytics } from 'hooks'
import {
  CREATE_TEAM,
  RENAME_TEAM,
  REMOVE_MEMBER,
  DELETE_TEAM,
  SET_ADMIN,
  LEAVE_TEAM,
  DOWNGRADE_SUBSCRIPTION,
  REMOVE_FROM_ORGANIZATION,
} from 'queries'
import { selectors, actions } from 'state'
import {
  GetStarted,
  StroveButton,
  SEO,
  Header,
  Footer,
  Modal,
  InviteMembersForm,
} from 'components'
import StroveLogo from 'images/strove.png'
import Projects from './projects'
import {
  FormWrapper,
  StyledForm,
  PageWrapper,
  TeamTileWrapper,
  DashboardWrapper,
  Title,
  SectionTitle,
  TeamTile,
  TeamTileSection,
  ModalButton,
  Text,
  ModalText,
  WarningText,
  VerticalDivider,
  Divider,
  RowWrapper,
  InviteStatus,
  IconWrapper,
  ExpandIcon,
  StyledCloseIcon,
  TeamTileHeader,
  TileSectionHeader,
  SettingWrapper,
  DropdownWrapper,
  StyledSelect,
  Setting,
  UserPhoto,
  OrganizationName,
  StyledErrors,
  TilesWrapper,
  // TimeBarContainer,
  // TimeBar,
  // TimeText,
  NameWrapper,
  InviteWrapper,
} from './styled'

const validateTeamName = values => {
  let errors = {}

  if (values.projectName && !values.projectName.trim()) {
    errors.projectName = 'Add name'
    return errors
  } else if (values.projectName.length > 100) {
    errors.projectName = 'Name too long'
    return errors
  }

  return errors
}

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const Dashboard = ({ organization }) => {
  const user = useSelector(selectors.api.getUser)

  if (
    organization.owner.id === user.id &&
    organization.subscriptionStatus === 'inactive' &&
    user?.timeSpent >= 65800
  ) {
    return (
      <div>
        <TimeBarContainer>
          <TimeBar time={user.timeSpent} />
        </TimeBarContainer>
        <TimeText>
          Time spent in editor: {time.hours}h {time.minutes}m {time.seconds}s /
          20h
        </TimeText>
      </div>
    )
  }
  return null
}

export default memo(withRouter(Dashboard))
