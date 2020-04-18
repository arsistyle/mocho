import axios from 'axios';

const wp_rest = process.env.REACT_APP_BASE_URL;
const wp_acf = process.env.REACT_APP_BASE_ACF_URL;

export async function getHeader() {
  try {
    const response = await axios({
      url: `${wp_acf}/options/header`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getHero() {
  try {
    const response = await axios({
      url: `${wp_acf}/options/hero`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getProducts() {
  try {
    const response = await axios({
      url: `${wp_rest}/productos`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getProduct(slug) {
  try {
    const response = await axios({
      url: `${wp_rest}/productos?slug=${slug}`,
      method: 'GET',
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
