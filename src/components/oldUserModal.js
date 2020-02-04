import React, { memo, useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'

import { selectors } from 'state'
import Modal from './modal'
import StroveButton from './stroveButton'

const OldUserModal = () => {
  const dispatch = useDispatch()
  const [isOldUser, setIsOldUser] = useState(false)
  const user = useSelector(selectors.api.getUser)

  useEffect(() => {
    user.token && !user?.organizations && setIsOldUser(true)
  }, [user])

  return (
    <Modal
      isOpen={isOldUser}
      contentLabel="Old user"
      ariaHideApp={false}
      isMobile={isMobile}
    >
      It seems your account has been created before important update and is
      outdate. Please relog to update your account.
      <StroveButton
        isPrimary
        padding="5px"
        minWidth="150px"
        maxWidth="150px"
        borderRadius="2px"
        onClick={() => {}}
        text="Leave"
      />
    </Modal>
  )
}

export default memo(OldUserModal)
