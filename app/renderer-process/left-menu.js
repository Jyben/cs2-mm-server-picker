const { ipcRenderer, shell } = require('electron');

let pingBtn = document.getElementById('ping');
let goBtn = document.getElementById('firewall-block');
let resetBtn = document.getElementById('firewall-reset');
let bananaBtn = document.getElementById('button-banana');
let aboutBtn = document.getElementById('button-about');
let csgoBtn = document.getElementById('csgo');

pingBtn.addEventListener('click', () => {
  ipcRenderer.send('request-ping');
  resetListOfServers();
});

goBtn.addEventListener('click', () => {
  ipcRenderer.send('request-block-firewall', ipListFiltered);
  resetListOfServers();
});

resetBtn.addEventListener('click', () => {
  ipcRenderer.send('request-reset-firewall');
  resetListOfServers();
});

aboutBtn.addEventListener('click', () => {
  shell.openExternal('https://github.com/Jyben/csgo-mm-server-picker');
});

bananaBtn.addEventListener('click', () => {
  shell.openExternal('https://gamebanana.com/tools/6773');
});

csgoBtn.addEventListener('click', () => {
  shell.openExternal('steam://rungame/730/76561202255233023/');
});

let serversList = [];
let ipListFiltered = [];
let hostsListNotFiltered = [];

ipcRenderer.on('add-specific-servers', (event, arg) => {
  const hosts = arg[0];
  if (ipListFiltered.length === 0) {
    ipListFiltered = arg[1];
  }
  hostsListNotFiltered = arg[2];
  let check = false;
  const spanServersList = document.getElementById('servers-list');

  hosts.forEach(host => {
    serversList.forEach(server => {
      if (server.cityName === host.cityName) {
        check = true;
        return;
      }
    });

    if (!check) {

      serversList.push(host);

      const input = document.createElement('input');
      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', `checkbox-${host.id}`);
      input.setAttribute('value', 'checkbox');
      const span = document.createElement('span');
      span.appendChild(input);
      const strong = document.createElement('strong');
      strong.appendChild(document.createTextNode(`${host.time}`));
      span.appendChild(document.createTextNode(` ${host.cityName} | `));
      span.appendChild(strong);
      span.appendChild(document.createTextNode(' ms'));
      const br = document.createElement('br');
      span.appendChild(br);
      spanServersList.appendChild(span);

      const checkbox = document.getElementById(`checkbox-${host.id}`);
      checkbox.addEventListener('change', (e) => {
        updateServerList(e.target.checked, e.target.id);
      });
    }

    check = false;
  });
});

ipcRenderer.on('version', (event, arg) => {
  document.getElementById('version').textContent = arg[0];
});

ipcRenderer.on('enableFirewallMessage', (event, arg) => {
  document.getElementById('firewallMessage').textContent = "You must enable Windows Firewall for the app to work";
});

function resetListOfServers() {
  const span = document.getElementById('servers-list');
  span.innerHTML = ``;

  serversList = [];
  ipListFiltered = [];
  hostsListNotFiltered = [];
}

function updateServerList(checked, id) {
  const idSplit = id.split('-');
  id = idSplit[1];

  hostsListNotFiltered.forEach(host => {
    if (host.id === id) {
      checked ? ipListFiltered.splice(ipListFiltered.indexOf(host.ip), 1) : ipListFiltered.push(host.ip);
    }
  });
}

