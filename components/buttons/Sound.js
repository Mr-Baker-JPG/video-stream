import SoundIcon from "components/icons/Sound"

const SoundButton = ({ onClick }) => (
  <button onClick={onClick}>
    <SoundIcon className="w-6 h-6" />
  </button>
)

export default SoundButton
