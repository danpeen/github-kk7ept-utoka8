/**
 * 若子应用共享组件 shared react、react-dom 的依赖，则 react 和 react-dom 会以动态加载 js 的方式加载，
 * 此时需要异步导出 provider，不支持同步加载，否则同步执行后 garfish 将拿不到 provider
 */
export declare const provider: () => Promise<{
    render: ({ dom, basename }: {
        dom: any;
        basename: any;
    }) => void;
    destroy: ({ dom }: {
        dom: any;
    }) => void;
}>;
