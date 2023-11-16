import {
  YANDEX_GET_TOKEN_LINK,
  YANDEX_OAUTH_ID,
  YANDEX_TOKEN_ERROR,
  YANDEX_USER_INFO_LINK
} from './constants';

export function getOAuthTokenLink(redirect_url = window.location.pathname): string {
  return (
    YANDEX_GET_TOKEN_LINK +
    '?' +
    'response_type=token' +
    '&client_id=' +
    encodeURIComponent(YANDEX_OAUTH_ID) +
    '&redirect_url=' +
    encodeURIComponent(redirect_url)
  );
}

export function getYandexUserInfo(token: string) {
  if (!token) {
    return Promise.reject(YANDEX_TOKEN_ERROR);
  }

  return fetch(YANDEX_USER_INFO_LINK, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      return Promise.resolve(data);
    });
}
