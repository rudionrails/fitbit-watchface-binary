import { peerSocket } from "messaging";
import { settingsStorage } from "settings";

console.log("[Companion] Started");


/**
* Settings
*/
settingsStorage.onchange = event => {
  console.log(`[Companion] Changing Settings: ${JSON.stringify(event)}`);
  
  if (peerSocket.readyState === peerSocket.OPEN) {
    peerSocket.send(event);
  } else {
    console.log("[Companion] Cannot send changes to watch: peer socket not ready");
  }
};

/**
* Messaging
*/
peerSocket.onopen = () => console.log("[Companion] Socket open");
peerSocket.onclose = () => console.log("[Companion] Socket closed");
peerSocket.onmessage = event => {
  console.log(`[Companion] received: ${JSON.stringify(event)}`);
};