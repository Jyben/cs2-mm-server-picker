let ClusterBase = function (relayAddresses, cityName, continentId) {
  this.relayAddresses = relayAddresses;
  this.status = new Status();
  this.continentId = continentId;
  this.cityName = cityName;
}

let Converter = function (data) {
  this.data = data;
}

Converter.prototype.convert = function (clusterInstance) {
  const pops = this.data.pops;

  clusterInstance.pops['aae1'] = new ClusterBase((pops.aae1 === undefined ? undefined : pops.aae1.relay_addresses), '', '');
  clusterInstance.pops['aec1'] = new ClusterBase((pops.aec1 === undefined ? undefined : pops.aec1.relay_addresses), '', '');
  clusterInstance.pops['auw2'] = new ClusterBase((pops.auw2 === undefined ? undefined : pops.auw2.relay_addresses), 'Oregon', 'na-west');
  clusterInstance.pops['ams'] = new ClusterBase((pops.ams === undefined ? undefined : pops.ams.relay_addresses), 'Amsterdam', 'eu-west');
  clusterInstance.pops['atl'] = new ClusterBase((pops.atl === undefined ? undefined : pops.atl.relay_addresses), 'Atlanta', 'na-east');
  clusterInstance.pops['bom'] = new ClusterBase((pops.bom === undefined ? undefined : pops.bom.relay_addresses), 'Bombay', 'as');
  clusterInstance.pops['can'] = new ClusterBase((pops.canm === undefined ? undefined : pops.canm.relay_addresses), 'Canton', 'as');
  clusterInstance.pops['cant'] = new ClusterBase((pops.cant === undefined ? undefined : pops.cant.relay_addresses), '', '');
  clusterInstance.pops['canu'] = new ClusterBase((pops.canu === undefined ? undefined : pops.canu.relay_addresses), '', '');
  clusterInstance.pops['dxb'] = new ClusterBase((pops.dxb === undefined ? undefined : pops.dxb.relay_addresses), 'Dubai', 'as');
  clusterInstance.pops['eat'] = new ClusterBase((pops.eat === undefined ? undefined : pops.eat.relay_addresses), 'Wenatchee', 'na-west');
  clusterInstance.pops['fra'] = new ClusterBase((pops.fra === undefined ? undefined : pops.fra.relay_addresses), 'Frankfurt', 'eu-west');
  clusterInstance.pops['gnrt'] = new ClusterBase((pops.gnrt === undefined ? undefined : pops.gnrt.relay_addresses), '', '');
  clusterInstance.pops['gru'] = new ClusterBase((pops.gru === undefined ? undefined : pops.gru.relay_addresses), 'Sao Paulo', 'sa');
  clusterInstance.pops['hkg'] = new ClusterBase((pops.hkg === undefined ? undefined : pops.hkg.relay_addresses), 'Hong Kong', 'as');
  clusterInstance.pops['iad'] = new ClusterBase((pops.iad === undefined ? undefined : pops.iad.relay_addresses), 'Washington DC', 'na-east');
  clusterInstance.pops['jnb'] = new ClusterBase((pops.jnb === undefined ? undefined : pops.jnb.relay_addresses), 'Cape Town', 'af');
  clusterInstance.pops['lax'] = new ClusterBase((pops.lax === undefined ? undefined : pops.lax.relay_addresses), 'Los Angeles', 'na-west');
  clusterInstance.pops['lhr'] = new ClusterBase((pops.lhr === undefined ? undefined : pops.lhr.relay_addresses), 'London', 'eu-west');
  clusterInstance.pops['lim'] = new ClusterBase((pops.lim === undefined ? undefined : pops.lim.relay_addresses), 'Lima', 'sa');
  clusterInstance.pops['lux'] = new ClusterBase((pops.lux === undefined ? undefined : pops.lux.relay_addresses), 'Luxembourg', 'eu-west');
  clusterInstance.pops['maa'] = new ClusterBase((pops.maa === undefined ? undefined : pops.maa.relay_addresses), 'Chennai', 'as');
  clusterInstance.pops['mad'] = new ClusterBase((pops.mad === undefined ? undefined : pops.mad.relay_addresses), 'Madrid', 'eu-west');
  clusterInstance.pops['man'] = new ClusterBase((pops.man === undefined ? undefined : pops.man.relay_addresses), 'Manila', 'as');
  clusterInstance.pops['okc'] = new ClusterBase((pops.okc === undefined ? undefined : pops.okc.relay_addresses), 'Oklahoma', 'na-east');
  clusterInstance.pops['ord'] = new ClusterBase((pops.ord === undefined ? undefined : pops.ord.relay_addresses), 'Chicago', 'na-east');
  clusterInstance.pops['par'] = new ClusterBase((pops.par === undefined ? undefined : pops.par.relay_addresses), 'Paris', 'eu-west');
  clusterInstance.pops['pwg'] = new ClusterBase((pops.pwg === undefined ? undefined : pops.pwg.relay_addresses), 'Guangdong', 'as');
  clusterInstance.pops['pwj'] = new ClusterBase((pops.pwj === undefined ? undefined : pops.pwj.relay_addresses), 'Unknow city', 'as');
  clusterInstance.pops['pwu'] = new ClusterBase((pops.pwu === undefined ? undefined : pops.pwu.relay_addresses), 'Beijing', 'as');
  clusterInstance.pops['pww'] = new ClusterBase((pops.pww === undefined ? undefined : pops.pww.relay_addresses), 'Wuhan', 'as');
  clusterInstance.pops['pwz'] = new ClusterBase((pops.pwz === undefined ? undefined : pops.pwz.relay_addresses), 'Unknow city', 'as');
  clusterInstance.pops['scl'] = new ClusterBase((pops.scl === undefined ? undefined : pops.scl.relay_addresses), 'Santiago', 'sa');
  clusterInstance.pops['sea'] = new ClusterBase((pops.sea === undefined ? undefined : pops.sea.relay_addresses), 'Seattle', 'na-west');
  clusterInstance.pops['sgp'] = new ClusterBase((pops.sgp === undefined ? undefined : pops.sgp.relay_addresses), 'Singapore', 'as');
  clusterInstance.pops['sha'] = new ClusterBase((pops.sham === undefined ? undefined : pops.sham.relay_addresses), 'Shanghai', 'as');
  clusterInstance.pops['shat'] = new ClusterBase((pops.shat === undefined ? undefined : pops.shat.relay_addresses), '', '');
  clusterInstance.pops['shau'] = new ClusterBase((pops.shau === undefined ? undefined : pops.shau.relay_addresses), '', '');
  clusterInstance.pops['shb'] = new ClusterBase((pops.shb === undefined ? undefined : pops.shb.relay_addresses), 'Nakashibetsu', 'as');
  clusterInstance.pops['sto'] = new ClusterBase((pops.sto === undefined ? undefined : pops.sto.relay_addresses), 'Stockholm', 'eu-east');
  clusterInstance.pops['sto2'] = new ClusterBase((pops.sto2 === undefined ? undefined : pops.sto2.relay_addresses), '', '');
  clusterInstance.pops['syd'] = new ClusterBase((pops.syd === undefined ? undefined : pops.syd.relay_addresses), 'Sydney', 'oc');
  clusterInstance.pops['tsn'] = new ClusterBase((pops.tsnm === undefined ? undefined : pops.tsnm.relay_addresses), 'Tianjin', 'as');
  clusterInstance.pops['tsnt'] = new ClusterBase((pops.tsnt === undefined ? undefined : pops.tsnt.relay_addresses), '', '');
  clusterInstance.pops['tsnu'] = new ClusterBase((pops.tsnu === undefined ? undefined : pops.tsnu.relay_addresses), '', '');
  clusterInstance.pops['tyo'] = new ClusterBase((pops.tyo === undefined ? undefined : pops.tyo.relay_addresses), 'Tokyo', 'as');
  clusterInstance.pops['tyo1'] = new ClusterBase((pops.tyo1 === undefined ? undefined : pops.tyo1.relay_addresses), '', '');
  clusterInstance.pops['vie'] = new ClusterBase((pops.vie === undefined ? undefined : pops.vie.relay_addresses), 'Vienna', 'eu-east');
  clusterInstance.pops['waw'] = new ClusterBase((pops.waw === undefined ? undefined : pops.waw.relay_addresses), 'Warsaw', 'eu-east');
  // concat
  clusterInstance.pops['tyo'].relayAddresses = clusterInstance.pops['tyo'].relayAddresses.concat(clusterInstance.pops['tyo1'].relayAddresses).concat(clusterInstance.pops['gnrt'].relayAddresses);
  clusterInstance.pops['tyo1'].relayAddresses = [];
  clusterInstance.pops['gnrt'].relayAddresses = [];
  clusterInstance.pops['sto'].relayAddresses = clusterInstance.pops['sto'].relayAddresses.concat(clusterInstance.pops['sto2'].relayAddresses);
  clusterInstance.pops['sto2'].relayAddresses = [];
  clusterInstance.pops['tsn'].relayAddresses = clusterInstance.pops['tsn'].relayAddresses.concat(clusterInstance.pops['tsnt'].relayAddresses).concat(clusterInstance.pops['tsnu'].relayAddresses);
  clusterInstance.pops['tsnu'].relayAddresses = [];
  clusterInstance.pops['tsnt'].relayAddresses = [];
  clusterInstance.pops['can'].relayAddresses = clusterInstance.pops['can'].relayAddresses.concat(clusterInstance.pops['cant'].relayAddresses).concat(clusterInstance.pops['canu'].relayAddresses);
  clusterInstance.pops['cant'].relayAddresses = [];
  clusterInstance.pops['canu'].relayAddresses = [];
  clusterInstance.pops['sha'].relayAddresses = clusterInstance.pops['sha'].relayAddresses.concat(clusterInstance.pops['shat'].relayAddresses).concat(clusterInstance.pops['shau'].relayAddresses);
  clusterInstance.pops['shat'].relayAddresses = [];
  clusterInstance.pops['shau'].relayAddresses = [];
  clusterInstance.pops['fra'].relayAddresses = clusterInstance.pops['fra'].relayAddresses.concat(clusterInstance.pops['aec1'].relayAddresses)
  clusterInstance.pops['aec1'].relayAddresses = [];
  clusterInstance.pops['hkg'].relayAddresses = clusterInstance.pops['hkg'].relayAddresses.concat(clusterInstance.pops['aae1'].relayAddresses)
  clusterInstance.pops['aae1'].relayAddresses = [];
}

let Status = function () {
  this.time = 0;
  this.isAlive = false;
}

let Clusters = function (data) {
  this.converter = new Converter(data);
  this.pops = [];
  this.clustersId = ['ams', 'atl', 'auw2', 'bom', 'can', 'dxb', 'eat', 'fra', 'gru', 'hkg', 'iad', 'jnb', 'lax', 'lhr', 'lim', 'lux', 'maa', 'mad', 'man', 'okc', 'ord', 'par', 'pwg', 'pwj', 'pwu', 'pww', 'pwz', 'scl', 'sea', 'sgp', 'sha', 'shb', 'sto', 'syd', 'tsn', 'tyo', 'vie', 'waw'];
}

Clusters.prototype.convert = function () {
  return this.converter.convert(this);
}

module.exports = { Clusters, Converter, ClusterBase, Status };