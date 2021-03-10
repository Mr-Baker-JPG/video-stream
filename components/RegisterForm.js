import React from "react"
import { loadScript, loadCss } from "../lib/donate"

function RegisterForm() {
  const [loaded, setLoaded] = React.useState({
    customScripts: false,
  })

  React.useEffect(() => {
    loadScript({
      scriptUrl:
        "https://api.causeview.com/form/v2.1/scripts/jquery-1.5.1.min.js",
      id: "jQuery",
      callback: () => {
        loadScript({
          scriptUrl:
            "https://api.causeview.com/form/v2.1/scripts/crossdomain-nocon.js",
          id: "crossDomain",
          callback: () => {
            loadScript({
              scriptUrl:
                "https://api.causeview.com/form/v2.1/scripts/iframeResizer.min.js",
              id: "iframeResizer",
              callback: () => {
                setLoaded({ ...loaded, customScripts: true })
              },
            })
          },
        })
      },
    })
  }, [])

  React.useEffect(() => {
    if (loaded.customScripts) {
      var $cv = jQuery.noConflict()
      // $cv(document).ready(function () {
      //   $cv("#causeview_iframe iframe").iFrameResize()
      // })
      $cv(function () {
        var src =
          "https://api.causeview.com/form/v2.1/cupertino/wizard/a0J3c00000t1rFWEAY?fid=a0M37000000N2mK&lid=a0V1S000006hlei&cid=7011S0000006u7e"
        $cv("#causeview_iframe").loadCauseViewForm({
          src: src,
          api: "https://api.causeview.com",
          frame_height: "350px",
          applyQueryStrings: true,
        })
      })
    }
  }, [loaded])

  return (
    <div className="w-full p-8 border border-gray-300 ">
      <div id="causeview_iframe" className="actionpages-Container"></div>
    </div>
  )
}

export default RegisterForm
