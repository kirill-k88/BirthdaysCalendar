import { API_RESTDB_HEADERS, RESTDB_URL_PATH } from '../constants';
import { errorHandler } from '../functions/errorHandler';
import { IEvent } from '../interfaces/IEvent.interface';

async function doFetch(url: string, params: object) {
  const res = await fetch(url, params);

  if (!res.ok) {
    throw new Error(errorHandler(res));
  }

  return await res.json();
}

export async function getEventListFetch() {
  const url = RESTDB_URL_PATH + '/birthdays';
  const params = {
    method: 'GET',
    headers: API_RESTDB_HEADERS
  };

  return await doFetch(url, params);
}

export async function postEventToServer({ name, photoUrl, birthday }: IEvent) {
  const newEvent = {
    name,
    photoUrl,
    birthday
  };
  const url = RESTDB_URL_PATH + '/birthdays';
  const params = {
    method: 'POST',
    headers: API_RESTDB_HEADERS,
    body: JSON.stringify(newEvent)
  };

  return await doFetch(url, params);
}

export async function changeEvent({ name, photoUrl, birthday, _id }: IEvent) {
  const newEvent = {
    name,
    photoUrl,
    birthday
  };
  const url = RESTDB_URL_PATH + `/birthdays/${_id}`;
  const params = {
    method: 'PUT',
    headers: API_RESTDB_HEADERS,
    body: JSON.stringify(newEvent)
  };

  return await doFetch(url, params);
}

export async function deleteEvent(id: string) {
  const url = RESTDB_URL_PATH + `/birthdays/${id}`;
  const params = {
    method: 'DELETE',
    headers: API_RESTDB_HEADERS
  };

  return await doFetch(url, params);
}
