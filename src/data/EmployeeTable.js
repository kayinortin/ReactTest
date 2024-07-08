const factories = [
  { name: 'BR1', employees: ['John', 'Alice', 'Bob', 'Jessie', 'Karen'] },
  { name: 'BR2', employees: ['Jessie', 'Karen', 'John'] },
  { name: 'BR3', employees: ['Miles', 'Eric', 'Henry', 'Bob'] },
  { name: 'BR4', employees: [] },
]

const employeeType = [
  { id: 1, name: 'FullTime', work_begin: '09:00:00', work_end: '17:00:00' },
  { id: 2, name: 'MidTime', work_begin: '12:00:00', work_end: '21:00:00' },
  { id: 3, name: 'HalfTime', work_begin: '20:00:00', work_end: '00:00:00' },
]

const employees = [
  { id: 1, name: 'Alice', type: 2 },
  { id: 2, name: 'Bob', type: 3 },
  { id: 3, name: 'John', type: 2 },
  { id: 4, name: 'Karen', type: 1 },
  { id: 5, name: 'Miles', type: 3 },
  { id: 6, name: 'Henry', type: 1 },
]

export { factories, employeeType, employees }