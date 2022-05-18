/**
 * 若子应用共享组件 shared react、react-dom 的依赖，则 react 和 react-dom 会以动态加载 js 的方式加载，
 * 此时需要异步导出 provider，不支持同步加载，否则同步执行后 garfish 将拿不到 provider
*/
export const provider = async (...props) => {
  const exports = await import('./bootstrap')
  return exports.provider(...props)
}

// 若子应用共享组件未 shared 依赖，则可使用同步方式加载provider
// export { provider } from './bootstrap'

import("./bootstrap");
