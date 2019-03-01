const assert = require('assert');
const levelrpc = require('.');
const levelup = require('levelup')
const leveldown = require('leveldown')
const db = levelup(leveldown('/tmp/level-rpc-test-db'))
const server = levelrpc.server(db, { uri: '0.0.0.0:50051' });
const client = levelrpc.client({ uri: '0.0.0.0:50051' });

async function testPut() {
  await client.put('key1', 'value1');
  await client.put('key2', 'value2');
  await client.put('key3', 'value3');
  await client.put('key4', 'value4');
  await client.put('key5', 'value5');
  await client.put('key6', 'value6');
  await client.put('key7', 'value7');
  await client.put('key8', 'value8');
  assert.ok(true);
}

async function testGet() {
  assert.ok(await client.get('key1') === 'value1');
  assert.ok(await client.get('key2') === 'value2');
  assert.ok(await client.get('key3') === 'value3');
  assert.ok(await client.get('key4') === 'value4');
  assert.ok(await client.get('key5') === 'value5');
  assert.ok(await client.get('key6') === 'value6');
  assert.ok(await client.get('key7') === 'value7');
  assert.ok(await client.get('key8') === 'value8');
}

async function testDel() {
  await client.del('key1');
  await client.del('key2');
  await client.del('key3');
  await client.del('key4');
  await client.del('key5');
  await client.del('key6');
  await client.del('key7');
  await client.del('key8');
  for (let i=1; i < 9; ++i) {
    try {
      await client.get('key' + i);
      assert.fail();
    } catch(err) {
      assert.ok(err);
    }
  }
}

async function testBatch() {
  await client.batch([
    { type: 'put', key: 'key1', value: 'value1' },
    { type: 'put', key: 'key2', value: 'value2' },
    { type: 'put', key: 'key3', value: 'value3' },
    { type: 'put', key: 'key4', value: 'value4' },
    { type: 'put', key: 'key5', value: 'value5' },
    { type: 'put', key: 'key6', value: 'value6' },
    { type: 'put', key: 'key7', value: 'value7' },
    { type: 'put', key: 'key8', value: 'value8' },
  ]);
  for (let i=1; i < 9; ++i) {
    try {
      assert.ok(await client.get('key' + i) === 'value' + i);
    } catch(err) {
      assert.fail(err);
    }
  }

  await client.batch([
    { type: 'del', key: 'key1', value: 'value1' },
    { type: 'del', key: 'key2', value: 'value2' },
    { type: 'del', key: 'key3', value: 'value3' },
    { type: 'del', key: 'key4', value: 'value4' },
    { type: 'del', key: 'key5', value: 'value5' },
    { type: 'del', key: 'key6', value: 'value6' },
    { type: 'del', key: 'key7', value: 'value7' },
    { type: 'del', key: 'key8', value: 'value8' },
  ]);
  for (let i=1; i < 9; ++i) {
    try {
      await client.get('key' + i);
      assert.fail();
    } catch(err) {
      assert.ok(err);
    }
  }
}

async function testChainedBatch() {
  await client.batch()
    .put('key1', 'value1')
    .put('key2', 'value2')
    .put('key3', 'value3')
    .put('key4', 'value4')
    .put('key5', 'value5')
    .put('key6', 'value6')
    .put('key7', 'value7')
    .put('key8', 'value8')
    .write()
  for (let i=1; i < 9; ++i) {
    try {
      assert.ok(await client.get('key' + i) === 'value' + i);
    } catch(err) {
      assert.fail(err);
    }
  }

  await client.batch()
    .del('key1', 'value1')
    .del('key2', 'value2')
    .del('key3', 'value3')
    .del('key4', 'value4')
    .del('key5', 'value5')
    .del('key6', 'value6')
    .del('key7', 'value7')
    .del('key8', 'value8')
    .write()
  for (let i=1; i < 9; ++i) {
    try {
      await client.get('key' + i);
      assert.fail();
    } catch(err) {
      assert.ok(err);
    }
  }
}

async function testCreateReadStream() {
  await client.batch()
    .put('key1', 'value1')
    .put('key2', 'value2')
    .put('key3', 'value3')
    .put('key4', 'value4')
    .put('key5', 'value5')
    .put('key6', 'value6')
    .put('key7', 'value7')
    .put('key8', 'value8')
    .write()

  return new Promise((resolve, reject) => {
    let i = 1;
    client.createReadStream()
      .on('data', function (d) {
        assert.ok(d.key === 'key' + i.toString());
        assert.ok(d.value === 'value' + i.toString());
        ++i;
      })
      .on('close', resolve)
      .on('end', resolve)
      .on('error', reject)
  });
}

async function testCreateKeyStream() {
  await client.batch()
    .put('key1', 'value1')
    .put('key2', 'value2')
    .put('key3', 'value3')
    .put('key4', 'value4')
    .put('key5', 'value5')
    .put('key6', 'value6')
    .put('key7', 'value7')
    .put('key8', 'value8')
    .write()

  return new Promise((resolve, reject) => {
    let i = 1;
    client.createKeyStream()
      .on('data', function (d) {
        assert.ok(d === 'key' + i.toString());
        ++i;
      })
      .on('close', resolve)
      .on('end', resolve)
      .on('error', reject)
  });
}

async function testCreateValueStream() {
  await client.batch()
    .put('key1', 'value1')
    .put('key2', 'value2')
    .put('key3', 'value3')
    .put('key4', 'value4')
    .put('key5', 'value5')
    .put('key6', 'value6')
    .put('key7', 'value7')
    .put('key8', 'value8')
    .write()

  return new Promise((resolve, reject) => {
    let i = 1;
    client.createValueStream()
      .on('data', function (d) {
        assert.ok(d === 'value' + i.toString());
        ++i;
      })
      .on('close', resolve)
      .on('end', resolve)
      .on('error', reject)
  });
}

(async function() {
  try {
    server.start();
    await testPut();
    await testGet();
    await testDel();
    await testBatch();
    await testChainedBatch();
    await testCreateReadStream();
    await testCreateKeyStream();
    await testCreateValueStream();
    client.close();
    server.forceShutdown();
  } catch(err) {
    client.close();
    server.forceShutdown();
    throw err;
  }
})();

