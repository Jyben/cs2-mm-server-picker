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
  shell.openExternal('https://csgo-mm-server-picker.com');
});

bananaBtn.addEventListener('click', () => {
  shell.openExternal('https://gamebanana.com');
});

csgoBtn.addEventListener('click', () => {
  shell.openExternal('steam://rungame/730/76561202255233023/');
});

let serversList = [];
let ipListFiltered = [];
let hostsListNotFiltered = [];

ipcRenderer.on('add-specific-servers', (event, arg) => {
  let hosts = arg[0];
  if (ipListFiltered.length === 0) {
    ipListFiltered = arg[1];
  }
  hostsListNotFiltered = arg[2];
  let check = false;
  let spanServersList = document.getElementById('servers-list');

  hosts.forEach(host => {

    if (host.time == 0) {
      return;
    }

    serversList.forEach(server => {
      if (server.cityName === host.cityName) {
        check = true;
        return;
      }
    });

    if (!check) {

      serversList.push(host);

      let span = document.createElement('span');
      span.innerHTML = `<input type="checkbox" id="checkbox-${host.id}"> ${host.cityName} | <strong> ${host.time} </strong>ms <br />`;
      spanServersList.appendChild(span);

      let checkbox = document.getElementById(`checkbox-${host.id}`);
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

function resetListOfServers() {
  let span = document.getElementById('servers-list');
  span.innerHTML = ``;

  serversList = [];
  ipListFiltered = [];
  hostsListNotFiltered = [];
}

function updateServerList(checked, id) {
  let idSplit = id.split('-');
  id = idSplit[1];

  hostsListNotFiltered.forEach(host => {
    if (host.id === id) {
      checked ? ipListFiltered.splice(ipListFiltered.indexOf(host.ip), 1) : ipListFiltered.push(host.ip);
    }
  });
}

