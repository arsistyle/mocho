import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogoWhatsapp, IoIosClose, IoIosMenu } from 'react-icons/io';
import { getMenu } from '../services';

import '../assets/scss/style/components/Menu.scss';

export const MenuResponsive = ({ open, setOpen, responsive }) => {
  const Icon = () => (open ? <IoIosClose /> : <IoIosMenu />);
  return responsive ? (
    <div className={`header__item header__item--burger flex-xs oculto-lg burger ${open ? 'burger--active' : ''}`} onClick={() => setOpen(!open)}>
      <Icon />
    </div>
  ) : (
    <></>
  );
};

const Menu = ({ open, setOpen, responsive }) => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      const response = await getMenu('menu-rest');
      if (response.items) {
        setMenu(response);
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  return loading ? (
    <></>
  ) : (
    menu.count && (
      <>
        <ul className={`header__item header__item--menu menu ${open ? 'menu--active' : ''}`}>
          {menu.items.map((x, i) => {
            let url = `/${x.slug}`;
            switch (x.title) {
              case 'Inicio':
                url = '/';
                break;
              case 'Contacto':
                url = x.url;
                break;
              default:
                break;
            }
            return (
              x.visible && (
                <li className='menu__item' key={i}>
                  {x.title === 'Contacto' ? (
                    <a className={`menu__link ${x.classes ? x.classes : ''}`} target={x.target} href={url}>
                      {x.title}
                      <IoLogoWhatsapp />
                    </a>
                  ) : (
                    <NavLink
                      exact={x.title === 'Inicio' ? true : false}
                      className={`menu__link ${x.classes ? x.classes : ''} ${x.nuevo ? `menu__link--nuevo` : ''}`}
                      activeClassName='menu__link--active'
                      target={x.target}
                      to={url}
                      onClick={() => (responsive ? setOpen(!open) : setOpen(false))}
                    >
                      {x.title}
                    </NavLink>
                  )}
                  {x['child_items']?.filter((x) => x.visible).length > 1 && (
                    <ul className='menu__childs'>
                      {x['child_items'].map((c, i) => {
                        return (
                          c.visible && (
                            <li className='menu__childs__item' key={i}>
                              <NavLink
                                exact
                                className='menu__childs__link'
                                activeClassName='menu__childs__link--active'
                                to={`/${x.slug}/${c.slug}`}
                                onClick={() => (responsive ? setOpen(!open) : setOpen(false))}
                              >
                                <div className='menu__childs__title'>{c.title}</div>
                                <div className='menu__childs__image'>{c.imagen && <img src={c.imagen} alt={x.title} />}</div>
                              </NavLink>
                            </li>
                          )
                        );
                      })}
                    </ul>
                  )}
                </li>
              )
            );
          })}
        </ul>
      </>
    )
  );
};

export default Menu;
