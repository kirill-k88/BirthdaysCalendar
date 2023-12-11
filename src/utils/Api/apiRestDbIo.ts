import { API_RESTDB_HEADERS, RESTDB_URL_PATH } from '../constants';
import { IEvent } from '../interfaces/IEvent.interface';

async function checkResult(res: Response) {
  if (!res.ok) {
    const error = new Error(`Error ${res.status}: ${res.statusText}`);
    throw error;
  }

  return await res.json();
}

export async function getEventList() {
  const res = await fetch(RESTDB_URL_PATH + '/birthdays', {
    method: 'GET',
    headers: API_RESTDB_HEADERS
  });

  return await checkResult(res);
}

export async function postEventToServer({ name, photoUrl, birthday }: IEvent) {
  const newEvent = {
    name,
    photoUrl,
    birthday
  };
  const res = await fetch(RESTDB_URL_PATH + '/birthdays', {
    method: 'POST',
    headers: API_RESTDB_HEADERS,
    body: JSON.stringify(newEvent)
  });

  return await checkResult(res);
}

export async function changeEvent({ name, photoUrl, birthday, _id }: IEvent) {
  const newEvent = {
    name,
    photoUrl,
    birthday
  };
  const res = await fetch(RESTDB_URL_PATH + `/birthdays/${_id}`, {
    method: 'PUT',
    headers: API_RESTDB_HEADERS,
    body: JSON.stringify(newEvent)
  });

  return await checkResult(res);
}

export async function deleteEvent(id: string) {
  const res = await fetch(RESTDB_URL_PATH + `/birthdays/${id}`, {
    method: 'DELETE',
    headers: API_RESTDB_HEADERS
  });

  return await checkResult(res);
}
