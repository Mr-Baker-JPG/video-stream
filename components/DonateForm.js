import React from "react"
import { loadScript, loadCss } from "../lib/donate"

function DonateForm() {
  const [loaded, setLoaded] = React.useState({
    thunderScripts: false,
    customScripts: true,
  })

  React.useEffect(() => {
    loadScript({
      scriptUrl:
        "https://impact.causeview.com/Iris/Scripts/jquery-3.1.1.min.js",
      id: "jQuery",
      callback: () => {
        loadScript({
          scriptUrl:
            "https://impact.causeview.com/Iris/Scripts/bootstrap.min.js",
          id: "bootStrap",
          callback: () => {
            loadScript({
              scriptUrl:
                "https://impact.causeview.com/Iris/Scripts/iris_base.js?ver=637492758266996003",
              id: "iris_base",
            })
          },
        })
      },
    })
    loadScript({
      scriptUrl:
        "https://impactapi.causeview.com/Thunder/Package/ThunderScripts",
      id: "thunderScript",
      callback: () => {
        setLoaded({ ...loaded, thunderScripts: true })
      },
    })

    loadScript({
      scriptUrl:
        "https://impactapi.causeview.com/Thunder/Package/CustomScript/41302c9a-ebc3-49dc-9405-5bf6b2dca8b0",
      id: "customScripts",
      callback: () => {
        setLoaded({ ...loaded, customScripts: true })
      },
    })
  }, [])

  React.useEffect(() => {
    if (loaded.customScripts && loaded.thunderScripts) {
      window.$cvf(function () {
        CVF.Setup = { Allocation: null, RuntimeOverrides: [{ wz: "1" }] }
        CVF.Setup.Allocation = CVF.CreateAllocationOverride(
          "",
          "a0M37000000N2mKEAS"
        )
        CVF.Init(
          "34dbed70-83ad-4df9-abd8-93c4ccb6bf82",
          "cv_genform",
          null,
          "https://impactapi.causeview.com/Thunder/",
          "https://impactapi.causeview.com/Vortex/"
        )
      })
    }
  }, [loaded])

  return (
    <div className="p-8 m-4 border border-gray-300 md:flex md:flex-row ">
      <link
        rel="stylesheet"
        href="https://impactapi.causeview.com/Thunder/Package/ThunderStylesSafe"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://impactapi.causeview.com/Thunder/Package/CustomStyle/34dbed70-83ad-4df9-abd8-93c4ccb6bf82"
        type="text/css"
      />
      <p className="mb-8 font-sans text-sm font-normal leading-loose text-gray-600 lg:w-2/5 md:w-1/3 md:border-r md:mr-8 md:pr-8">
        As a nonprofit organization, John Paul the Great Academy relies on the
        support of its donors, who play a large part in both the present and the
        future of the Academy. Your gift today supports our innovative
        programming and education initiatives that build the leaders of
        tomorrow.
      </p>
      <div id="cv_genform" className="loading"></div>
    </div>
  )
}

export default DonateForm
