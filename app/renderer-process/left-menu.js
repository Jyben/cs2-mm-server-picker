import { ipcRenderer } from 'electron';

let pingBtn = document.getElementById('ping');
let goBtn = document.getElementById('firewall-block');
let resetBtn = document.getElementById('firewall-reset');

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

let serversList = [];
let ipListFiltered = [];
let hostsListNotFiltered = [];

ipcRenderer.on('add-specific-servers', (event, arg) => {
  let hosts = arg[0];
  ipListFiltered = arg[1];
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

