import os from 'os'

export const obtainIp = (): string | null => {
  const interfaces = os.networkInterfaces()
  for(const interfaceName in interfaces) {
    for(const iFace of interfaces[interfaceName]!) {
      if (iFace.family === "IPv4" && !iFace.internal) {
        return iFace.address
      }
    }
  }
  return null
}
