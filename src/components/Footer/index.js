import React, { useState, useEffect } from 'react';
import { getFooter } from '../../services';

import '../../assets/scss/style/components/Footer.scss';

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState({});

  useEffect(() => {
    async function loadFooter() {
      const response = await getFooter();
      if (response.acf) {
        setFooter(response.acf);
        setLoading(false);
      }
    }
    loadFooter();
  }, []);
  return loading ? (
    <></>
  ) : (
    <footer className='footer' data-copy={footer.copyright.replace(/#year#/, new Date().getFullYear())}>
      <h4>Hola, soy el footer</h4>
    </footer>
  );
}

export default Footer;