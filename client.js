const stream = require('stream')
const extend = require('xtend')
const messages = require('./level-rpc_pb');
const services = require('./level-rpc_grpc_pb');
const grpc = require('grpc');
const { promisify } = require('util');
const AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN;
const LevelUP = require('levelup');

class LevelRpcDOWN extends AbstractLevelDOWN {
  constructor(options) {
    super(options);
  }

  _open(options, done) {
    const client = new services.LevelRpcClient(
      options.uri, grpc.credentials.createInsecure()
    );
    client.get = promisify(client.get);
    client.put = promisify(client.put);
    client.del = promisify(client.del);
    client.batch = promisify(client.batch);
    client.scan = client.scan;
    this.client = client;
    return done ? done() : client;
  }

  _close(done) {
    this.client.close();
    done();
  }

  _get(k, options, done) {
    const getMessage = new messages.GetRequest();
    getMessage.setKey(k);
    this.client.get(getMessage)
      .then(function (res) {
        done(null, res.getValue());
      }).catch(done);
  }
  
  _put(k, v, options, done) {
    const putMessage = new messages.PutRequest();
    putMessage.setKey(k);
    putMessage.setValue(v);
    this.client.put(putMessage)
      .then(function () { done(); })
      .catch(done);
  }

  _del(k, options, done) {
    const delMessage = new messages.DelRequest();
    delMessage.setKey(k);
    this.client.del(delMessage)
      .then(function () { done(); })
      .catch(done);
  }

  _batch(ops, options, done) {
    const batchMessage = new messages.BatchRequest();
    batchMessage.setCommandsList(ops.map((op) => {
      let command = new messages.BatchRequest.Command();
      command.setType(op.type);
      command.setKey(op.key);
      command.setValue(op.value);
      return command;
    }));
    
    this.client.batch(batchMessage)
      .then(function () { done(); })
      .catch(done);
  }
}

class FilterReadStream extends stream.Transform {
  constructor(options) {
    super(options);
    this._keys = options.keys;
    this._values = options.values;
  }

  _transform(chunk, encoding, callback) {
    if (this._keys === true && !this._values) {
      this.push(chunk.getKey());
    } else if (this._values === true && !this._keys) {
      this.push(chunk.getValue());
    } else {
      this.push({ key: chunk.getKey(), value: chunk.getValue() });
    }
    callback();
  }
}

class LevelRpcUP extends LevelUP {
  _scan(options) {
    options = options || {};
    const scanMessage = new messages.ScanRequest();
    scanMessage.setGt(options.gt);
    scanMessage.setGte(options.gte);
    scanMessage.setLt(options.lt);
    scanMessage.setLte(options.lte);
    scanMessage.setReverse(options.reverse);
    scanMessage.setLimit(options.limit);
    scanMessage.setKeys(options.keys);
    scanMessage.setValues(options.values);
    return this._db.client.scan(scanMessage)
      .pipe(new FilterReadStream({
        keys: options.keys,
        values: options.values,
        objectMode: true 
      }));
  }
  
  readStream(options) {
    options = extend({ keys: true, values: true }, options)
    if (typeof options.limit !== 'number') { options.limit = -1 }
    return this._scan(options); 
  }

  createReadStream(options) {
    options = extend({ keys: true, values: true }, options)
    if (typeof options.limit !== 'number') { options.limit = -1 }
    return this._scan(options); 
  }
}

module.exports = function (options) {
  return new LevelRpcUP(new LevelRpcDOWN(options), options);
};
