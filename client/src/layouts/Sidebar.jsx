import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { COOKIE_NAMES, SIDEBAR_LINKS } from '../constants';
import { removeCookie } from '../utils';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Card className="h-full w-[230px] p-4 pt-0 bg-white border-r border-gray-200 shadow-none rounded-none flex flex-col justify-between">
        <div>
          <Link>
            <div className="mb-2 px-4 pt-0 pb-2">
              <img
                src=""
                alt=""
                className="w-42 lg:max-h-20 m-3 object-center sm:max-h-[50px]"
              />
            </div>
          </Link>

          <List className="min-w-full">
            {SIDEBAR_LINKS.map((link, index) => {
              return (
                <Link to={link.path} key={index}>
                  <ListItem key={index}>
                    <ListItemPrefix>{link.icon}</ListItemPrefix>
                    {link.name}
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>

        <List className="min-w-full">
          <ListItem
            onClick={() => {
              removeCookie(COOKIE_NAMES.TOKEN);
              removeCookie(COOKIE_NAMES.USER);
              navigate('/login');
            }}
            className="bg-gray-300 min-w-full"
          >
            <ListItemPrefix>
              <FaSignInAlt className="h-5 w-5 rotate-180" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Sidebar;
