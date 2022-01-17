interface User {
  username: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  profileImage: string,
  phoneNumber: number,
  postCode: string,
  _id: string
}

export default<User[]> [
  {
  username: 'Jason',
  email: 'jason@email.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  profileImage: 'https://i.imgur.com/gYQmnSa.jpg',
  phoneNumber: 7000000000,
  postCode: 'e3',
  _id: '000000000000000000000001'
  },
  {
    username: 'Ben',
    email: 'ben@email.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    profileImage: 'https://i.imgur.com/gYQmnSa.jpg',
    phoneNumber: 7000000001,
    postCode: 'hp10',
    _id: '000000000000000000000002'
  },
  {
    username: 'Tony',
    email: 'tony@email.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    profileImage: 'https://i.imgur.com/gYQmnSa.jpg',
    phoneNumber: 7000000002,
    postCode: 'hp15',
    _id: '000000000000000000000003'
  },
  {
    username: 'Jonny',
    email: 'jonny@email.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    profileImage: 'https://i.imgur.com/gYQmnSa.jpg',
    phoneNumber: 7000000003,
    postCode: 'so21',
    _id: '000000000000000000000004'
  }
]