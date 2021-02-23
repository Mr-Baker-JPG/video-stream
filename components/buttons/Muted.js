import MutedIcon from "components/icons/Muted"

const MutedButton = ({ onClick }) => (
  <button onClick={onClick}>
    <MutedIcon className="w-6 h-6" />
  </button>
)

export default MutedButton
