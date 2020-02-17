// const fetch = require('node-fetch');
// const crypto = require('crypto');
// const fs = require('fs-extra');
// const path = require('path');
const config = require('./config.js');
// const minimatch = require('minimatch');
const { encode, decode } = require('dns-packet');
const { queryServers } = require('./query');
const fs = require('fs')
// let hosts = [];
const WL = __dirname + '/whitelist.txt'
const loadWhiteList = () => fs.readFileSync(WL).toString().split('\n').filter(line => line.length > 0)
allowed = loadWhiteList()
fs.watch(WL, {}, () =>
   setTimeout(() =>
	   allowed = loadWhiteList(), 1000
   )
)

// function md5(string) {
//   return crypto.createHash('md5').update(string).digest('hex')
// }

// async function download(url) {
//   const res = await fetch(url);
//   if(res.status !== 200) throw new Error(res.statusText);
//   return await res.buffer();
// }

// function parseHosts(data) {
//   return data.split('\n')
//     .map( line => line.trim())
//     .filter( line => !line.startsWith('#')) // remove comments
//     .filter( line => line.startsWith('0.0.0.0')) // pick the blocked hosts
//     .map( line => line.split(' ')[1]) // keep just the hostname
//     .map( line => line.trim());
// }

const blockedSites = {}

const showStats = domain => {
  domain = domain.split('.').slice(-2).join('.')
  if(domain in blockedSites) blockedSites[domain]++
  else blockedSites[domain] = 0

  const sites = Object.entries(blockedSites).sort((a, b) => b[1] - a[1])
  const size = sites.length > 80 ? 80 : sites.length
  console.clear()
  console.log(`Total Sites Blocked: ${sites.length}\x1b[31m`)
  for(let i = 0; i < size; i++)
    console.log((i <= 9 ? ' ' + i : i) + (`> ${sites[i][1]}` + ' '.repeat(9)).substr(0, 9) + `:${sites[i][0]}`)
  console.log('\x1b[0m______________________')
}

const isBlocked = domain => {
  for(const dns of allowed)
    if(domain.includes(dns))
       return false;
  setTimeout(() => showStats(domain), 200)
  return true;
  // if(hosts.includes(domain)) return true;
  // return hosts.some(host=> host.includes('*') && minimatch(domain, host));
}

// async function _loadHosts(hostsUrl) {
//   const cacheFile = path.join(config.cacheDir, md5(hostsUrl));
//   let data = await download(hostsUrl).catch(()=>{});
//   if(data) await fs.outputFile(cacheFile, data); // write the cache file if download succeeds
//   if(!data) data = await fs.readFile(cacheFile).catch(()=>{});  // fallback to cache if download fails
//   if(!data) throw new Error(`Failed to load the hosts file`); // throw an error if both download and cache fail
//   hosts = hosts.concat(parseHosts(data.toString('utf-8')));
// }

// module.exports.loadHosts = async function loadHosts() {
//   await Promise.all(config.hostsUrls.map(hostsUrl=> _loadHosts(hostsUrl)));
// }

module.exports.resolveQuery = function resolveQuery(packet) {
  return new Promise((resolve)=> {
    const servers = config.useHttp? config.httpServers: config.udpServers;
    const request = decode(packet);

    // questions is an array but it's almost guaranteed to have only one element
    // https://serverfault.com/q/742785
    const question = request.questions[0];

    // resolve with NXDOMAIN if the domain is blocked
    if(['A', 'AAAA'].includes(question.type) && isBlocked(question.name)) {
      // lm.log(`Blocked ${question.name}`);
      return resolve(encode({ type: 'response', id: request.id, flags: 3, questions: request.questions })); // flag 3 is NXDOMAIN; https://serverfault.com/a/827108
    }

    // query remote servers. Resolve with SERVFAIL on error
    queryServers(servers, packet, { timeout: config.timeout })
      .then(resolve)
      .catch((err)=> {
        console.log(err.message);
        resolve(encode({ type: 'response', id: request.id, flags: 2, questions: request.questions })); // flag 2 is SERVFAIL; https://serverfault.com/a/827108
      });
  });
}
