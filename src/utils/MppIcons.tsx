import { ReactComponent as pen } from '../ressources/icons/pen.svg';
import { ReactComponent as logo } from '../ressources/icons/logo.svg';
import { ReactComponent as graph } from '../ressources/icons/graph.svg';
import { ReactComponent as help } from '../ressources/icons/help.svg';
import { ReactComponent as map } from '../ressources/icons/map.svg';
import { ReactComponent as ressources } from '../ressources/icons/ressources.svg';
import { ReactComponent as trophee } from '../ressources/icons/trophee.svg';
import { ReactComponent as goldTrophee } from '../ressources/icons/coupe_or.svg';
import { ReactComponent as silverTrophee } from '../ressources/icons/coupe_argent.svg';
import { ReactComponent as bronzeTrophee } from '../ressources/icons/coupe_bronze.svg';
import { ReactComponent as history } from '../ressources/icons/history.svg';
import { ReactComponent as logOut } from '../ressources/icons/logout.svg';
import { ReactComponent as burgerMenu } from '../ressources/icons/burgerMenu.svg';
import { ReactComponent as training } from '../ressources/icons/training.svg';
import { ReactComponent as users } from '../ressources/icons/users.svg';
import { ReactComponent as target } from '../ressources/icons/target.svg';
import { ReactComponent as chart } from '../ressources/icons/chart.svg';
import { ReactComponent as school } from '../ressources/icons/school.svg';
import { ReactComponent as cloud } from '../ressources/icons/cloud.svg';
import { ReactComponent as drops } from '../ressources/icons/drops.svg';
import { ReactComponent as trash } from '../ressources/icons/trash.svg';
import { ReactComponent as openBook } from '../ressources/icons/open_book.svg';
import { ReactComponent as infos } from '../ressources/icons/Info.svg';
import { ReactComponent as copy } from '../ressources/icons/copy.svg';
import { ReactComponent as remove } from '../ressources/icons/remove.svg';
import { ReactComponent as flag_fr } from '../ressources/icons/flag_fr.svg';
import { ReactComponent as flag_en } from '../ressources/icons/flag_en.svg';
import { ReactComponent as flag_es } from '../ressources/icons/flag_es.svg';
import { ReactComponent as flag_de } from '../ressources/icons/flag_de.svg';
import { ReactComponent as flag_it } from '../ressources/icons/flag_it.svg';
import { ReactComponent as arrowBack } from '../ressources/icons/arrow_back.svg';

export const MppIcons = {
  pen: pen,
  logo: logo,
  graph: graph,
  help: help,
  map: map,
  ressources: ressources,
  trophee: trophee,
  goldTrophee: goldTrophee,
  silverTrophee: silverTrophee,
  bronzeTrophee: bronzeTrophee,
  history: history,
  logOut: logOut,
  burgerMenu: burgerMenu,
  training: training,
  users: users,
  target: target,
  chart: chart,
  school: school,
  cloud: cloud,
  drops: drops,
  trash: trash,
  openBook: openBook,
  infos: infos,
  copy: copy,
  remove: remove,
  flag_fr: flag_fr,
  flag_en: flag_en,
  flag_es: flag_es,
  flag_de: flag_de,
  flag_it: flag_it,
  arrowBack: arrowBack,
} as const;

export const getIconFromName = (iconName?: string) => MppIcons[iconName];
