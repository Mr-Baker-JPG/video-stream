export const loadScript = ({
  scriptUrl,
  id = "script_" + Math.floor(Math.rand() * 10000),
  callback,
}) => {
  const existingScript = document.getElementById(scriptUrl)
  if (!existingScript) {
    const script = document.createElement("script")
    script.src = scriptUrl
    script.id = scriptUrl
    document.body.appendChild(script)
    script.onload = () => {
      if (callback) callback()
    }
  }
  if (existingScript && callback) callback()
}
