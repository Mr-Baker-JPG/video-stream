import * as React from "react"
import Switch from "react-switch"

const ActivateLiveStreamSwitch = ({ socket }) => {
  const [isActive, setIsActive] = React.useState(false)

  const handleActivateToggle = () => {
    setIsActive(current => !current)
  }

  return (
    <label className="flex flex-row items-center space-x-2">
      <span>Activate:</span>
      <Switch onChange={handleActivateToggle} checked={isActive} />
    </label>
  )
}

export default ActivateLiveStreamSwitch
