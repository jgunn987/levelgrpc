// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var level$rpc_pb = require('./level-rpc_pb.js');

function serialize_levelrpc_BatchRequest(arg) {
  if (!(arg instanceof level$rpc_pb.BatchRequest)) {
    throw new Error('Expected argument of type levelrpc.BatchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_BatchRequest(buffer_arg) {
  return level$rpc_pb.BatchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_BatchResponse(arg) {
  if (!(arg instanceof level$rpc_pb.BatchResponse)) {
    throw new Error('Expected argument of type levelrpc.BatchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_BatchResponse(buffer_arg) {
  return level$rpc_pb.BatchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_DelRequest(arg) {
  if (!(arg instanceof level$rpc_pb.DelRequest)) {
    throw new Error('Expected argument of type levelrpc.DelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_DelRequest(buffer_arg) {
  return level$rpc_pb.DelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_DelResponse(arg) {
  if (!(arg instanceof level$rpc_pb.DelResponse)) {
    throw new Error('Expected argument of type levelrpc.DelResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_DelResponse(buffer_arg) {
  return level$rpc_pb.DelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_GetRequest(arg) {
  if (!(arg instanceof level$rpc_pb.GetRequest)) {
    throw new Error('Expected argument of type levelrpc.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_GetRequest(buffer_arg) {
  return level$rpc_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_GetResponse(arg) {
  if (!(arg instanceof level$rpc_pb.GetResponse)) {
    throw new Error('Expected argument of type levelrpc.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_GetResponse(buffer_arg) {
  return level$rpc_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_PutRequest(arg) {
  if (!(arg instanceof level$rpc_pb.PutRequest)) {
    throw new Error('Expected argument of type levelrpc.PutRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_PutRequest(buffer_arg) {
  return level$rpc_pb.PutRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_PutResponse(arg) {
  if (!(arg instanceof level$rpc_pb.PutResponse)) {
    throw new Error('Expected argument of type levelrpc.PutResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_PutResponse(buffer_arg) {
  return level$rpc_pb.PutResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_levelrpc_ScanRequest(arg) {
  if (!(arg instanceof level$rpc_pb.ScanRequest)) {
    throw new Error('Expected argument of type levelrpc.ScanRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_levelrpc_ScanRequest(buffer_arg) {
  return level$rpc_pb.ScanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var LevelRpcService = exports.LevelRpcService = {
  get: {
    path: '/levelrpc.LevelRpc/get',
    requestStream: false,
    responseStream: false,
    requestType: level$rpc_pb.GetRequest,
    responseType: level$rpc_pb.GetResponse,
    requestSerialize: serialize_levelrpc_GetRequest,
    requestDeserialize: deserialize_levelrpc_GetRequest,
    responseSerialize: serialize_levelrpc_GetResponse,
    responseDeserialize: deserialize_levelrpc_GetResponse,
  },
  put: {
    path: '/levelrpc.LevelRpc/put',
    requestStream: false,
    responseStream: false,
    requestType: level$rpc_pb.PutRequest,
    responseType: level$rpc_pb.PutResponse,
    requestSerialize: serialize_levelrpc_PutRequest,
    requestDeserialize: deserialize_levelrpc_PutRequest,
    responseSerialize: serialize_levelrpc_PutResponse,
    responseDeserialize: deserialize_levelrpc_PutResponse,
  },
  del: {
    path: '/levelrpc.LevelRpc/del',
    requestStream: false,
    responseStream: false,
    requestType: level$rpc_pb.DelRequest,
    responseType: level$rpc_pb.DelResponse,
    requestSerialize: serialize_levelrpc_DelRequest,
    requestDeserialize: deserialize_levelrpc_DelRequest,
    responseSerialize: serialize_levelrpc_DelResponse,
    responseDeserialize: deserialize_levelrpc_DelResponse,
  },
  batch: {
    path: '/levelrpc.LevelRpc/batch',
    requestStream: false,
    responseStream: false,
    requestType: level$rpc_pb.BatchRequest,
    responseType: level$rpc_pb.BatchResponse,
    requestSerialize: serialize_levelrpc_BatchRequest,
    requestDeserialize: deserialize_levelrpc_BatchRequest,
    responseSerialize: serialize_levelrpc_BatchResponse,
    responseDeserialize: deserialize_levelrpc_BatchResponse,
  },
  scan: {
    path: '/levelrpc.LevelRpc/scan',
    requestStream: false,
    responseStream: true,
    requestType: level$rpc_pb.ScanRequest,
    responseType: level$rpc_pb.GetResponse,
    requestSerialize: serialize_levelrpc_ScanRequest,
    requestDeserialize: deserialize_levelrpc_ScanRequest,
    responseSerialize: serialize_levelrpc_GetResponse,
    responseDeserialize: deserialize_levelrpc_GetResponse,
  },
};

exports.LevelRpcClient = grpc.makeGenericClientConstructor(LevelRpcService);
