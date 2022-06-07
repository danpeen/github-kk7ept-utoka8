export declare const injectBaseReactRefresh: () => void;
export declare const provider: () => {
    render: ({ dom, basename }: {
        dom: any;
        basename: any;
    }) => void;
    destroy: ({ dom }: {
        dom: any;
    }) => void;
};
