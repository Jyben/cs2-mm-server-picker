import sudo from 'sudo-prompt';

export default class Firewall {
  constructor(hosts) {
    this._hosts = hosts;
  }

  // Exécute la mise à jour des règles du firewall
  exec() {

    const multipleIp = this._hosts.join();

    this.reset();

    switch (process.platform) {
      case 'win32':
        this._execBash(`netsh advfirewall firewall add rule name="csgo-mm-server-picker" dir=out action=block remoteip=${multipleIp}`);
        break;

      case 'linux':
        this._execBash(`iptables -A INPUT -s ${multipleIp} -j DROP`);
        break;

      case 'darwin':

        break;

      default:
        break;
    }
  }

  // Réinisitalise les règles du firewall
  reset() {

    switch (process.platform) {
      case 'win32':
        this._execBash(`netsh advfirewall firewall delete rule name="csgo-mm-server-picker"`);
        break;

      case 'linux':
        const multipleIp = this._hosts.join();

        this._execBash(`iptables -D INPUT -s ${multipleIp} -j DROP`);
        break;

      case 'darwin':

        break;

      default:
        break;
    }
  }

  // Exécute une commande peu importe l'OS
  async _execBash(command) {

    var options = {
      name: 'Electron'
    };
    sudo.exec(command, options,
      function (error, stdout, stderr) {
        if (stderr != '') {
          console.log('stderr: ' + stderr);
        }
      }
    );

  }
}