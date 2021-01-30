import React from "react"
import { loadScript } from "../lib/donate"

function DonateForm() {
  const [loaded, setLoaded] = React.useState({
    thunderScripts: false,
    customScripts: true,
  })

  React.useEffect(() => {
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

        CVF.Init(
          "41302c9a-ebc3-49dc-9405-5bf6b2dca8b0",
          "cv_genform",
          null,
          "https://impactapi.causeview.com/Thunder/",
          "https://impactapi.causeview.com/Vortex/"
        )
      })
    }
  }, [loaded])

  //     <!-- Place these link and script tags in the pages <head> element to improve form loading time. -->
  // <!-- These links are for the forms CSS, removing them will cause the form not to be styled properly. -->
  // <link rel='stylesheet' href='https://impactapi.causeview.com/Thunder/Package/ThunderStylesSafe' type='text/css' />
  // <link rel='stylesheet' href='https://impactapi.causeview.com/Thunder/Package/CustomStyle/41302c9a-ebc3-49dc-9405-5bf6b2dca8b0' type='text/css' />

  // <!-- These scripts are used to generate the form on your page, removing them will cause the form not to load. -->
  // <script src='https://impactapi.causeview.com/Thunder/Package/ThunderScripts' type='text/javascript'></script>
  // <script src='https://impactapi.causeview.com/Thunder/Package/CustomScript/41302c9a-ebc3-49dc-9405-5bf6b2dca8b0' type='text/javascript'></script>

  // <!-- Place this above the container you want to hold the form. -->
  // <script type="text/javascript">
  //   $cvf(function () {
  //     CVF.Setup = {"Allocation": null, "RuntimeOverrides": []};
  //     CVF.Init("41302c9a-ebc3-49dc-9405-5bf6b2dca8b0", "cv_genform", null, "https://impactapi.causeview.com/Thunder/", "https://impactapi.causeview.com/Vortex/");
  //   });
  // </script>

  return (
    <div className="p-8 m-4 border border-gray-300">
      <p className="font-sans text-base font-normal leading-loose text-gray-600 ">
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
