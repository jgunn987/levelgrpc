const dbpath = process.env.LGRPC_DBPATH;
const uri = process.env.LGRPC_URI;

if(!dbpath) throw new Error('LGRPC_DBPATH not defined');
if(!uri) throw new Error('LGRPC_URI not defined');

const levelrpc = require('.');
const levelup = require('levelup');
const leveldown = require('leveldown');
const db = levelup(leveldown(dbpath));
const server = levelrpc.server(db, { uri });

server.start();
