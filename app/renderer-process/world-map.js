import { ipcRenderer } from 'electron';

let ipList = [];

// Mets à jour le ping sur les boutons
ipcRenderer.on('request-update-ping', (event, arg) => {
  let continentId = arg[0];
  let time = arg[1];
  let span = document.getElementById(`time-${continentId}`);

  span.textContent = (time !== 0 ? `${time} ms` : `X`);

});

// Mets à jour la liste des IP au niveau de l'IHM au fur et à mesure des pings
ipcRenderer.on('update-ip-list', (event, arg) => {
  let host = {};

  host.id = arg[0];
  host.ip = arg[1];
  host.cityName = arg[2];
  host.continentId = arg[3];
  host.time = arg[4];
  host.alive = arg[5];

  ipList.push(host);
});

ipcRenderer.on('spinner', (event, arg) => {
  document.getElementById("loader").style.display = arg[0] === true ? 'block' : 'none';
});

const clusters = ['eu-west','eu-east','na-west','na-east','sa','oc','af','as'];

// Ajout d'un event sur chaque boutons
clusters.forEach(id => {

  let clusterBtn = document.getElementById(id);

  clusterBtn.addEventListener('click', () => {
      ipcRenderer.send('add-cluster-in-ip-rules', [id, ipList]);
  });
});

