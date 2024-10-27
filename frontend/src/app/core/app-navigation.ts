export const navigation = [
  {
    text: 'Tareas',
    icon: 'taskcomplete',
    path: '',
    items: [
      {
        text: 'Gestionar Tareas',
        path: '/task/gestionar-tareas',
        roles: [1]
      },
      {
        text: 'Mis tareas',
        path: '/task/mis-tareas',
        roles: [2]
      },
    ],
  },
];
