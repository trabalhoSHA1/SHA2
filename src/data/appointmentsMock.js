export const appointmentsMock = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 60,
    patient: 'Maria Silva Santos',
    therapist: 'Dr. João',
    type: 'presencial',
    room: 'Sala 101',
    status: 'confirmado',
    contact: '(11) 99999-9999',
    email: 'maria.silva@email.com'
  },
  {
    id: 2,
    date: new Date().toISOString().split('T')[0],
    time: '10:30',
    duration: 60,
    patient: 'João Santos Lima',
    therapist: 'Dra. Ana',
    type: 'online',
    status: 'confirmado',
    contact: '(11) 88888-8888',
    email: 'joao.santos@email.com'
  },
];
