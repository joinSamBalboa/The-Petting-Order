interface Request {
  owner: string,
  pets: string[],
  type: string,
  from: string,
  to: string,
  accepted: boolean,
  _id: string
}

export default<Request[]> [
  {
    owner: '000000000000000000000001',
    pets: ['000000000000000000000001'],
    type: 'walk',
    from: '2022-01-17',
    to: '2022-01-18',
    accepted: true,
    _id: '000000000000000000000001'
  },
  {
    owner: '000000000000000000000002',
    pets: ['000000000000000000000002'],
    type: 'walk',
    from: '2022-01-17',
    to: '2022-01-18',
    accepted: false,
    _id: '000000000000000000000002'
  }
]