declare module '*.svg' {
  import React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
  export default ReactComponent
}

declare module '*.svg?url' {
  const content: string
  export default content
}
