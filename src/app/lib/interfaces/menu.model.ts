export class Menu {
  constructor(
    public id: any,
    public title: string,
    public routerLink: string | null,
    public icon: string,
    public hasSubMenu: boolean,
    public parentId: number,
    public claimNames: string[]
  ) { }
}
