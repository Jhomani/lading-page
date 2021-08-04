export const MENU_SIDEBAR_ROL = [
  {
    id: "ADM",
    url: "/admin/planes",
    name: 'admin'
  },
  {
    id: "ABG",
    url: "/app/calendario",
    name: 'abogado'
  },
  {
    id: "USER",
    url: "/app/calendario",
    name: 'user'
  },
];

export const role = {
  getTypeMenu: (userTypeId: string) => {
    const menuSelected = MENU_SIDEBAR_ROL.find((e) => e.id === userTypeId);
    return menuSelected?.name ?? "";
  },
  getUrl: (userType: string) => {
    const menuSelected = MENU_SIDEBAR_ROL.find((e) => e.id === userType);
    return menuSelected?.url ?? "/";
  },
};
