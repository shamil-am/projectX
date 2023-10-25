export interface ICategoryNode {
    id: string;
    name: string;
    subCategories: ICategoryNode[] | [];
}
