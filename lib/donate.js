export const loadScript = ({
  scriptUrl,
  id = "script_" + Math.floor(Math.random() * 10000),
  callback,
}) => {
  // const existingScript = document.getElementById(id)
  const scriptExists =
    Boolean(document.getElementById(id)) ||
    Array.from(document.getElementsByTagName("script"))
      .map(t => t.src)
      .includes(scriptUrl)
  if (!scriptExists) {
    const script = document.createElement("script")
    script.src = scriptUrl
    script.id = id
    document.body.appendChild(script)
    script.onload = () => {
      if (callback) callback()
    }
  }
  if (scriptExists && callback) callback()
}

export const loadCss = ({
  scriptUrl,
  id = "css_" + Math.floor(Math.random() * 10000),
  callback,
}) => {
  const existingScript = document.getElementById(scriptUrl)
  if (!existingScript) {
    const script = document.createElement("link")
    script.href = scriptUrl
    script.id = scriptUrl
    script.type = "text/css"
    document.body.appendChild(script)
    script.onload = () => {
      if (callback) callback()
    }
  }
  if (existingScript && callback) callback()
}
