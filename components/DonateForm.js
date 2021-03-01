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
  const form = React.useRef()

  React.useEffect(() => {
    if (loaded.customScripts && loaded.thunderScripts) {
      window.$cvf(async function () {
        CVF.Setup = { Allocation: null, RuntimeOverrides: [{ wz: "1" }] }
        CVF.Setup.Allocation = CVF.CreateAllocationOverride(
          "",
          "a0M37000000N2mKEAS"
        )
        await CVF.Init(
          "34dbed70-83ad-4df9-abd8-93c4ccb6bf82",
          "cv_genform",
          null,
          "https://impactapi.causeview.com/Thunder/",
          "https://impactapi.causeview.com/Vortex/"
        )
        form = document.getElementById("cvfctrl224")
      })
    }
  }, [loaded])

  React.useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <div className="p-8 border border-gray-300 md:flex md:flex-row ">
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
        The St. Joseph Scholarship Fund provides financial assistance for a JPG
        family who would otherwise be unable to receive a Catholic classical
        education. Each year, more than 50% of our student body requires
        significant financial assistance in order to attend JPG. We believe
        that, as a Catholic school, our mission lies in serving and supporting
        our families as much as possible, regardless of their income level. We
        pursue this mission in faith, trusting in God's providence and in the
        generosity of our benefactors.
      </p>
      <div id="cv_genform" className=" loading"></div>
    </div>
  )
}

export default DonateForm
