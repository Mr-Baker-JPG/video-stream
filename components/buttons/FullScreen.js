import FullScreenIcon from "components/icons/FullScreen"

const FullScreenButton = ({ onClick }) => (
  <button onClick={onClick}>
    <FullScreenIcon className="w-6 h-6" />
  </button>
)

export default FullScreenButton
