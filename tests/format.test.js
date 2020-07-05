const Tape = require('tape')
const Sinon = require('sinon')
const AsciiTable = require('ascii-table')

function pre () {
  const ctx = {}
  const table = { setHeading () {}, addRow () {} }

  ctx.sanbox = Sinon.createSandbox()
  ctx.tableMock = ctx.sanbox.mock(table)
  ctx.asciiTable = ctx.sanbox.stub(AsciiTable, 'factory').returns(table)

  ctx.format = require('../lib/format')

  return ctx
}

function post (ctx) {
  ctx.sanbox.verifyAndRestore()
}

Tape('happy path with headers', t => {
  const ctx = pre()

  const { tableMock, format } = ctx
  tableMock.expects('setHeading').once()
  tableMock.expects('addRow').twice()

  const result = format([{ a: 1, b: 'a' }, { a: 2, b: 'b' }], { n: false })

  t.ok(result, 'got a table with header')

  post(ctx)
  t.end()
})

Tape('happy path with no headers', t => {
  const ctx = pre()

  const { tableMock, format } = ctx
  tableMock.expects('setHeading').never()
  tableMock.expects('addRow').twice()

  const result = format([{ a: 1, b: 'a' }, { a: 2, b: 'b' }], { n: true })

  t.ok(result, 'got a table with no headers')

  post(ctx)
  t.end()
})
