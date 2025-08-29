import { Home, User, BarChart, Building, CalendarDays, Wallet, Plane } from 'lucide-react';
export const availableHolidayList = [
  { date: '2025-01-01', name: "New Year's Day" },
  { date: '2025-02-14', name: "Valentine's Day" },
  { date: '2025-03-17', name: "St. Patrick's Day" },
  { date: '2025-04-20', name: 'Easter Sunday' },
  { date: '2025-05-05', name: 'Cinco de Mayo' },
  { date: '2025-07-04', name: 'Independence Day (USA)' },
  { date: '2025-10-31', name: 'Halloween' },
  { date: '2025-11-27', name: 'Thanksgiving (USA)' },
  { date: '2025-12-25', name: 'Christmas Day' },
  { date: '2025-12-31', name: "New Year's Eve" },
];
export const myDailyAttendance = [
  {
    date: '4/29/2025',
    status: 1,
    checkIn: '9:00AM',
    checkOut: '5:00PM',
    totalHours: 8,
  },
  {
    date: '4/27/2025',
    status: 1,
    checkIn: '9:00AM',
    checkOut: '5:00PM',
    totalHours: 8,
  },
  {
    date: '4/2/2025',
    status: 1,
    checkIn: '9:00AM',
    checkOut: '5:00PM',
    totalHours: 8,
  },
  {
    date: '4/23/2025',
    status: 0,
    checkIn: '',
    checkOut: '',
    totalHours: 0,
  },
  {
    date: '4/25/2025',
    status: 1,
    checkIn: '9:00AM',
    checkOut: '5:00PM',
    totalHours: 8,
  },
];

export const loggedInUserDetails = {
  name: 'Mariam',
  availableEarnedLeaves: 4.5,
  availableSickLeaves: 5,
};

export const announcementListDummy = [
  {
    title: 'Office Relocation Update - Moving Next Month!',
    content:
      'We will be working from our new office from May 28th. Details about the new location and logistics will be shared soon.',
  },

  {
    title: 'Reminder: Submit Your Tax Declarations by April 30th',
    content:
      'The deadline for submitting your investment proofs is fast approaching. Upload your documents through the payroll portal to avoid delays.',
  },
];

export const upcomingHolidaysList = [
  { name: 'May Day', date: '01 May 2025', day: 'Thursday' },
  { name: 'Buddha Purnima', date: '12 May 2025', day: 'Monday' },
  { name: 'Bakrid', date: '07 JUN 2025', day: 'Saturday' },
  { name: 'Independence Day', date: '15 AUG 2025', day: 'Friday' },
  { name: 'Gandhi Jayanthi', date: '02 OCT 2025', day: 'Thursday' },
  { name: 'Diwali', date: '21 OCT 2025', day: 'Tuesday' },
];

export const upcomingBirthdaysListDummy = [
  { name: '[Dummy] Devshri J', role: 'Senior Software Engineer', bday: 'April 27' },
  { name: '[Dummy] Surya K', role: 'Associate Software Engineer', bday: 'May 23' },
  { name: '[Dummy] Anuv Jain', role: 'Creative Advisor', bday: 'May 27' },
  { name: '[Dummy] Ishanya', role: 'Project Manager', bday: 'Jun 02' },
];

export const empPayslips = {
  2023: [
    {
      period: 'JAN 2023',
      month: 1,
      year: 2023,
      payDate: 'Jan 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'FEB 2023',
      month: 2,
      year: 2023,
      payDate: 'Feb 28, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'MAR 2023',
      month: 3,
      year: 2023,
      payDate: 'Mar 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'APR 2023',
      month: 4,
      year: 2023,
      payDate: 'Apr 30, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'MAY 2023',
      month: 5,
      year: 2023,
      payDate: 'May 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'JUN 2023',
      month: 6,
      year: 2023,
      payDate: 'Jun 30, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'JUL 2023',
      month: 7,
      year: 2023,
      payDate: 'Jul 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'AUG 2023',
      month: 8,
      year: 2023,
      payDate: 'Aug 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'SEP 2023',
      month: 9,
      year: 2023,
      payDate: 'Sep 30, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'OCT 2023',
      month: 10,
      year: 2023,
      payDate: 'Oct 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'NOV 2023',
      month: 11,
      year: 2023,
      payDate: 'Nov 30, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'DEC 2023',
      month: 12,
      year: 2023,
      payDate: 'Dec 31, 2023',
      netPay: '₹65,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
  ],
  2024: [
    {
      period: 'JAN 2024',
      month: 1,
      year: 2024,
      payDate: 'Jan 31, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'FEB 2024',
      month: 2,
      year: 2024,
      payDate: 'Feb 29, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'MAR 2024',
      month: 3,
      year: 2024,
      payDate: 'Mar 31, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'APR 2024',
      month: 4,
      year: 2024,
      payDate: 'Apr 30, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'MAY 2024',
      month: 5,
      year: 2024,
      payDate: 'May 31, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'JUN 2024',
      month: 6,
      year: 2024,
      payDate: 'Jun 30, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'JUL 2024',
      month: 7,
      year: 2024,
      payDate: 'Jul 31, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'AUG 2024',
      month: 8,
      year: 2024,
      payDate: 'Aug 31, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'SEP 2024',
      month: 9,
      year: 2024,
      payDate: 'Sep 30, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'OCT 2024',
      month: 10,
      year: 2024,
      payDate: 'Oct 31, 2024',
      netPay: '₹70,000',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'NOV 2024',
      month: 11,
      year: 2024,
      payDate: 'Nov 30, 2024',
      netPay: '₹75,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'DEC 2024',
      month: 12,
      year: 2024,
      payDate: 'Dec 31, 2024',
      netPay: '₹75,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
  ],
  2025: [
    {
      period: 'JAN 2025',
      month: 1,
      year: 2025,
      payDate: 'Jan 31, 2025',
      netPay: '₹75,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'FEB 2025',
      month: 2,
      year: 2025,
      payDate: 'Feb 28, 2025',
      netPay: '₹75,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'MAR 2025',
      month: 3,
      year: 2025,
      payDate: 'Mar 31, 2025',
      netPay: '₹75,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'APR 2025',
      month: 4,
      year: 2025,
      payDate: 'Apr 30, 2025',
      netPay: '₹85,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
    {
      period: 'MAY 2025',
      month: 5,
      year: 2025,
      payDate: 'May 31, 2025',
      netPay: '₹85,439',
      downloadUrl: 'https://www.youtube.com/watch?v=YaNkAvEG9fs',
    },
  ],
};

export const hrPayslipsUploadHistory = [
  {
    filename: 'VM_MAY-2025_payslips.xlsx',
    payPeriod: 'MAY 2025',
    uploadTime: '08:34 AM, May 01 2025',
    status: 'Success',
    successNum: 61,
    failedNum: 0,
  },
  {
    filename: 'VM_APRIL-2025_payslips.xlsx',
    payPeriod: 'APR 2025',
    uploadTime: '09:45 AM, April 01 2025',
    status: 'Success',
    successNum: 49,
    failedNum: 0,
  },
  {
    filename: 'VM_MARCH-2025_payslips.xlsx',
    payPeriod: 'MAR 2025',
    uploadTime: '09:10 AM, March 01 2025',
    status: 'Success',
    successNum: 49,
    failedNum: 0,
  },
  {
    filename: 'VM_FEB-2025_payslips.xlsx',
    payPeriod: 'FEB 2025',
    uploadTime: '10:39 AM, February 01 2025',
    status: 'Success',
    successNum: 26,
    failedNum: 0,
  },
];

export const Roles = ['hradmin', 'employee', 'manager'];
export const NavigationPaths = [
  {
    mainPath: {
      to: '/home',
      icon: 'Home',
      Name: 'Home',
      className: '',
      accessList: ['hradmin', 'employee', 'manager'],
    },
  },
  {
    mainPath: {
      icon: 'User',
      className: 'profile',
      Name: 'Profile',
      accessList: ['hradmin', 'employee', 'manager'],
    },
    subPath: [
      {
        to: '/profile/basic-details',
        Name: 'Basic Details',
        accessList: ['hradmin', 'employee', 'manager'],
      },
      {
        to: '/profile/ProfileList',
        Name: ' ProfileList',
        accessList: ['hradmin', 'employee', 'manager'],
      },
      {
        to: '/teams/teamhierarchy',
        Name: 'Team Hierarchy',
        accessList: ['hradmin', 'employee', 'manager'],
      },
    ],
  },
  {
    mainPath: {
      icon: 'BarChart',
      className: 'assets',
      Name: 'Assets',
      accessList: ['hradmin', 'employee', 'manager'],
    },
    subPath: [
      {
        to: '/assets',
        Name: ' My Assets',
        accessList: ['hradmin', 'employee', 'manager'],
      },
      {
        to: '/assets/dashboard',
        Name: 'Assets Category',
        accessList: ['hradmin', 'employee', 'manager'],
      },
    ],
  },
  // {
  //   mainPath: {
  //     icon: 'Building',
  //     className: 'organization',
  //     Name: 'Org',
  //     accessList: ['hradmin', 'employee', 'manager'],
  //   },
  //   subPath: [
  //     {
  //       to: '/organization/chart',
  //       Name: 'Org Chart',
  //       accessList: ['hradmin', 'employee', 'manager'],
  //     },
  //   ],
  // },
  {
    mainPath: {
      icon: 'CalendarDays',
      className: 'attendance',
      Name: 'Attendance',
      accessList: ['hradmin', 'employee', 'manager'],
    },
    subPath: [
      {
        to: '/attendance/daily',
        Name: 'Daily Log',
        accessList: ['hradmin', 'employee', 'manager'],
      },
      {
        to: '/attendance/overview',
        Name: 'Attendance Dashboard',
        accessList: ['hradmin', 'manager'],
      },
    ],
  },
  {
    mainPath: {
      icon: 'Wallet',
      className: 'payroll',
      Name: 'Payroll',
      accessList: ['hradmin', 'employee', 'manager'],
    },
    subPath: [
      {
        to: '/payroll/emp/payslips',
        Name: 'My Payslips',
        accessList: ['hradmin', 'employee', 'manager'],
      },
      {
        to: '/payroll/hr/payslips',
        Name: 'HR Admin Payslips',
        accessList: ['hradmin', 'employee', 'manager'],
      },
    ],
  },
  {
    mainPath: {
      icon: 'Plane',
      className: 'leaves',
      Name: 'Leaves',
      accessList: ['hradmin', 'employee', 'manager'],
    },
    subPath: [
      {
        to: '/leaves/dashboard',
        Name: 'Leave Dashboard',
        accessList: ['hradmin', 'employee', 'manager'],
      },
      {
        to: '/leavemanagement/leavemanagement',
        Name: 'Leave Management',
        accessList: ['hradmin', 'employee', 'manager'],
      },
    ],
  },
  {
    mainPath: {
      icon: 'ShieldCheck',
      className: 'ptrmanagement',
      Name: 'Site Admin',
      accessList: ['hradmin', 'manager'],
    },
    subPath: [
      {
        to: '/management/projects',
        Name: 'Projects',
        accessList: ['hradmin', 'manager'],
      },
      {
        to: '/management/teams',
        Name: 'Teams',
        accessList: ['hradmin', 'manager'],
      },
      {
        to: '/management/roles',
        Name: 'Roles',
        accessList: ['hradmin', 'manager'],
      },
    ],
  },
];
