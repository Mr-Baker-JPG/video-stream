import PauseIcon from "components/icons/Pause"

const PauseButton = ({ onClick }) => (
  <button onClick={onClick}>
    <PauseIcon className="w-6 h-6" />
  </button>
)

export default PauseButton
