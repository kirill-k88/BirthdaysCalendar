import { API_KEY, CLIENT_ID, GAPI_SCRIPT_URL, GSI_SCRIPT_URL, SCOPES } from './constants';

function start() {
  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID
    })
    .catch(err => {
      console.log('Error: ' + err);
    });
}

function loadGapi() {
  window.gapi.load('client', start);
}

function loadGsi() {
  window.tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: ''
  });
}

export function createGapi() {
  if (!document.getElementById('gapi-script')) {
    const script = document.createElement('script');
    script.src = GAPI_SCRIPT_URL;
    script.onload = loadGapi;
    script.async = true;
    script.defer = true;
    script.id = 'gapi-script';
    document.body.appendChild(script);
  }
  if (!document.getElementById('gsi-script')) {
    const script = document.createElement('script');
    script.src = GSI_SCRIPT_URL;
    script.onload = loadGsi;
    script.async = true;
    script.defer = true;
    script.id = 'gsi-script';
    document.body.appendChild(script);
  }
}

export function authorize(setIsAuthtorized) {
  window.tokenClient.callback = async resp => {
    if (resp.error !== undefined) {
      throw resp;
    }
    setIsAuthtorized(true);
  };

  if (window.gapi.client.getToken() === null) {
    window.tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    window.tokenClient.requestAccessToken({ prompt: '' });
  }
}

export async function listOfEvents(startOfYear, endOfYear) {
  const calendarRequestParams = {
    calendarId: 'primary',
    timeMin: startOfYear.toISOString(),
    timeMax: endOfYear.toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  window.gapi.client.load('calendar', 'v3', () => {
    window.gapi.client.calendar.events
      .list({ ...calendarRequestParams })
      .then(function (response) {
        let events = response.result.items;
        console.log(events);
      })
      .catch(err => {
        console.log(err);
      });
  });
}
