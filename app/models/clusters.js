let ClusterBase = function (relayAddresses, cityName, continentId) {
  this.relayAddresses = relayAddresses ? relayConverter(relayAddresses) : undefined;
  this.status = new Status();
  this.continentId = continentId;
  this.cityName = cityName;
}

let Converter = function (data) {
  this.data = data;
}

function relayConverter(relay) {
  return relay.map(data => `${data.ipv4}:${data.port_range.join("-")}`)
}

Converter.prototype.convert = function (clusterInstance) {
  const pops = this.data.pops;

  clusterInstance.pops['aae1'] = new ClusterBase((pops.aae1 === undefined ? undefined : pops.aae1.relays), '', '');
  clusterInstance.pops['aec1'] = new ClusterBase((pops.aec1 === undefined ? undefined : pops.aec1.relays), '', '');
  clusterInstance.pops['auw2'] = new ClusterBase((pops.auw2 === undefined ? undefined : pops.auw2.relays), 'Oregon', 'na-west');
  clusterInstance.pops['ams'] = new ClusterBase((pops.ams === undefined ? undefined : pops.ams.relays), 'Amsterdam', 'eu-west');
  clusterInstance.pops['atl'] = new ClusterBase((pops.atl === undefined ? undefined : pops.atl.relays), 'Atlanta', 'na-east');
  clusterInstance.pops['bom'] = new ClusterBase((pops.bom === undefined ? undefined : pops.bom.relays), 'Bombay', 'as');
  clusterInstance.pops['can'] = new ClusterBase((pops.canm === undefined ? undefined : pops.canm.relays), 'Canton', 'as');
  clusterInstance.pops['cant'] = new ClusterBase((pops.cant === undefined ? undefined : pops.cant.relays), '', '');
  clusterInstance.pops['canu'] = new ClusterBase((pops.canu === undefined ? undefined : pops.canu.relays), '', '');
  clusterInstance.pops['dxb'] = new ClusterBase((pops.dxb === undefined ? undefined : pops.dxb.relays), 'Dubai', 'as');
  clusterInstance.pops['eat'] = new ClusterBase((pops.eat === undefined ? undefined : pops.eat.relays), 'Wenatchee', 'na-west');
  clusterInstance.pops['eze'] = new ClusterBase((pops.eze === undefined ? undefined : pops.eze.relays), 'Buenos Aires', 'sa');
  clusterInstance.pops['fra'] = new ClusterBase((pops.fra === undefined ? undefined : pops.fra.relays), 'Frankfurt', 'eu-west');
  clusterInstance.pops['gnrt'] = new ClusterBase((pops.gnrt === undefined ? undefined : pops.gnrt.relays), '', '');
  clusterInstance.pops['gru'] = new ClusterBase((pops.gru === undefined ? undefined : pops.gru.relays), 'Sao Paulo', 'sa');
  clusterInstance.pops['hkg'] = new ClusterBase((pops.hkg === undefined ? undefined : pops.hkg.relays), 'Hong Kong', 'as');
  clusterInstance.pops['iad'] = new ClusterBase((pops.iad === undefined ? undefined : pops.iad.relays), 'Washington DC', 'na-east');
  clusterInstance.pops['jnb'] = new ClusterBase((pops.jnb === undefined ? undefined : pops.jnb.relays), 'Cape Town', 'af');
  clusterInstance.pops['lax'] = new ClusterBase((pops.lax === undefined ? undefined : pops.lax.relays), 'Los Angeles', 'na-west');
  clusterInstance.pops['lhr'] = new ClusterBase((pops.lhr === undefined ? undefined : pops.lhr.relays), 'London', 'eu-west');
  clusterInstance.pops['lim'] = new ClusterBase((pops.lim === undefined ? undefined : pops.lim.relays), 'Lima', 'sa');
  clusterInstance.pops['lux'] = new ClusterBase((pops.lux === undefined ? undefined : pops.lux.relays), 'Luxembourg', 'eu-west');
  clusterInstance.pops['maa'] = new ClusterBase((pops.maa === undefined ? undefined : pops.maa.relays), 'Chennai', 'as');
  clusterInstance.pops['mad'] = new ClusterBase((pops.mad === undefined ? undefined : pops.mad.relays), 'Madrid', 'eu-west');
  clusterInstance.pops['man'] = new ClusterBase((pops.man === undefined ? undefined : pops.man.relays), 'Manila', 'as');
  clusterInstance.pops['okc'] = new ClusterBase((pops.okc === undefined ? undefined : pops.okc.relays), 'Oklahoma', 'na-east');
  clusterInstance.pops['ord'] = new ClusterBase((pops.ord === undefined ? undefined : pops.ord.relays), 'Chicago', 'na-east');
  clusterInstance.pops['par'] = new ClusterBase((pops.par === undefined ? undefined : pops.par.relays), 'Paris', 'eu-west');
  clusterInstance.pops['pwg'] = new ClusterBase((pops.pwg === undefined ? undefined : pops.pwg.relays), 'Guangdong', 'as');
  clusterInstance.pops['pwj'] = new ClusterBase((pops.pwj === undefined ? undefined : pops.pwj.relays), 'Unknow city', 'as');
  clusterInstance.pops['pwu'] = new ClusterBase((pops.pwu === undefined ? undefined : pops.pwu.relays), 'Beijing', 'as');
  clusterInstance.pops['pww'] = new ClusterBase((pops.pww === undefined ? undefined : pops.pww.relays), 'Wuhan', 'as');
  clusterInstance.pops['pwz'] = new ClusterBase((pops.pwz === undefined ? undefined : pops.pwz.relays), 'Unknow city', 'as');
  clusterInstance.pops['scl'] = new ClusterBase((pops.scl === undefined ? undefined : pops.scl.relays), 'Santiago', 'sa');
  clusterInstance.pops['sea'] = new ClusterBase((pops.sea === undefined ? undefined : pops.sea.relays), 'Seattle', 'na-west');
  clusterInstance.pops['seo'] = new ClusterBase((pops.seo === undefined ? undefined : pops.seo.relays), 'Seoul', 'as');
  clusterInstance.pops['sgp'] = new ClusterBase((pops.sgp === undefined ? undefined : pops.sgp.relays), 'Singapore', 'as');
  clusterInstance.pops['sha'] = new ClusterBase((pops.sham === undefined ? undefined : pops.sham.relays), 'Shanghai', 'as');
  clusterInstance.pops['shat'] = new ClusterBase((pops.shat === undefined ? undefined : pops.shat.relays), '', '');
  clusterInstance.pops['shau'] = new ClusterBase((pops.shau === undefined ? undefined : pops.shau.relays), '', '');
  clusterInstance.pops['shb'] = new ClusterBase((pops.shb === undefined ? undefined : pops.shb.relays), 'Nakashibetsu', 'as');
  clusterInstance.pops['sto'] = new ClusterBase((pops.sto === undefined ? undefined : pops.sto.relays), 'Stockholm', 'eu-east');
  clusterInstance.pops['sto2'] = new ClusterBase((pops.sto2 === undefined ? undefined : pops.sto2.relays), '', '');
  clusterInstance.pops['syd'] = new ClusterBase((pops.syd === undefined ? undefined : pops.syd.relays), 'Sydney', 'oc');
  clusterInstance.pops['tsn'] = new ClusterBase((pops.tsnm === undefined ? undefined : pops.tsnm.relays), 'Tianjin', 'as');
  clusterInstance.pops['tsnt'] = new ClusterBase((pops.tsnt === undefined ? undefined : pops.tsnt.relays), '', '');
  clusterInstance.pops['tsnu'] = new ClusterBase((pops.tsnu === undefined ? undefined : pops.tsnu.relays), '', '');
  clusterInstance.pops['tyo'] = new ClusterBase((pops.tyo === undefined ? undefined : pops.tyo.relays), 'Tokyo', 'as');
  clusterInstance.pops['tyo1'] = new ClusterBase((pops.tyo1 === undefined ? undefined : pops.tyo1.relays), '', '');
  clusterInstance.pops['vie'] = new ClusterBase((pops.vie === undefined ? undefined : pops.vie.relays), 'Vienna', 'eu-east');
  clusterInstance.pops['waw'] = new ClusterBase((pops.waw === undefined ? undefined : pops.waw.relays), 'Warsaw', 'eu-east');
  // concat
  if (clusterInstance.pops['tyo'].relayAddresses){
    clusterInstance.pops['tyo'].relayAddresses = clusterInstance.pops['tyo'].relayAddresses.concat(clusterInstance.pops['tyo1'].relayAddresses).concat(clusterInstance.pops['gnrt'].relayAddresses);
  }
  clusterInstance.pops['tyo1'].relayAddresses = [];
  clusterInstance.pops['gnrt'].relayAddresses = [];
  if (clusterInstance.pops['sto'].relayAddresses){
    clusterInstance.pops['sto'].relayAddresses = clusterInstance.pops['sto'].relayAddresses.concat(clusterInstance.pops['sto2'].relayAddresses);
  }
  clusterInstance.pops['sto2'].relayAddresses = [];
  if (clusterInstance.pops['tsn'].relayAddresses){
    clusterInstance.pops['tsn'].relayAddresses = clusterInstance.pops['tsn'].relayAddresses.concat(clusterInstance.pops['tsnt'].relayAddresses).concat(clusterInstance.pops['tsnu'].relayAddresses);
  }
  clusterInstance.pops['tsnu'].relayAddresses = [];
  clusterInstance.pops['tsnt'].relayAddresses = [];
  if(clusterInstance.pops['can'].relayAddresses){
    clusterInstance.pops['can'].relayAddresses = clusterInstance.pops['can'].relayAddresses.concat(clusterInstance.pops['cant'].relayAddresses).concat(clusterInstance.pops['canu'].relayAddresses);
  }
  clusterInstance.pops['cant'].relayAddresses = [];
  clusterInstance.pops['canu'].relayAddresses = [];
  if(clusterInstance.pops['sha'].relayAddresses){
    clusterInstance.pops['sha'].relayAddresses = clusterInstance.pops['sha'].relayAddresses.concat(clusterInstance.pops['shat'].relayAddresses).concat(clusterInstance.pops['shau'].relayAddresses);
  }
  clusterInstance.pops['shat'].relayAddresses = [];
  clusterInstance.pops['shau'].relayAddresses = [];
  if(clusterInstance.pops['fra'].relayAddresses){
    clusterInstance.pops['fra'].relayAddresses = clusterInstance.pops['fra'].relayAddresses.concat(clusterInstance.pops['aec1'].relayAddresses)
  }
  clusterInstance.pops['aec1'].relayAddresses = [];
  if(clusterInstance.pops['hkg'].relayAddresses){
    clusterInstance.pops['hkg'].relayAddresses = clusterInstance.pops['hkg'].relayAddresses.concat(clusterInstance.pops['aae1'].relayAddresses)
  }
  clusterInstance.pops['aae1'].relayAddresses = [];
}

let Status = function () {
  this.time = 0;
  this.isAlive = false;
}

let Clusters = function (data) {
  this.converter = new Converter(data);
  this.pops = [];
  this.clustersId = ['ams', 'atl', 'auw2', 'bom', 'can', 'dxb', 'eat', 'eze', 'fra', 'gru', 'hkg', 'iad', 'jnb', 'lax', 'lhr', 'lim', 'lux', 'maa', 'mad', 'man', 'okc', 'ord', 'par', 'pwg', 'pwj', 'pwu', 'pww', 'pwz', 'scl', 'seo', 'sea', 'sgp', 'sha', 'shb', 'sto', 'syd', 'tsn', 'tyo', 'vie', 'waw'];
}

Clusters.prototype.convert = function () {
  return this.converter.convert(this);
}

module.exports = { Clusters, Converter, ClusterBase, Status };
