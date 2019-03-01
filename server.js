const messages = require('./level-rpc_pb');
const services = require('./level-rpc_grpc_pb');
const grpc = require('grpc');

class LevelRpcService {
  constructor(db) {
    this.db = db;
  }

  get(call, done) {
    const k = call.request.getKey();
    this.db.get(k, function (err, v) {
      if (err) return done(err);
      const res = new messages.GetResponse();
      res.setKey(k);
      res.setValue(v.toString());
      done(null, res);
    });
  }

  put(call, done) {
    const k = call.request.getKey();
    const v = call.request.getValue();
    this.db.put(k, v, function (err) {
      if (err) return done(err);
      done(null, new messages.PutResponse());
    });
  }

  del(call, done) {
    this.db.del(call.request.getKey(), function (err) {
      if (err) return done(err);
      done(null, new messages.DelResponse());
    });
  }

  batch(call, done) {
    const commands = call.request.getCommandsList().map((c) => { 
      return { type: c.getType(), key: c.getKey(), value: c.getValue() };
    });
    this.db.batch(commands, function (err) {
      if (err) return done(err);
      done(null, new messages.BatchResponse());
    });
  }

  scan(call) {
    const stream = this.db.createReadStream({
      gt: call.request.getGt() || undefined,
      gte: call.request.getGte() || undefined,
      lt: call.request.getLt() || undefined,
      lte: call.request.getLte() || undefined,
      reverse: call.request.getReverse(),
      limit: call.request.getLimit() || -1
    }).on('data', function (d) {
      const res = new messages.GetResponse();
      res.setKey(d.key.toString());
      res.setValue(d.value.toString());
      call.write(res);
    }).on('error', function (err) {
      call.end();
    }).on('close', function () {
      call.end();
    }).on('end', function () {
      call.end();
    });
  }
}

module.exports = function (db, options) {
  const server = new grpc.Server();
  server.addService(services.LevelRpcService, new LevelRpcService(db)); 
  server.bind(options.uri, grpc.ServerCredentials.createInsecure());
  return server;
};
