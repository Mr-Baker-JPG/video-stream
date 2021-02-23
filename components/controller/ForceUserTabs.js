import * as React from "react"

const ForceUserTabs = ({ onToggle }) => {
  const [controlledTab, setControlledTab] = React.useState(0)

  const handleControlledTabSelect = id => {
    setControlledTab(id)
    onToggle(id)
  }

  return (
    <div className="flex flex-row items-center pr-4 space-x-2">
      <h2>Force User Tabs: </h2>
      <div className="grid grid-cols-1 gap-2 mb-2 text-sm sm:grid-cols-3 ">
        <div
          onClick={() => handleControlledTabSelect(0)}
          className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md  cursor-pointer hover:opacity-90 ${
            controlledTab === 0 && "opacity-80"
          }`}
        >
          <p>LiveStream</p>
        </div>
        <div
          onClick={() => handleControlledTabSelect(1)}
          className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md  cursor-pointer hover:opacity-90 ${
            controlledTab === 1 && "opacity-80"
          }`}
        >
          Program
        </div>
        <div
          onClick={() => handleControlledTabSelect(2)}
          className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md  cursor-pointer hover:opacity-90 ${
            controlledTab === 2 && "opacity-80"
          }`}
        >
          Donate
        </div>
      </div>
    </div>
  )
}

export default ForceUserTabs
