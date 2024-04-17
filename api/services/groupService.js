const { GroupModel } = require("../models");

class GroupService {
    async CreateGroup(data){
        try{
            const group = new GroupModel({
                name: data.name,
                img: data.img,
                describe: data.describe,
                members: [
                    { avt: data.user.avt, name: data.user.name, id: data.user.id, isAdmin: true}
                ]
            });

            const result = group.save();
            return result;
        }catch(err){
            console.log(err);
            next(err);
        }
    }
}

module.exports = GroupService;