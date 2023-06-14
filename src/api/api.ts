export const API_URL = 'https://dogsapi.origamid.dev/json';

type TypeUser = {
  username: string;
  email?: string;
  password: string;
};

export const TOKEN_POST = (body: TypeUser) => {
  return {
    url: API_URL + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const USER_POST = (body: TypeUser) => {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const TOKEN_VALIDATE_POST = (token: string) => {
  return {
    url: API_URL + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
};

export const USER_GET = (token: string) => {
  return {
    url: API_URL + '/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
};

export const PHOTO_POST = (formData: FormData, token: string) => {
  return {
    url: API_URL + '/api/photo',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
};

type TypePhotoPost = {
  page: number;
  total: number;
  user: number | string;
};

type TypeRequestGet = {
  url: string;
  options: RequestInit;
};

export const PHOTOS_GET = ({
  page,
  total,
  user,
}: TypePhotoPost): TypeRequestGet => {
  return {
    url: API_URL + `/api/photo?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

export const PHOTO_GET = (id: number): TypeRequestGet => {
  return {
    url: API_URL + `/api/photo/${id}`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  };
};

type TypeComment = {
  comment: string;
};

export const COMMENT_POST = (id: number, body: TypeComment) => {
  return {
    url: API_URL + `/api/comment/${id}`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    },
  };
};

export const PHOTO_DELETE = (id: number) => {
  return {
    url: API_URL + `/api/photo/${id}`,
    options: {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  };
};

type TypeRequestLostPassword = {
  login: string;
  url: string;
};

export const PASSWORD_LOST = (body: TypeRequestLostPassword) => {
  return {
    url: API_URL + '/api/password/lost',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

type TypeRequestResetPassword = {
  login: string;
  key: string;
  password: string;
};

export const PASSWORD_RESET = (body: TypeRequestResetPassword) => {
  return {
    url: API_URL + '/api/password/reset',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
};

export const GET_STATS = () => {
  return {
    url: API_URL + '/api/stats',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    },
  };
};
