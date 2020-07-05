const Tape = require('tape')
const Sinon = require('sinon')
const Proxyquire = require('proxyquire').noCallThru()
const Clipboardy = require('clipboardy')
const { Parser } = require('tsv')

function pre () {
  const ctx = {}
  const fs = { readFileSync () {} }

  ctx.sanbox = Sinon.createSandbox()
  ctx.fsMock = ctx.sanbox.mock(fs)
  ctx.readClipboardStub = ctx.sanbox.stub(Clipboardy, 'read')
  ctx.parseStub = ctx.sanbox.stub(Parser.prototype, 'parse')

  ctx.parse = Proxyquire('../lib/parse', { fs })

  return ctx
}

function post (ctx) {
  ctx.sanbox.verifyAndRestore()
}

Tape('empty clipboard with headers', async t => {
  const ctx = pre()

  const { parse, readClipboardStub, fsMock, parseStub } = ctx

  readClipboardStub.resolves()
  fsMock.expects('readFileSync').never()
  parseStub.returns('test')

  const output = await parse({ f: '' })
  t.equals(output, 'test')
  t.ok(readClipboardStub.calledOnce, 'readClipboardStub called once')
  t.ok(parseStub.calledOnce, 'parseStub called once')

  post(ctx)
  t.end()
})

Tape('happy path clipboard with headers', async t => {
  const ctx = pre()

  const { parse, readClipboardStub, fsMock, parseStub } = ctx

  readClipboardStub.resolves('table')
  fsMock.expects('readFileSync').never()
  parseStub.returns('test')

  const output = await parse({ f: '' })
  t.equals(output, 'test')
  t.ok(readClipboardStub.calledOnce, 'readClipboardStub called once')
  t.ok(parseStub.calledOnce, 'parseStub called once')

  post(ctx)
  t.end()
})

Tape('happy path clipboard with no headers', async t => {
  const ctx = pre()

  const { parse, readClipboardStub, fsMock, parseStub } = ctx

  readClipboardStub.resolves('table')
  fsMock.expects('readFileSync').never()
  parseStub.returns('test')

  const output = await parse({ n: true, f: '' })
  t.equals(output, 'test')
  t.ok(readClipboardStub.calledOnce, 'readClipboardStub called once')
  t.ok(parseStub.calledOnce, 'parseStub called once')

  post(ctx)
  t.end()
})

Tape('happy path file with headers', async t => {
  const ctx = pre()

  const { parse, readClipboardStub, fsMock, parseStub } = ctx

  fsMock.expects('readFileSync').once().returns('table')
  parseStub.returns('test')

  const output = await parse({ n: true, f: 'asd' })
  t.equals(output, 'test')
  t.ok(readClipboardStub.notCalled, 'readClipboardStub not called')
  t.ok(parseStub.calledOnce, 'parseStub called once')

  post(ctx)
  t.end()
})
