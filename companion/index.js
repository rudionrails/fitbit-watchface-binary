import { settingsStorage } from "settings";
import { peerSocket } from "messaging";
import { defaultSettings } from '../common/utils'

function set(key, newValue) {
  console.log(`[Companion] Setting ${JSON.stringify(key)} => ${JSON.stringify(newValue)}`);
  settingsStorage.setItem(key, newValue);
  
  if (peerSocket.readyState === peerSocket.OPEN) {
    peerSocket.send({ key, newValue: JSON.parse(newValue) });
  } else {
    console.log(`[Store] Cannot send ${JSON.stringify(key)}. Peer socket not ready.`);
  }
}

function reset(tryStorage = true) {
  console.info(`[Companion] Resetting Store (tryStorage = ${tryStorage})`);
  
  Object.entries(defaultSettings).forEach(([key, value]) => {
    const newValue = tryStorage && settingsStorage.getItem(key) || value;
    set(key, newValue);
  });
}

/**
* Messaging
*/
peerSocket.onopen = () => reset();
peerSocket.onclose = () => console.info("[Companion] Socket closed");
peerSocket.onmessage = event => console.log(`[Companion] received: ${JSON.stringify(event)}`);

/**
* Storage
*/
// clear, @see https://dev.fitbit.com/build/reference/companion-api/storage/
settingsStorage.onchange = ({ key, newValue }) => key ? set(key, newValue) : reset(false);