import * as C from './consts'
export const addGuestInvitation = ({ isGuest, guestId }) => ({
  type: C.ADD_GUEST_INVITATION,
  payload: {
    isGuest,
    guestId,
  },
})
