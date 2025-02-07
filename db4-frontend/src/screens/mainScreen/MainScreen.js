// import React from 'react';
// import { FaChartBar, FaBook } from 'react-icons/fa';
// import { Nav } from 'react-bootstrap';
// import './MainScreen.css';
// import { Link } from 'react-router-dom';
 
// const items = [
//   // { title: "My Workspace", icon: <i className="fas fa-chart-bar"></i>, color: '#3498db', delay: '1s' },
//   { title: "Dashboards", icon: <FaChartBar />, color: '#e74c3c', delay: '0.9s' },
//   // { title: "Directory", icon: <FaBook />, color: '#2ecc71', delay: '0.5s' },
// ];
 
// const MainScreen = () => {
//   return (
//     <div className="main-container">
//       <div className="home-content mt-5">
//         <div className="icon-grid">
//           {items.map((item, index) => (
//             <Nav.Link key={index} as={Link} to={`/${item.title}`}>
//               <div className="icon-item" style={{ animationDelay: item.delay }}>
//                 <div
//                   className="icon-circle"
//                   style={{ backgroundColor: item.color }}
//                 >
//                   {item.icon}
//                 </div>
//                 <div className="icon-title">{item.title}</div>
//               </div>
//             </Nav.Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default MainScreen;

import React from 'react';
import { FaChartBar } from 'react-icons/fa';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Lumiflex } from 'uvcanvas';
import './MainScreen.css';
 
const items = [
  { title: "Dashboards", icon: <FaChartBar />, delay: '0.9s' },
];
 
const MainScreen = () => {
  return (
    <div className="hrms-main-wrapper">
      <div className="lumiflex-container">
        <Lumiflex />
      </div>
      <div className="hrms-content-container mt-5">
        <div className="hrms-icon-container">
          {items.map((item, index) => (
            <Nav.Link key={index} as={Link} to={`/${item.title}`}>
              <div className="hrms-icon-wrapper" style={{ animationDelay: item.delay }}>
                <div className="hrms-icon-circle" style={{ backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <div className="hrms-icon-label">{item.title}</div>
              </div>
            </Nav.Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
