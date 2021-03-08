import ReactJson from "react-json-view"
import { VariableSizeList as List } from "react-window"

const SignalLogs = ({ logs = [] }) => {
  console.log(logs)
  return (
    <div className="p-2 border border-gray-300 shadow-lg">
      <h2 className="font-bold">Signal Logs</h2>

      <div className="overflow-x-scroll border-t h-96">
        {logs.map((log, i) => (
          <div key={i}>
            <span className="text-xss">
              [
              {`${log.time.getHours()}:${log.time.getMinutes()}:${log.time.getSeconds()}`}
              ]
            </span>{" "}
            <span className="text-sm">{log.event}</span>
            <span className="inline-block float-right mt-2 text-xss">
              {log.args[0].email}
            </span>{" "}
            <ReactJson collapsed={true} src={log.args[0]} />
          </div>
        ))}
      </div>
    </div>
  )
}

const Row = ({ index, style }) => <div style={style}>Row {index}</div>

export default SignalLogs
