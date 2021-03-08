import * as React from "react"
import dynamic from "next/dynamic"

const PdfViewer = dynamic(() => import("components/PdfViewer"), { ssr: false })

const Program = () => {
  return (
    <div className="w-full">
      <PdfViewer url="/pdfs/2021 Full Cover Gala Program.pdf" width={300} />
    </div>
  )
}

export default Program
