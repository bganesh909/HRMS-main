import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  User,
  Inbox,
  Users,
  Building,
  BarChart,
  CalendarDays,
  Wallet,
  Plane,
  LogOut,
  Network,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import './Sidebar.css';
import { useAuth } from '../CustomHook/useAuth';
import { Roles } from '../lib/placeholder';
import { NavigationPaths } from '../lib/placeholder';
function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);
  const auth = useAuth();
  const [currentRole, setCurrentRole] = useState('');
  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };
  console.log(openMenu);
  const role = localStorage.getItem('role');
  // Need Change: We can have single component do all the redering by using map method by passing list name and icon as props
  return (
    <div className="sidebar">
      <div className="sidebar-scroll">
        <div className="icon-button rpr">
          <select name="currentrole">
            {Roles.map((ele) => (
              <option value={ele}>{ele}</option>
            ))}
          </select>
        </div>
        {NavigationPaths.map((ele, index) => {
          const Icon = ele.mainPath.icon && LucideIcons[ele.mainPath.icon];
          console.log(ele);
          let className = ele.mainPath.className;
          console.log(`My Role->${role}`);
          if (ele.mainPath.accessList.includes(role))
            return (
              <div className="icon-button rpr" key={index} onClick={() => toggleMenu(className)}>
                <NavLink to={ele.mainPath.to || '#'} className="navbtns">
                  {ele.mainPath.icon && <Icon size={32} />}
                  <span>{ele.mainPath.Name}</span>
                </NavLink>
                {ele.subPath && (
                  <div className={`submenu ${openMenu == className ? 'open' : ''}`}>
                    <div className="submenu__content">
                      {ele.subPath.map((subPath, index) => {
                        return (
                          <NavLink to={subPath.to} key={index} className="submenu-link">
                            {subPath.Name}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          else return <></>;
        })}
      </div>

      {/* Logout */}
      <div className="sidebar-logout">
        <NavLink
          to="#"
          className="icon-button rpr"
          onClick={() => {
            auth.logout();
          }}
        >
          <LogOut size={32} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
