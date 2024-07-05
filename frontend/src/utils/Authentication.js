
export const BASE_URL = 'http://api.romanf89.nomorepartiesco.ru';



const checkResponse = (response) => {
  console.log('response ok: ', response);
  if (response.ok) {
    return response.json();
  }

  return response.json().then((res) => {
    throw res;
  })
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
};

export const unlogin = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
  .then(checkResponse)
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.json())
}
