import relationalStore from "@ohos:data.relationalStore";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import RdbUtils from "@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import UserProfile from "@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo";
class UserInfoApi {
    insertUserInfo(userInfo: UserProfile, callback: Function): void {
        const valueBucket = generateBucketProfile(userInfo);
        RdbUtils.insert('userInfo', valueBucket).then(result => {
            callback(result);
        });
    }
    query(userID: number, callback: Function): void {
        let tableName = Const.USER_PROFILE_INFO.tableName;
        if (!tableName) {
            return;
        }
        // 创建查询谓词对象
        let predicates = new relationalStore.RdbPredicates(tableName);
        predicates.equalTo('userID', userID);
        // 执行查询
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0 || typeof count === 'string') {
                Logger.error('UserProfileTable', `userID ${userID} query no results!`);
                const result: UserProfile[] = [];
                callback(result);
            }
            else {
                resultSet.goToFirstRow();
                let userProfile = new UserProfile(resultSet.getDouble(resultSet.getColumnIndex('userID')), resultSet.getString(resultSet.getColumnIndex('nickname')), resultSet.getString(resultSet.getColumnIndex('signature')), resultSet.getString(resultSet.getColumnIndex('gender')), resultSet.getString(resultSet.getColumnIndex('birthdate')), resultSet.getString(resultSet.getColumnIndex('Height')), resultSet.getString(resultSet.getColumnIndex('Weight')));
                callback(userProfile);
            }
        });
    }
    updateUserProfile(profile: UserProfile, callback: Function): void {
        const valueBucket = generateBucketProfile(profile);
        let tableName = Const.USER_PROFILE_INFO.tableName;
        if (!tableName) {
            return;
        }
        let predicates: relationalStore.RdbPredicates = new relationalStore.RdbPredicates(tableName);
        predicates.equalTo('userID', profile.userID); // 使用 userID 作为唯一标识符
        RdbUtils.update(valueBucket, predicates).then((result: number) => {
            callback(result);
        });
    }
}
function generateBucketProfile(profile: UserProfile): relationalStore.ValuesBucket {
    let valueBucket = {} as relationalStore.ValuesBucket;
    Const.USER_PROFILE_INFO.columns?.forEach((item: string) => {
        switch (item) {
            case 'userID':
                valueBucket[item] = profile.userID;
                break;
            case 'nickname':
                valueBucket[item] = profile.nickname;
                break;
            case 'gender':
                valueBucket[item] = profile.gender;
                break;
            case 'birthdate':
                valueBucket[item] = profile.birthdate;
                break;
            case 'Height':
                valueBucket[item] = profile.Height;
                break;
            case 'Weight':
                valueBucket[item] = profile.Weight;
                break;
            default:
                break;
        }
    });
    return valueBucket;
}
let userInfoApi = new UserInfoApi();
export default userInfoApi as UserInfoApi;
