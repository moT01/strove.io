export default {
  api: {
    myOrganizations: {
      isLoading: false,
      data: [
        {
          id: '5e3470b45430d66477ca8d3b',
          name: 'Apollo Tech Inc',
          owner: {
            id: '5d963f095c058e0fe486d56d',
            name: 'AdamZaczek',
            __typename: 'User',
          },
          users: null,
          teams: [
            {
              id: '5e39ce3e99c6bf1d491662dc',
              name: 'Wise guys',
              organizationId: '5e3470b45430d66477ca8d3b',
              projects: [
                {
                  id: '5e3b3caf635dab435d9444f5',
                  name: 'react-router',
                  userId: '5d963f095c058e0fe486d56d',
                  user: {
                    name: 'AdamZaczek',
                    photoUrl:
                      'https://avatars1.githubusercontent.com/u/14284341?v=4',
                    __typename: 'User',
                  },
                  description: 'Declarative routing for React',
                  isPrivate: true,
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
                  user: {
                    name: 'AdamZaczek',
                    photoUrl:
                      'https://avatars1.githubusercontent.com/u/14284341?v=4',
                    __typename: 'User',
                  },
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
              teamLeader: {
                id: '5d963f095c058e0fe486d56d',
                name: 'AdamZaczek',
                photoUrl:
                  'https://avatars1.githubusercontent.com/u/14284341?v=4',
                __typename: 'User',
              },
              users: null,
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
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
  incomingProject: {
    isBeingAdded: false,
    isBeingStarted: false,
  },
  latency: null,
  feature: 'a',
  _persist: {
    version: -1,
    rehydrated: true,
  },
}
