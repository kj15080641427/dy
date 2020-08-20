import initialize from './saga';
import permission from '../containers/home/content/subpages/System/redux/saga'
import management from '../containers/home/redux/saga' //后台管理
export const sagaList = [initialize, permission,management] 