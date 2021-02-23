import * as React from "react"
import Switch from "react-switch"

const ForcePlaySwitch = ({ onToggle }) => {
  const [isForcePlay, setIsForcePlay] = React.useState(false)

  const handleForcePlayToggle = () => {
    setIsForcePlay(current => !current)
    onToggle(!isForcePlay)
  }

  return (
    <label className="flex flex-row items-center space-x-2">
      <span>Force Play:</span>
      <Switch onChange={handleForcePlayToggle} checked={isForcePlay} />
    </label>
  )
}

export default ForcePlaySwitch
