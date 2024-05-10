import getXPath from './main'
describe('node is Element', () => {
  test.each([
    {
      name: 'single element',
      input: '<div><p data-target></p></div>',
      expected: '/html/body/div/p'
    },
    {
      name: 'single element where tow sides has different nodes',
      input: '<div>text<span></span><p data-target></p>text<span></span></div>',
      expected: '/html/body/div/p'
    },
    {
      name: 'multiple element',
      input: '<div><p></p><p data-target></p></div>',
      expected: '/html/body/div/p[2]'
    },
    {
      name: 'multiple element where siblings has different nodes',
      input: '<div>text<span></span><p></p>text<span></span><p data-target></p>text<span></span></div>',
      expected: '/html/body/div/p[2]'
    },
    {
      name: 'has id',
      input: '<div>text<span></span><p></p>text<span></span><p data-target id="target"></p>text<span></span></div>',
      expected: '//*[@id="target"]'
    },
  ])('$name', (data) => {
    document.body.innerHTML = data.input
    const elTarget = document.querySelector('[data-target]') as Node
    expect(getXPath(elTarget)).toEqual(data.expected)
    expect(document.createExpression(data.expected).evaluate(document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue).toEqual(elTarget)
  })
})

describe('node is Text', () => {
  test.each([
    {
      name: 'single text',
      input: '<div><p data-target data-position="0">text</p></div>',
      expected: '/html/body/div/p/text()'
    },
    {
      name: 'text where tow sides has different nodes',
      input: '<div><p data-target data-position="2">text <span></span> text <span></span> text </p></div>',
      expected: '/html/body/div/p/text()[2]'
    },
  ])('$name', (data) => {
    document.body.innerHTML = data.input
    const elTarget = document.querySelector('[data-target]') as HTMLElement
    const textNode = elTarget.childNodes[Number(elTarget.dataset.position)]
    expect(getXPath(textNode)).toEqual(data.expected)
    expect(document.createExpression(data.expected).evaluate(document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue).toEqual(textNode)
  })
})