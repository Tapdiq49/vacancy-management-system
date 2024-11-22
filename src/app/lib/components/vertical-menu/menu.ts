import { Menu } from "../../interfaces/menu.model";

export const verticalMenuItems = [
  new Menu (200, 'Vakansiya', '/vacancies', 'work',  true, 0, ['Guest_Get', 'Admin_Get']),
  new Menu (201, 'Vakansiyaların siyahısı', '/vacancies/vacancies_list', 'arrow_right',  false, 200, ['Guest_Get']),
  new Menu (202, 'Müraciətlər', '/vacancies/results', 'arrow_right',  false, 200, ['Admin_Get']),
]
