const db = require('better-sqlite3')('database.db', {})
const createTable = {
  dbSettings: 'PRAGMA recursive_triggers=1',
  domains: 'CREATE TABLE IF NOT EXISTS domain(_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, times INTEGER DEFAULT 1, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  tags: 'CREATE TABLE IF NOT EXISTS tag(_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, enabled BOOLEAN NOT NULL DEFAULT 1, blacklisted BOOLEAN NOT NULL DEFAULT 1, type INTEGER NOT NULL DEFAULT 0)',
  tag2domain: 'CREATE TABLE IF NOT EXISTS tag2domain(tagId INTEGER PRIMARY KEY, domain TEXT NOT NULL, FOREIGN KEY(tagId) REFERENCES tag(_id))',
  triggerDomain: 'CREATE TRIGGER IF NOT EXISTS update_domain BEFORE INSERT ON domain FOR EACH ROW\nBEGIN\nUPDATE domain SET timestamp=CURRENT_TIMESTAMP, times=times+1;\nEND',
  users: 'CREATE TABLE IF NOT EXISTS user(mac TEXT PRIMARY KEY NOT NULL UNIQUE, name TEXT, ip TEXT NOT NULL UNIQUE, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  user2domain: 'CREATE TABLE IF NOT EXISTS user2domain (mac TEXT NOT NULL UNIQUE, domainID INTEGER NOT NULL UNIQUE, times INTEGER DEFAULT 1, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (mac, domainID))',
  triggerUser2domain: 'CREATE TRIGGER IF NOT EXISTS update_user2domain BEFORE INSERT ON user2domain FOR EACH ROW\nBEGIN\nUPDATE user2domain SET timestamp=CURRENT_TIMESTAMP, times=times+1;\nEND'

}
Object.values(createTable).map(sql => db.exec(sql))
const query = (sql, ...args) => db.prepare(sql).all(...args)
const run = (sql, ...args) => db.prepare(sql).run(...args)
const createUser = user => run('INSERT INTO user(mac, name, ip) VALUES(@mac, @mac, @ip)', user)
const getUsers = () => query('SELECT * FROM user')
const getUserByMac = mac => query('SELECT * FROM user WHERE mac=?', [mac])[0]

const updateIP = user => run('UPDATE user SET ip=@ip WHERE mac=@mac', user)
const updateUserName = user => run('UPDATE user SET name=@name WHERE mac=@mac', user)

const addDomain = name => run('INSERT OR IGNORE INTO domain(name) VALUES(?)', [name])
const listDomains = () => query('SELECT * FROM domain ORDER BY times DESC LIMIT 20')

const addUserDomain = o => run('INSERT OR IGNORE INTO user2domain(mac, domainID) VALUES(@mac, @domainID)', o)
// safe db close
process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))
module.exports = {
  createUser,
  getUsers,
  getUserByMac,
  updateIP,
  updateUserName,

  addDomain,
  listDomains,

  addUserDomain
}
