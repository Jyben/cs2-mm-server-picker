#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
  .command('list [region]', 'List all currently known IP ranges (and cluster ids) on a given Cluster ID', (yargs) => { // todo re-work description its gross
    return yargs
      .positional('region', {
        describe: 'specific geographic region/cluster for Matchmaking Servers',
        default: 'all'
      })
  }, (argv) => {
    if (argv.verbose) console.info(`List servers on :${argv.region}`)
    
    console.log('Listed the Servers');
  })
  .command('reset', 'Remove all CSGO Matchmaking Server Firewall rules', (argv) => {
      
    console.log('🔥🔥🔥 All firewall rules removed successfully! 🔥🔥🔥')
  })
  .command('set region [regionid]', 'Sets a given specified region as the default for Matchmaking', (yargs) => {
    return yargs
    .positional('regionid', {
      describe: 'specific geographic region for Matchmaking Servers',
      default: 'oc'
    })
  }, (argv) => {
      
    console.log(`Set region: ${argv.regionid} for CSGO Matchmaking. Firewall has been changed.`)
  })
  .command('ping region [regionid] [amount]', 'Pings a given specified region/cluster and displays output.', (yargs) => {
    return yargs
      .positional('regionid', {
        describe: 'specific geographic region for Matchmaking Servers',
        default: 'oc'
      })
      .positional('amount', {
        describe: 'The amount of times to ping a particular region\'s servers',
        default: '5'
      })
  }, (argv) => {
      
    console.log(`Pinging region: ${argv.regionid}, ${argv.amount} times for CSGO Matchmaking. ⚠ Firewall has NOT been changed. ⚠`)
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
  })
  .argv
