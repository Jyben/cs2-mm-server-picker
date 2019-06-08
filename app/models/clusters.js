export class ClusterBase {
  constructor() {
    this._relayAddresses = [];
    this._status = new Status();
    this._continentId = '';
    this._cityName = '';
  }

  get relayAddresses() {
    return this._relayAddresses;
  }
  set relayAddresses(value) {
    this._relayAddresses = value;
  }

  get status() {
    return this._status;
  }
  set status(value) {
    this._status = value;
  }

  get continentId() {
    return this._continentId;
  }
  set continentId(value) {
    this._continentId = value;
  }

  get cityName() {
    return this._cityName;
  }
  set cityName(value) {
    this._cityName = value;
  }

}

class Converter {
  constructor(data) {    
    this._data = data;
  }

  convert(clusterInstance) {
    const pops = this._data.pops;

    clusterInstance.pops['ams'] = new ClusterBase();
    clusterInstance.pops['ams'].relayAddresses = (pops.ams === undefined ? undefined : pops.ams.relay_addresses);
    clusterInstance.pops['ams'].cityName = 'Amsterdam';
    clusterInstance.pops['ams'].continentId = 'eu-west';

    clusterInstance.pops['atl'] = new ClusterBase();
    clusterInstance.pops['atl'].relayAddresses = (pops.atl === undefined ? undefined : pops.atl.relay_addresses);
    clusterInstance.pops['atl'].cityName = 'Atlanta';
    clusterInstance.pops['atl'].continentId = 'na-east';

    clusterInstance.pops['bom'] = new ClusterBase();
    clusterInstance.pops['bom'].relayAddresses = (pops.bom === undefined ? undefined : pops.bom.relay_addresses);
    clusterInstance.pops['bom'].cityName = 'Bombay';
    clusterInstance.pops['bom'].continentId = 'as';

    clusterInstance.pops['dxb'] = new ClusterBase();
    clusterInstance.pops['dxb'].relayAddresses = (pops.dxb === undefined ? undefined : pops.dxb.relay_addresses);
    clusterInstance.pops['dxb'].cityName = 'Dubai';
    clusterInstance.pops['dxb'].continentId = 'as';

    clusterInstance.pops['eat'] = new ClusterBase();
    clusterInstance.pops['eat'].relayAddresses = (pops.eat === undefined ? undefined : pops.eat.relay_addresses);
    clusterInstance.pops['eat'].cityName = 'Wenatchee';
    clusterInstance.pops['eat'].continentId = 'na-west';

    clusterInstance.pops['fra'] = new ClusterBase();
    clusterInstance.pops['fra'].relayAddresses = (pops.fra === undefined ? undefined : pops.fra.relay_addresses);
    clusterInstance.pops['fra'].cityName = 'Frankfurt';
    clusterInstance.pops['fra'].continentId = 'eu-west';

    clusterInstance.pops['gnrt'] = new ClusterBase();
    clusterInstance.pops['gnrt'].relayAddresses = (pops.gnrt === undefined ? undefined : pops.gnrt.relay_addresses);
    clusterInstance.pops['gnrt'].cityName = 'Tokyo';
    clusterInstance.pops['gnrt'].continentId = 'as';

    clusterInstance.pops['gru'] = new ClusterBase();
    clusterInstance.pops['gru'].relayAddresses = (pops.gru === undefined ? undefined : pops.gru.relay_addresses);
    clusterInstance.pops['gru'].cityName = 'Sao Paulo';
    clusterInstance.pops['gru'].continentId = 'sa';

    clusterInstance.pops['hkg'] = new ClusterBase();
    clusterInstance.pops['hkg'].relayAddresses = (pops.hkg === undefined ? undefined : pops.hkg.relay_addresses);
    clusterInstance.pops['hkg'].cityName = 'Hong Kong';
    clusterInstance.pops['hkg'].continentId = 'as';

    clusterInstance.pops['iad'] = new ClusterBase();
    clusterInstance.pops['iad'].relayAddresses = (pops.iad === undefined ? undefined : pops.iad.relay_addresses);
    clusterInstance.pops['iad'].cityName = 'Washington DC';
    clusterInstance.pops['iad'].continentId = 'na-east';

    clusterInstance.pops['jnb'] = new ClusterBase();
    clusterInstance.pops['jnb'].relayAddresses = (pops.jnb === undefined ? undefined : pops.jnb.relay_addresses);
    clusterInstance.pops['jnb'].cityName = 'Cape Town';
    clusterInstance.pops['jnb'].continentId = 'af';

    clusterInstance.pops['lax'] = new ClusterBase();
    clusterInstance.pops['lax'].relayAddresses = (pops.lax === undefined ? undefined : pops.lax.relay_addresses);
    clusterInstance.pops['lax'].cityName = 'Los Angeles';
    clusterInstance.pops['lax'].continentId = 'na-west';

    clusterInstance.pops['lhr'] = new ClusterBase();
    clusterInstance.pops['lhr'].relayAddresses = (pops.lhr === undefined ? undefined : pops.lhr.relay_addresses);
    clusterInstance.pops['lhr'].cityName = 'London';
    clusterInstance.pops['lhr'].continentId = 'eu-west';

    clusterInstance.pops['lim'] = new ClusterBase();
    clusterInstance.pops['lim'].relayAddresses = (pops.lim === undefined ? undefined : pops.lim.relay_addresses);
    clusterInstance.pops['lim'].cityName = 'Lima';
    clusterInstance.pops['lim'].continentId = 'sa';

    clusterInstance.pops['lux'] = new ClusterBase();
    clusterInstance.pops['lux'].relayAddresses = (pops.lux === undefined ? undefined : pops.lux.relay_addresses);
    clusterInstance.pops['lux'].cityName = 'Luxembourg';
    clusterInstance.pops['lux'].continentId = 'eu-west';

    clusterInstance.pops['maa'] = new ClusterBase();
    clusterInstance.pops['maa'].relayAddresses = (pops.maa === undefined ? undefined : pops.maa.relay_addresses);
    clusterInstance.pops['maa'].cityName = 'Chennai';
    clusterInstance.pops['maa'].continentId = 'as';

    clusterInstance.pops['mad'] = new ClusterBase();
    clusterInstance.pops['mad'].relayAddresses = (pops.mad === undefined ? undefined : pops.mad.relay_addresses);
    clusterInstance.pops['mad'].cityName = 'Madrid';
    clusterInstance.pops['mad'].continentId = 'eu-west';

    clusterInstance.pops['man'] = new ClusterBase();
    clusterInstance.pops['man'].relayAddresses = (pops.man === undefined ? undefined : pops.man.relay_addresses);
    clusterInstance.pops['man'].cityName = 'Manila';
    clusterInstance.pops['man'].continentId = 'as';

    clusterInstance.pops['okc'] = new ClusterBase();
    clusterInstance.pops['okc'].relayAddresses = (pops.okc === undefined ? undefined : pops.okc.relay_addresses);
    clusterInstance.pops['okc'].cityName = 'Oklahoma';
    clusterInstance.pops['okc'].continentId = 'na-east';

    clusterInstance.pops['ord'] = new ClusterBase();
    clusterInstance.pops['ord'].relayAddresses = (pops.ord === undefined ? undefined : pops.ord.relay_addresses);
    clusterInstance.pops['ord'].cityName = 'Chicago';
    clusterInstance.pops['ord'].continentId = 'na-east';

    clusterInstance.pops['par'] = new ClusterBase();
    clusterInstance.pops['par'].relayAddresses = (pops.par === undefined ? undefined : pops.par.relay_addresses);
    clusterInstance.pops['par'].cityName = 'Paris';
    clusterInstance.pops['par'].continentId = 'eu-west';

    clusterInstance.pops['scl'] = new ClusterBase();
    clusterInstance.pops['scl'].relayAddresses = (pops.scl === undefined ? undefined : pops.scl.relay_addresses);
    clusterInstance.pops['scl'].cityName = 'Santiago';
    clusterInstance.pops['scl'].continentId = 'sa';

    clusterInstance.pops['sea'] = new ClusterBase();
    clusterInstance.pops['sea'].relayAddresses = (pops.sea === undefined ? undefined : pops.sea.relay_addresses);
    clusterInstance.pops['sea'].cityName = 'Seattle';
    clusterInstance.pops['sea'].continentId = 'na-west';

    clusterInstance.pops['sgp'] = new ClusterBase();
    clusterInstance.pops['sgp'].relayAddresses = (pops.sgp === undefined ? undefined : pops.sgp.relay_addresses);
    clusterInstance.pops['sgp'].cityName = 'Singapore';
    clusterInstance.pops['sgp'].continentId = 'as';

    clusterInstance.pops['shb'] = new ClusterBase();
    clusterInstance.pops['shb'].relayAddresses = (pops.shb === undefined ? undefined : pops.shb.relay_addresses);
    clusterInstance.pops['shb'].cityName = 'Nakashibetsu';
    clusterInstance.pops['shb'].continentId = 'as';

    clusterInstance.pops['sto'] = new ClusterBase();
    clusterInstance.pops['sto'].relayAddresses = (pops.sto === undefined ? undefined : pops.sto.relay_addresses);
    clusterInstance.pops['sto'].cityName = 'Stockholm';
    clusterInstance.pops['sto'].continentId = 'eu-east';

    clusterInstance.pops['sto2'] = new ClusterBase();
    clusterInstance.pops['sto2'].relayAddresses = (pops.sto2 === undefined ? undefined : pops.sto2.relay_addresses);
    clusterInstance.pops['sto2'].cityName = '';
    clusterInstance.pops['sto2'].continentId = '';

    clusterInstance.pops['syd'] = new ClusterBase();
    clusterInstance.pops['syd'].relayAddresses = (pops.syd === undefined ? undefined : pops.syd.relay_addresses);
    clusterInstance.pops['syd'].cityName = 'Sydney';
    clusterInstance.pops['syd'].continentId = 'oc';

    clusterInstance.pops['tyo'] = new ClusterBase();
    clusterInstance.pops['tyo'].relayAddresses = (pops.tyo === undefined ? undefined : pops.tyo.relay_addresses);
    clusterInstance.pops['tyo'].cityName = 'Tokyo';
    clusterInstance.pops['tyo'].continentId = 'as';

    clusterInstance.pops['tyo1'] = new ClusterBase();
    clusterInstance.pops['tyo1'].relayAddresses = (pops.tyo1 === undefined ? undefined : pops.tyo1.relay_addresses);
    clusterInstance.pops['tyo1'].cityName = '';
    clusterInstance.pops['tyo1'].continentId = '';

    clusterInstance.pops['vie'] = new ClusterBase();
    clusterInstance.pops['vie'].relayAddresses = (pops.vie === undefined ? undefined : pops.vie.relay_addresses);
    clusterInstance.pops['vie'].cityName = 'Vienna';
    clusterInstance.pops['vie'].continentId = 'eu-east';

    clusterInstance.pops['waw'] = new ClusterBase();
    clusterInstance.pops['waw'].relayAddresses = (pops.waw === undefined ? undefined : pops.waw.relay_addresses);
    clusterInstance.pops['waw'].cityName = 'Warsaw';
    clusterInstance.pops['waw'].continentId = 'eu-east';

    clusterInstance.pops['tyo'].relayAddresses = clusterInstance.pops['tyo'].relayAddresses.concat(clusterInstance.pops['tyo1'].relayAddresses).concat(clusterInstance.pops['gnrt'].relayAddresses);
    clusterInstance.pops['tyo1'].relayAddresses = [];
    clusterInstance.pops['gnrt'].relayAddresses = [];

    clusterInstance.pops['sto'].relayAddresses = clusterInstance.pops['sto'].relayAddresses.concat(clusterInstance.pops['sto2'].relayAddresses);
    clusterInstance.pops['sto2'].relayAddresses = [];
  }
}

export class Status {
  constructor() {
    this._time = 0;
    this._isAlive = false;
  }

  get time() {
    return this._time;
  }
  set time(value) {
    this._time = value;
  }

  get isAlive() {
    return this._isAlive;
  }
  set isAlive(value) {
    this._isAlive = value;
  }
}

export default class Clusters extends Converter {
  constructor(data) {
    super(data);

    this._pops = [];
    this._clustersId = ['ams','atl','bom','dxb','eat','fra','gru','hkg','iad','jnb','lax','lhr','lim','lux','maa','mad','man','okc','ord','par','scl','sea','sgp','shb','sto','syd','tyo','vie','waw'];
  }

  get pops() {
    return this._pops;
  }
  set pops(value) {
    this._pops = value;
  }

  get clustersId() {
    return this._clustersId;
  }

  convert() {
    return super.convert(this);
  }

}



