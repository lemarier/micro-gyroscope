import test from 'ava'
import micro from 'micro'
import fetch from 'node-fetch'
import listen from 'test-listen'

import { api, save } from '../lib/server'
import cache from '../lib/cache'

import { username } from '../config'

let url, data
const app = micro(api)

test.before(async t => {
  url = await listen(app)
})

test('Server responds', async t => {
  const res = await fetch(url)
  t.is(res.status, 200)
  t.truthy(res)
})

test.serial('Extract gyrosco.pe data', async t => {
  data = await cache(username)
  save(data) // → save API cache
  t.truthy(data)
})

test.serial('Validate object', async t => {
  t.true('steps' in data)
  t.true('weight' in data)
  t.true('weightUnits' in data)
  t.true('heartRate' in data)
  t.true('heartRateUnits' in data)
})

test.serial('Micro API return extracted data', async t => {
  const res = await fetch(url)
  const value = await res.json()
  t.deepEqual(value, data)
  t.truthy(value)
})
