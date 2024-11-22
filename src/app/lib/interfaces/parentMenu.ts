export interface ParentMenuItem {
  id: number;
  title: string;
  routerLink: string;
  icon: string;
  hasSubMenu: boolean;
  parentId: number;
  claimNames: string[];
}
