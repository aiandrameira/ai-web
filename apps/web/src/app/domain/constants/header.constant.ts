interface IHeader {
    name: string;
    path: string;
    available?: boolean;
}

export const headerPaths: IHeader[] = [
    { name: "Docs", path: "/docs", available: true },
    { name: "Components", path: "/components", available: true },
    { name: "Themes", path: "/themes", available: false },
];
