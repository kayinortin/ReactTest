import { useState, useMemo, useEffect } from 'react'
import {
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { factories, employeeType, employees } from './data/EmployeeTable'
import { tasks } from './data/Task'
import { DataTable } from './components/table';

const App = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dayTime, setDayTime] = useState(null);
  const [workingCount, setWorkingCount] = useState(null);

  const orderedEmployees = useMemo(() => {
    const allEmployees = factories.flatMap(factory => factory.employees);
    return [...new Set(allEmployees)].sort();
  }, []);

  const getWorkingEmployeesCount = formattedTime => {
    const [hours, minutes, seconds] = formattedTime.split(':').map(Number);
    let timeInSeconds = hours * 3600 + minutes * 60 + seconds;

    return employees.filter(employee => {
      const type = employeeType.find(t => t.id === employee.type);
      const [startHours, startMinutes, startSeconds] = type.work_begin.split(':').map(Number);
      const [endHours, endMinutes, endSeconds] = type.work_end.split(':').map(Number);
      let startTime = startHours * 3600 + startMinutes * 60 + startSeconds;
      let endTime = endHours * 3600 + endMinutes * 60 + endSeconds;
      let checkTime = timeInSeconds;

      if (endTime <= startTime) {
        endTime += 24 * 3600;
        if (checkTime < startTime) {
          checkTime += 24 * 3600;
        }
      }

      return checkTime >= startTime && checkTime < endTime;
    }).length;
  };

  useEffect(() => {
    if (dayTime) {
      const formattedTime = dayjs(dayTime).format('HH:mm:ss');
      const count = getWorkingEmployeesCount(formattedTime);
      setWorkingCount(count);
    }
  }, [dayTime]);

  const getEmployeeTypeInfo = typeId => {
    return employeeType.find(type => type.id === typeId);
  };

  const employeeColumns = [
    {
      id: 'name',
      label: 'Name',
      render: row => row.name,
      getValue: row => row.name
    },
    {
      id: 'type',
      label: 'Work Type',
      render: row => getEmployeeTypeInfo(row.type).name,
      getValue: row => getEmployeeTypeInfo(row.type).name
    },
    {
      id: 'start_time',
      label: 'Start time',
      render: row => getEmployeeTypeInfo(row.type).work_begin,
      getValue: row => getEmployeeTypeInfo(row.type).work_begin
    },
    {
      id: 'end_time',
      label: 'End time',
      render: row => getEmployeeTypeInfo(row.type).work_end,
      getValue: row => getEmployeeTypeInfo(row.type).work_end
    },
  ];

  const taskColumns = [
    {
      id: 'title',
      label: 'Title',
      render: row => row.title,
      getValue: row => row.title
    },
    {
      id: 'duration',
      label: 'Duration',
      render: row => row.duration,
      getValue: row => row.duration
    },
    {
      id: 'assignee',
      label: 'Assign',
      render: row => employees.find(e => e.id === row.assignee)?.name || 'Unassigned',
      getValue: row => employees.find(e => e.id === row.assignee)?.name || 'Unassigned'
    },
  ];

  const tasksWithAssignees = useMemo(() => {
    return tasks.map(task => ({
      ...task,
      assignee: employees[Math.floor(Math.random() * employees.length)].id
    }));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
      Employee
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        Ordered Employees: {orderedEmployees.join(', ')}
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <TimePicker
            label="Select time"
            value={dayTime}
            onChange={(newValue) => setDayTime(newValue)}
            slotProps={{ textField: { style: { marginRight: '10px' } } }}
          />
          {workingCount !== null && (
            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
              Number of employees working at {dayTime ? dayjs(dayTime).format('HH:mm:ss') : ''} is {workingCount}
            </Typography>
          )}
        </div>
      </LocalizationProvider>

      <DataTable
        columns={employeeColumns}
        data={employees}
        initialSortColumn="name"
        onRowClick={setSelectedEmployee}
        getRowStyle={row => ({
          backgroundColor: selectedEmployee?.id === row.id ? '#EFF5FF' : undefined
        })}
      />

      <Typography variant="h5" gutterBottom>
      Task
      </Typography>

      <DataTable
        columns={taskColumns}
        data={tasksWithAssignees}
        initialSortColumn="title"
        enablePagination={false}
        getRowStyle={row => ({
          backgroundColor: selectedEmployee && selectedEmployee.id === row.assignee ? '#EFF5FF' : undefined
        })}
      />
    </div>
  );
};

export default App;