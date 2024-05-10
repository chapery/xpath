export default function getXPath(node: Node) {
  let currentNode: Node | null = node
  const parts: string[] = []

  if (currentNode instanceof Element && currentNode.id) {
    return `//*[@id="${currentNode.id}"]`
  }
  
  while (currentNode && currentNode.nodeType !== Node.DOCUMENT_NODE) {
    let previousSiblingCount = 0
    let hasNextSibling = false
    let siblingNode: Node | null = currentNode

    do {
      siblingNode = siblingNode.previousSibling
      if (siblingNode?.nodeName === currentNode.nodeName) {
        previousSiblingCount++
      }
    } while (siblingNode)

    siblingNode = currentNode
    do {
      siblingNode = siblingNode.nextSibling
      if (siblingNode?.nodeName === currentNode.nodeName) {
        hasNextSibling = true
        break
      }
    } while (siblingNode)

    let elementPrefix = ''
    let localName = ''
    const nth = previousSiblingCount || hasNextSibling ? `[${previousSiblingCount + 1}]` : ''

    if (currentNode instanceof Element) {
      elementPrefix = currentNode.prefix ? currentNode.prefix + ':' : ''
      localName = currentNode.localName
    } else if (currentNode instanceof Text) {
      localName = 'text()'
    }

    parts.push(elementPrefix + localName + nth)
    currentNode = currentNode.parentNode
  }

  return parts.length ? '/' + parts.reverse().join('/') : ''
}
