interface Pet {
  name: string,
  dob: string,
  species: string,
  vaccinated: boolean,
  image: string,
  owner: string,
  _id: string
}

export default<Pet[]> [
  {
    name: 'Teddy',
    dob: '2021-04-04',
    species: 'dog',
    vaccinated: true,
    image: 'teddy.jpeg',
    owner: '000000000000000000000001',
    _id: '000000000000000000000001'
  },
  {
    name: 'Monty',
    dob: '2020-04-04',
    species: 'dog',
    vaccinated: true,
    image: 'monty.jpeg',
    owner: '000000000000000000000002',
    _id: '000000000000000000000002'
  },
  {
    name: 'Louie',
    dob: '2019-04-04',
    species: 'dog',
    vaccinated: true,
    image: 'louie.jpeg',
    owner: '000000000000000000000003',
    _id: '000000000000000000000003'
  },
  {
    name: 'Blue',
    dob: '2022-01-01',
    species: 'dog',
    vaccinated: false,
    image: 'blue.jpeg',
    owner: '000000000000000000000004',
    _id: '000000000000000000000004'
  }
]