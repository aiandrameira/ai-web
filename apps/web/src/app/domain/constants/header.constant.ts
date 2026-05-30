interface IHeader {
    name: string;
    path: string;
    available?: boolean;
}

export const headerPaths: IHeader[] = [
    { name: "Blocks", path: "/blocks", available: false },
    { name: "Components", path: "/component", available: true },
    { name: "Themes", path: "/themes", available: false },
];
