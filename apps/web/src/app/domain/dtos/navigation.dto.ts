export interface NavigationItemDto {
    id: string;
    label: string;
    type?: "core" | "custom";
    children?: NavigationItemDto[];
}

export interface NavigationConfigDto {
    items: NavigationItemDto[];
}
