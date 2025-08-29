import { useResolvedPath } from 'react-router-dom';
import api from './axiosConfig';
import { loginUser } from './urls';
import { getCsrfToken } from '../context/AuthContext/AuthContext';

export const registerUser = (postData) => {
  api.post('register/', postData).then((res) => {
    console.log(res.data);
  });
};
export const loginUserService = (postData) => {
  api.post('login/', postData).then((res) => {
    console.log(res.data);
  });
};

export const postAnnouncement = async (postData) => {
  try {
    const csrfToken = await getCsrfToken();
    const resp = await api.post('announcements/', postData, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
      withCredentials: true,
    });
    console.log('post successfull: ', resp);
    return resp;
  } catch (error) {
    console.error('Post failed', error);
    throw error;
  }
};

export const getAnnouncements = () => {
  return api
    .get('announcements/', { withCredentials: true })
    .then((resp) => {
      console.log('fetched announcements: ', resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('announcement get failed: ', error);
      throw error;
    });
};

export const getHolidays = () => {
  return api
    .get('holidays/', { withCredentials: true })
    .then((resp) => {
      console.log('fetched holidays: ', resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('holidays get failed: ', error);
      throw error;
    });
};

export const employeeClockIn = async () => {
  const csrf = await getCsrfToken();
  let isClockedIn = false;
  let inTime = null;
  let totalHours = 0;
  await api
    .get('employee/clock-in/', {
      headers: {
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log('Employee Clock In time: ', resp.data);
      const { clock_in } = resp.data.session[0];
      isClockedIn = resp.data.clock_in;
      inTime = clock_in;
      totalHours = resp.data.session[0].total_work_time;
      console.log(resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
  return { isClockedIn, inTime, totalHours };
};
export const employeeClockInCheck = async () => {
  const csrf = await getCsrfToken();
  let isClockedIn = false;
  let inTime = null;
  let totalHours = 0;
  await api
    .get('employee/checkIn-check/', {
      headers: {
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log('Employee Clock In time: ', resp.data);
      const { clock_in } = resp.data;
      isClockedIn = clock_in;
      totalHours = resp.data.session[0].total_work_time;

      inTime = clock_in ? resp.data.session[0].clock_in : false;

      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
  return { isClockedIn, inTime, totalHours };
};
export const employeeClockOut = async () => {
  const csrf = await getCsrfToken();
  await api
    .get('employee/clock_out/', {
      headers: {
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log('Employee Clock In time: ', resp.data);
      const { clock_in } = resp.data;
      console.log(new Date(clock_in).toLocaleTimeString());
      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
};

export const getBirthdays = () => {
  return api
    .get('birthdays/', { withCredentials: true })
    .then((resp) => {
      console.log('fetched birthdays: ', resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
};

export const getMySessions = async () => {
  let data = [];
  await api
    .get('my_sessions/', { withCredentials: true })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.sessions;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};

export const getAttendanceOverviewData = async (filters) => {
  // filters = { date: 'YYYY-MM-DD', department_id: '...', search: '...' }
  const queryParams = new URLSearchParams();
  if (filters.date) queryParams.append('date', filters.date);
  if (filters.department_id) queryParams.append('department_id', filters.department_id);
  if (filters.search) queryParams.append('search', filters.search);

  try {
    const response = await api.get(`attendance-overview/?${queryParams.toString()}`, {
      withCredentials: true,
    });
    console.log('Fetched attendance overview: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Attendance overview get failed: ', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getTeams = async () => {
  try {
    const response = await api.get('teams/', {
      withCredentials: true,
    });
    console.log('Fetched teams: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Teams get failed: ', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
export const addTimeSheetDetails = async (postData) => {
  const csrf = await getCsrfToken();
  let data = [];
  await api
    .post('time-sheet-details/', postData, {
      headers: { 'X-CSRFToken': csrf },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.sessions;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};

export const getDailyLog = async (postData) => {
  const csrf = await getCsrfToken();
  let data = [];
  await api
    .post('daily-log/', postData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.dailyLog;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};
export const getDailyLogForTimeSheet = async () => {
  const csrf = await getCsrfToken();
  let data = [];
  await api
    .get('daily-log/', {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.dailyLog;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};
export const deleteMyTimeExpense = async (sessionId, expenseId) => {
  const csrf = await getCsrfToken();
  let status = false;
  await api
    .delete(`daily-log-delete-expense/${sessionId}/${expenseId}/`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      console.log(`Delete Status Code-->`, res.status);
      if (res.status == 200) {
        status = true;
      }
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return status;
};
export const addTimeExpenseData = async (postData) => {
  // add-time-expense
  const csrf = await getCsrfToken();
  let data;
  await api
    .post('attendance-add-time-expense/', postData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};
export const upDateMyTimeExpense = async (sessionId, expenseId) => {
  console.log(`upDateMyTimeExpense--`, expenseId);
  const { id } = expenseId;
  const csrf = await getCsrfToken();
  let status = false;
  await api
    .put(`daily-log-delete-expense/${sessionId}/${id}/`, expenseId, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      console.log(`Delete Status Code-->`, res.status);
      status = true;
      if (res.status == 200) {
        status = true;
      }
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return status;
};
export const fetchAllProjects = async () => {
  const csrf = await getCsrfToken();
  let status = true;
  let projectData = [];
  await api
    .get('management/', {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('Pr Details: ', res.data);
      console.log(`Delete Status Code-->`, res.status);
      projectData = res.data;
      if (res.status == 200) {
        status = true;
      }
      return res.data;
    })
    .catch((error) => {
      status = false;
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return projectData;
};
export const fetchProjectData = async (projectId) => {
  const csrf = await getCsrfToken();
  let status = true;
  let projectData = {};
  await api
    .get(`management/?projectId=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('Pr Details: ', res.data);
      console.log(`Delete Status Code-->`, res.status);
      projectData = { ...res.data };
      if (res.status == 200) {
        status = true;
      }
      return res.data;
    })
    .catch((error) => {
      status = false;
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return projectData;
};
export const manageProjectMyTeamView = async (projectId) => {
  const csrf = await getCsrfToken();
  let status = true;
  let projectData = {};
  await api
    .get(`management/?projectId=${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('Pr Details: ', res.data);
      console.log(`Delete Status Code-->`, res.status);
      projectData = { ...res.data };
      if (res.status == 200) {
        status = true;
      }
      return res.data;
    })
    .catch((error) => {
      status = false;
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return projectData;
};

export const submitTimeSheet = async (sessionId) => {
  const csrf = await getCsrfToken();
  let status = true;
  await api
    .put(`submit-timesheet/${sessionId}/`, sessionId, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('Pr Details: ', res.data);
      console.log(`Delete Status Code-->`, res.status);
      if (res.status == 200) {
        status = true;
      }
      return res.data;
    })
    .catch((error) => {
      status = false;
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return status;
};


// --- Project Management ---
export const getAllProjects = async () => {
  try {
    const response = await api.get('management/projects/');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response?.data || error.message);
    throw error;
  }
};

export const createProject = async (projectData) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.post('management/projects/', projectData, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.put(`management/projects/${projectId}/`, projectData, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  const csrf = await getCsrfToken();
  try {
    await api.delete(`management/projects/${projectId}/`, {
      headers: { 'X-CSRFToken': csrf },
    });
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw error;
  }
};

export const addProjectEmployee = async (projectId, employeeId, type = 'member') => { // type can be 'member' or 'manager'
  const csrf = await getCsrfToken();
  const urlPath = type === 'manager' ? 'add-manager' : 'add-member';
  try {
    const response = await api.post(`management/projects/${projectId}/${urlPath}/`, { employee_id: employeeId }, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error)
 {
    console.error(`Error adding ${type} to project:`, error.response?.data || error.message);
    throw error;
  }
};

export const removeProjectEmployee = async (projectId, employeeId, type = 'member') => {
  const csrf = await getCsrfToken();
  const urlPath = type === 'manager' ? 'remove-manager' : 'remove-member';
  try {
    const response = await api.post(`management/projects/${projectId}/${urlPath}/`, { employee_id: employeeId }, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error(`Error removing ${type} from project:`, error.response?.data || error.message);
    throw error;
  }
};

// --- Team Management ---
export const getAllTeams = async () => {
  try {
    const response = await api.get('management/teams/');
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error.response?.data || error.message);
    // throw error; // Already handled by getTeams in services.js, if this is a duplicate, remove one
    // For now, assuming this is the primary one for the management module
    throw error;
  }
};

export const createTeam = async (teamData) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.post('management/teams/', teamData, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error.response?.data || error.message);
    throw error;
  }
};

export const updateTeam = async (teamId, teamData) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.put(`management/teams/${teamId}/`, teamData, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating team:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteTeam = async (teamId) => {
  const csrf = await getCsrfToken();
  try {
    await api.delete(`management/teams/${teamId}/`, {
      headers: { 'X-CSRFToken': csrf },
    });
  } catch (error) {
    console.error('Error deleting team:', error.response?.data || error.message);
    throw error;
  }
};

export const setTeamManager = async (teamId, employeeId) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.post(`management/teams/${teamId}/set-manager/`, { employee_id: employeeId }, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error setting team manager:', error.response?.data || error.message);
    throw error;
  }
};

export const addTeamMember = async (teamId, employeeId) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.post(`management/teams/${teamId}/add-member/`, { employee_id: employeeId }, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding team member:', error.response?.data || error.message);
    throw error;
  }
};

export const removeTeamMember = async (teamId, employeeId) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.post(`management/teams/${teamId}/remove-member/`, { employee_id: employeeId }, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing team member:', error.response?.data || error.message);
    throw error;
  }
};

// --- Role Management ---
export const getAllSystemRoles = async () => {
  try {
    const response = await api.get('management/roles/');
    return response.data;
  } catch (error) {
    console.error('Error fetching system roles:', error.response?.data || error.message);
    throw error;
  }
};

export const getEmployeesWithRoles = async () => {
  try {
    const response = await api.get('management/employees-roles/');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees with roles:', error.response?.data || error.message);
    throw error;
  }
};

export const updateEmployeeRole = async (employeeId, roleId) => {
  const csrf = await getCsrfToken();
  try {
    const response = await api.patch(`management/employees/${employeeId}/update-role/`, { role_id: roleId }, {
      headers: { 'X-CSRFToken': csrf },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating employee role:', error.response?.data || error.message);
    throw error;
  }
};

// Utility to get all employees for dropdowns
export const getAllEmployeesSimple = async () => {
  try {
    const response = await api.get('management/all-employees/');
    return response.data;
  } catch (error) {
    console.error('Error fetching all employees:', error.response?.data || error.message);
    throw error;
  }
};