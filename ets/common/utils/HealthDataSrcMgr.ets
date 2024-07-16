import { BroadCast } from './BroadCast';
import Logger from './Logger';

const APP_KEY_GROUP_DATA_SOURCE_MANAGER = 'app_key_group_data_source_manager';

export class HealthDataSrcMgr {
  private broadCast: BroadCast;

  constructor() {
    Logger.debug('HealthDataSourceManager', 'constructor');
    this.broadCast = new BroadCast();
  }

  public static getInstance(): HealthDataSrcMgr {
    if (!AppStorage.Get<HealthDataSrcMgr>(APP_KEY_GROUP_DATA_SOURCE_MANAGER)) {
      AppStorage.SetOrCreate<HealthDataSrcMgr>(APP_KEY_GROUP_DATA_SOURCE_MANAGER, new HealthDataSrcMgr());
    }
    let healthDataSrcMgr = AppStorage.Get<HealthDataSrcMgr>(APP_KEY_GROUP_DATA_SOURCE_MANAGER);
    return healthDataSrcMgr ? healthDataSrcMgr : new HealthDataSrcMgr();
  }

  public getBroadCast(): BroadCast {
    return this.broadCast;
  }
}

