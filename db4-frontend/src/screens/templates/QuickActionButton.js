// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import { styled } from '@mui/material/styles';

// // Icons
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import EventIcon from '@mui/icons-material/Event';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import WorkIcon from '@mui/icons-material/Work';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import LaptopMacIcon from '@mui/icons-material/LaptopMac';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import CloseIcon from '@mui/icons-material/Close';

// const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
//   position: 'fixed',
//   bottom: 24,
//   right: 24,
//   '& .MuiFab-primary': {
//     width: 65,
//     height: 65,
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     '&:hover': {
//       background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
//     },
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   },
// }));

// const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
//   '& .MuiFab-primary': {
//     background: '#fff',
//     '&:hover': {
//       background: '#f5f5f5',
//     },
//   },
//   '& .MuiSpeedDialAction-staticTooltip': {
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     color: '#fff',
//     fontSize: '14px',
//     padding: '6px 12px',
//     borderRadius: '4px',
//     position: 'absolute',
//     right: '100%',
//     marginRight: '10px',
//     whiteSpace: 'nowrap',
//   },
//   '& .MuiSpeedDialAction-fab': {
//     margin: '8px',
//     transition: 'all 0.3s ease',
//   }
// }));

// const actions = [
//   { icon: <PersonAddIcon />, name: 'Employee', page: 'employee', color: '#4CAF50' },
//   { icon: <EventIcon />, name: 'Leave', page: 'myLeaveRequests', color: '#2196F3' },
//   { icon: <AccessTimeIcon />, name: 'Attendance', page: 'attendanceRecords', color: '#9C27B0' },
//   { icon: <WorkIcon />, name: 'Recruitment', page: 'recruitmentdashboard', color: '#FF9800' },
//   { icon: <AttachMoneyIcon />, name: 'Payroll', page: 'payrollDashboard', color: '#F44336' },
//   { icon: <LaptopMacIcon />, name: 'Assets', page: 'assetsDashboard', color: '#3F51B5' },
//   { icon: <LocalOfferIcon />, name: 'Help Desk', page: 'faqCategory', color: '#009688' },
//   { icon: <BarChartIcon />, name: 'Performance', page: 'dashboard', color: '#795548' },
// ];

// const QuickActionButton = ({ setSelectedPage }) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <StyledSpeedDial
//           ariaLabel="Quick Actions"
//           icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
//           onClose={handleClose}
//           onOpen={handleOpen}
//           open={open}
//           direction="up"
//           TransitionComponent={motion.div}
//         >
//           {actions.map((action, index) => (
//             <StyledSpeedDialAction
//               key={action.name}
//               icon={
//                 <motion.div
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                   style={{ color: action.color }}
//                 >
//                   {action.icon}
//                 </motion.div>
//               }
//               tooltipTitle={action.name}
//               onClick={() => {
//                 setSelectedPage(action.page);
//                 handleClose();
//               }}
//               FabProps={{
//                 sx: {
//                   bgcolor: 'white',
//                   '&:hover': {
//                     bgcolor: '#f5f5f5',
//                     transform: 'scale(1.1)',
//                   },
//                   transition: 'all 0.3s ease',
//                 }
//               }}
//             />
//           ))}
//         </StyledSpeedDial>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default QuickActionButton;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { styled } from '@mui/material/styles';

// Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloseIcon from '@mui/icons-material/Close';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  '& .MuiFab-primary': {
    width: 65,
    height: 65,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    },
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
}));

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  '& .MuiFab-primary': {
    background: '#fff',
    '&:hover': {
      background: '#f5f5f5',
    },
  },
  '& .MuiSpeedDialAction-staticTooltip': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '4px',
    position: 'absolute',
    right: '100%',
    marginRight: '10px',
    whiteSpace: 'nowrap',
  },
  '& .MuiSpeedDialAction-fab': {
    margin: '8px',
    transition: 'all 0.3s ease',
  }
}));

const actions = [
  { icon: <PersonAddIcon />, name: 'Employee', path: '/Dashboards/employees', color: '#4CAF50' },
  { icon: <EventIcon />, name: 'Leave', path: '/Dashboards/my-leave-requests', color: '#2196F3' },
  { icon: <AccessTimeIcon />, name: 'Attendance', path: '/Dashboards/attendance-records', color: '#9C27B0' },
  { icon: <WorkIcon />, name: 'Recruitment', path: '/Dashboards/recruitment-dashboard', color: '#FF9800' },
  { icon: <AttachMoneyIcon />, name: 'Payroll', path: '/Dashboards/payroll-dashboard', color: '#F44336' },
  { icon: <LaptopMacIcon />, name: 'Assets', path: '/Dashboards/assets-dashboard', color: '#3F51B5' },
  { icon: <LocalOfferIcon />, name: 'Help Desk', path: '/Dashboards/faq-category', color: '#009688' },
  { icon: <BarChartIcon />, name: 'Performance', path: '/Dashboards/performance-dashboard', color: '#795548' },
];

const QuickActionButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <StyledSpeedDial
          ariaLabel="Quick Actions"
          icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
          TransitionComponent={motion.div}
        >
          {actions.map((action) => (
            <StyledSpeedDialAction
              key={action.name}
              icon={
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: action.color }}
                >
                  {action.icon}
                </motion.div>
              }
              tooltipTitle={action.name}
              onClick={() => handleNavigation(action.path)}
              FabProps={{
                sx: {
                  bgcolor: 'white',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }
              }}
            />
          ))}
        </StyledSpeedDial>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickActionButton;
