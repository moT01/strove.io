const users = [
  {
    name: 'Ashley Patterson',
    photoUrl: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
]

export default {
  api: {
    myOrganizations: {
      isLoading: false,
      data: [
        {
          id: '5e3470b45430d66477ca8d3b',
          name: 'Apollo Tech Inc',
          owner: users[0],
          users: null,
          teams: [
            {
              id: '5e39ce3e99c6bf1d491662dc',
              name: 'Apollo Backend V2',
              organizationId: '5e3470b45430d66477ca8d3b',
              projects: [
                {
                  id: '5e3b3caf635dab435d9444f5',
                  name: 'Apollo API',
                  userId: '5d963f095c058e0fe486d56d',
                  user: users[0],
                  description: 'V1 was finished in 1969 so let\s do V2,
                  isPrivate: false,
                  createdAt: '1580940463504',
                  repoLink: 'https://github.com/reacttraining/react-router.git',
                  machineId: null,
                  editorPort: null,
                  additionalPorts: [
                    [3000, null],
                    [4000, null],
                    [8000, null],
                    [8080, null],
                  ],
                  machineName: null,
                  isVisible: true,
                  teamId: '5e39ce3e99c6bf1d491662dc',
                  forkedFromId: null,
                  __typename: 'Project',
                },
                {
                  id: '5e3c96b9b084836851f7c889',
                  name: 'freecodecamp-exercise-tracker',
                  userId: '5d963f095c058e0fe486d56d',
                  user: users[0],
                  description: 'freeCodeCamp - Challenge Exercise Tracker',
                  isPrivate: true,
                  createdAt: '1581029049513',
                  repoLink:
                    'https://github.com/stroveio/freecodecamp-exercise-tracker.git',
                  machineId: null,
                  editorPort: null,
                  additionalPorts: [
                    [27017, null],
                    [3000, null],
                    [4000, null],
                    [8000, null],
                    [8080, null],
                  ],
                  machineName: null,
                  isVisible: false,
                  teamId: '5e39ce3e99c6bf1d491662dc',
                  forkedFromId: null,
                  __typename: 'Project',
                },
              ],
              teamLeader: users[0],
              users,
              invited: null,
              __typename: 'Team',
            },
          ],
          paymentId: null,
          customerId: null,
          subscriptionId: null,
          subscriptionStatus: null,
          subscriptionQuantity: null,
          __typename: 'Organization',
        },
      ],
    },
  },
}
