# React test

Below is the questions and the related data

you are free to create any other files,

**just make sure your final answers all in `App.jsx`**

### submit your answer
Create a git repo for `althea834`, `BillyPJChen` and add them into your private repo.


## Run the project

```
npm install
npm run start
```

---

## Data

```js
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

const tasks = [
  { id: 1, title: 'task01', duration: 60 }, // min
  { id: 2, title: 'task02', duration: 120 },
  { id: 3, title: 'task03', duration: 180 },
  { id: 4, title: 'task04', duration: 360 },
  { id: 5, title: 'task05', duration: 30 },
  { id: 6, title: 'task06', duration: 220 },
  { id: 7, title: 'task07', duration: 640 },
  { id: 8, title: 'task08', duration: 250 },
  { id: 9, title: 'task09', duration: 119 },
  { id: 10, title: 'task10', duration: 560 },
  { id: 11, title: 'task11', duration: 340 },
  { id: 12, title: 'task12', duration: 45 },
  { id: 13, title: 'task13', duration: 86 },
  { id: 14, title: 'task14', duration: 480 },
  { id: 15, title: 'task15', duration: 900 },
]
```

---

## Questions

1. Order employees list (in `factories`) by alphabetical order

2. Make a function that take as parameters `dayTime` and return `number of employee working`

3. Use `Material UI` to build a page with a table `Employee`,

   all columns can be sorted

   below the color palette

4. Add pagination to the top table,

   use `Material UI` to build another table `Task`,

   several rows will be selected only if the assign is selected in the `Employee` table,

```
demo video: demo.mov

Table component(React): https://mui.com/material-ui/react-table/

color palette:
  - table body: #fff
  - items:  #FAFAFA / #fff
  - hover: #EEEEEE
  - selected: #EFF5FF
```
