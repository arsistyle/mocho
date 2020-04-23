import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoLogoWhatsapp } from 'react-icons/io';
import { getMenu } from '../../services';

import '../../assets/scss/style/components/Menu.scss';

const Menu = (props) => {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      const response = await getMenu('menu-rest');
      if (response.data) {
        setMenu(response.data);
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  return loading ? (
    <h4>Cargando</h4>
  ) : (
    menu.count && (
      <ul className='header__item header__item--menu menu'>
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
                <NavLink exact={x.title === 'Inicio' ? true : false} className={`menu__link ${x.classes ? x.classes : ''} ${x.nuevo ? `menu__link--nuevo` : ''}`} activeClassName="menu__link--active" target={x.target} to={url}>
                  {x.title}
                  {x.title === 'Contacto' && <IoLogoWhatsapp />}
                </NavLink>
                {x['child_items']?.length && (
                  <ul className="menu__childs">
                    {x['child_items'].map((c, i) => {
                      return (
                        <li className='menu__childs__item' key={i}>
                          <NavLink exact className='menu__childs__link' activeClassName='menu__childs__link--active' to={`/${x.slug}/${c.slug}`}>
                            <div className='menu__childs__title'>{c.title}</div>
                            <div className='menu__childs__image'>{c.imagen && <img src={c.imagen} alt={x.title}/>}</div>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            )
          );
        })}
      </ul>
    )
  );
};

export default Menu;
