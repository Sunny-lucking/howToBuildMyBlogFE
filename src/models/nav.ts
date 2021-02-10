export  interface NavigationProps {
    navList: navItem[],
    baseUrl: string,
    commonNavList:navItem[],
    onChange:(value:any)=> void
}
export interface navItem {
    category_url:string,
    label:string,
    _id: string,
    tags: any
}