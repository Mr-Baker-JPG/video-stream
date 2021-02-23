import PlayIcon from "components/icons/Play"

const PlayButton = ({ onClick }) => (
  <button onClick={onClick}>
    <PlayIcon className="w-6 h-6" />
  </button>
)

export default PlayButton
