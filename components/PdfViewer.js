import * as React from "react"

const PdfViewer = ({ url, width }) => {
  return (
    <iframe
      src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=c3ava223f2"
      width="100%"
      height="480"
      seamless="seamless"
      scrolling="no"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  )
}

export default PdfViewer

// const PdfViewer = ({ url, width }) => {

//   // const [numPages, setNumPages] = React.useState(null)
//   // const [pageNumber, setPageNumber] = React.useState(1)

//   // function onDocumentLoadSuccess({ numPages }) {
//   //   setNumPages(numPages)
//   //   setPageNumber(1)
//   // }

//   // function changePage(offset) {
//   //   setPageNumber(prevPageNumber => prevPageNumber + offset)
//   // }

//   // function previousPage() {
//   //   changePage(-1)
//   // }

//   // function nextPage() {
//   //   changePage(1)
//   // }

//   // return (
//   //   <div className="">
//   //     <Document
//   //       file={url}
//   //       onLoadSuccess={onDocumentLoadSuccess}
//   //       style={{ minHeight: "620px" }}
//   //     >
//   //       <Page size={"letter"} pageNumber={pageNumber} />
//   //     </Document>
//   //     <div>
//   //       <p>
//   //         Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
//   //       </p>
//   //       <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
//   //         Previous
//   //       </button>
//   //       <button
//   //         type="button"
//   //         disabled={pageNumber >= numPages}
//   //         onClick={nextPage}
//   //       >
//   //         Next
//   //       </button>
//   //     </div>
//   //   </div>
//   // )
// }

// export default PdfViewer
