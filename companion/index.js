import { settingsStorage } from 'settings';
import { peerSocket } from 'messaging';
import { colors } from '../common/colors';

const defaultSettings = {
  isDigitalClockDisabled: 'false',
  isDisplayAlwaysOn: 'false',
  themeColor: JSON.stringify(colors[0].color),
};

function send(event) {
  if (peerSocket.readyState === peerSocket.OPEN) {
    const data = {
      key: event.key,
      newValue: JSON.parse(event.newValue),
    };

    console.info(`Sending: ${JSON.stringify(data)}`);
    peerSocket.send(data);
  } else {
    console.log(`[Store] Cannot send ${JSON.stringify(event)}. Peer socket not ready.`);
  }
}

function reset() {
  Object.keys(defaultSettings).forEach((key) => {
    const newValue = settingsStorage.getItem(key) || defaultSettings[key];
    send({ key, newValue });
  });
}


/**
* Messaging
*/
peerSocket.onopen = () => {
  console.info('[Companion] Socket opened');
  reset();
};
peerSocket.onclose = () => console.info('[Companion] Socket closed');
peerSocket.onmessage = (event) => {
  console.log(`[Companion] received: ${JSON.stringify(event)}`);
};

/**
* Storage
*/
settingsStorage.onchange = ({ key, newValue }) => {
  if (key === null) { // clear, @see https://dev.fitbit.com/build/reference/companion-api/storage/
    console.info('[Companion] Resetting Store');

    Object.keys(defaultSettings).forEach((key) => {
      console.log(`resetting ${JSON.stringify(key)} => ${JSON.stringify(defaultSettings[key])}`);
      settingsStorage.setItem(key, defaultSettings[key]); // does not trigger onchange
      send({ key, newValue: settingsStorage.getItem(key) });
    });
  } else {
    send({ key, newValue });
  }
};
