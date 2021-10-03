const db = require('better-sqlite3')('database.db', {})
const createTable = {
  dbSettings: 'PRAGMA recursive_triggers=1',
  domains: 'CREATE TABLE IF NOT EXISTS domain(_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, times INTEGER DEFAULT 1, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
  tags: 'CREATE TABLE IF NOT EXISTS tag(_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, enabled BOOLEAN NOT NULL DEFAULT 1, blacklisted BOOLEAN NOT NULL DEFAULT 1)',
  tag2domain: 'CREATE TABLE IF NOT EXISTS tag2domain(tagId INTEGER PRIMARY KEY, domain TEXT NOT NULL, FOREIGN KEY(tagId) REFERENCES tag(_id))',
  triggerDomain: 'CREATE TRIGGER IF NOT EXISTS update_domain BEFORE INSERT ON domain FOR EACH ROW\nBEGIN\nUPDATE domain SET timestamp=CURRENT_TIMESTAMP, times=times+1;\nEND'
  // users: 'CREATE TABLE IF NOT EXISTS user(_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, desc TEXT, type INTEGER, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
}
Object.values(createTable).map(sql => db.exec(sql))
const query = (sql, ...args) => db.prepare(sql).all(...args)
const run = (sql, ...args) => db.prepare(sql).run(...args)
const createUser = user => run('INSERT INTO user(name, desc) VALUES(@title, @desc)', user)
const getUsers = () => query('SELECT * FROM user')

const addDomain = name => run('INSERT OR IGNORE INTO domain(name) VALUES(?)', [name])
const listDomains = () => query('SELECT * FROM domain ORDER BY times DESC LIMIT 20')
// run('INSERT OR IGNORE INTO user(_id, name, desc) VALUES(0, @title, @desc)', { name: 'adminy', desc: 'A Senior Software Dev' })

// safe db close
process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))
module.exports = { createUser, getUsers, addDomain, listDomains }
