declare class Store {
    price: number;
    counter: number;
    activeApp: string;
    apps: any[];
    isMounted: any;
    constructor();
    get total(): number;
    increment(): void;
    decrement(): void;
    setActiveApp(name: any): void;
    setApps(apps: any): void;
    setIsMounted(isMounted: any): void;
}
export default Store;
export declare const store: Store;
