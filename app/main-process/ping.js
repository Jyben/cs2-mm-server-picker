import ping from 'ping';

export default class Ping {
  constructor(clusters, window) {
    this._clusters = clusters;
    this._mainWindow = window;
  }

  // Lance le ping sur tous les serveurs de Valve
  execute() {
    this._clusters.clustersId.forEach(id => {

      this._clusters.pops[id].relayAddresses.forEach(relayAddresse => {
        this._clusters.pops[id].relayAddresses.splice(this._clusters.pops[id].relayAddresses.indexOf(relayAddresse), 1, relayAddresse.split(':')[0]);
      });

      const hosts = this._clusters.pops[id].relayAddresses;

      hosts.forEach(host => {
        ping.promise.probe(host, {
          timeout: 3
        }).then((res) => {
          this._updateClusterStatus(res.host, res.time, res.alive);
        });
      });
    });
  }

  // Mets à jour le status des serveurs et informe l'IHM
  _updateClusterStatus(host, time, alive) {
    try {
      this._clusters.clustersId.forEach(id => {

        this._clusters.pops[id].relayAddresses.forEach(relayAddresse => {
  
          if (relayAddresse === host) {

            this._mainWindow.webContents.send('update-ip-list', [id, host, this._clusters.pops[id].cityName, this._clusters.pops[id].continentId, time, alive]);

            if (time < this._clusters.pops[id].status.time || this._clusters.pops[id].status.time === 0) {
  
              this._clusters.pops[id].status.isAlive = alive;
              this._clusters.pops[id].status.time = time;
              
              this._mainWindow.webContents.send('request-update-ping', [this._clusters.pops[id].continentId, this._clusters.pops[id].status.time]);
              
            }
          }
        });
      });
    } catch (error) {
      console.log(error);
    }

  }
}