const { GroupModel } = require("../models");

class GroupService {
  async CreateGroup(data) {
    try {
      const group = new GroupModel({
        name: data.name,
        img: data.img,
        describe: data.describe,
        members: [
          {
            avt: data.user.avt,
            name: data.user.name,
            id: data.user.id,
            isAdmin: true,
          },
        ],
      });

      const result = group.save();
      return result;
    } catch (err) {
      console.log(err);
      //next(err);
    }
  }

  async UpdateGroup(data, groupId){
    try{
      console.log('------', data)
      const result = GroupModel.updateOne(
        { _id: groupId },
        { $set: data }
      ).exec();
      return result;
    }catch(err){
      console.error(err);
      //next(err);
    }
  }

  async DeleteGroup(data) {
    try{
        const result = GroupModel.deleteOne(
          { _id: data.groupId }
        )

        return result;
    }catch (err){
      console.log(err);
      //next(err);
    }
  }

  async AddMember(data) {
    try {
      const result = GroupModel.findOneAndUpdate(
        { _id: data.groupId },
        { $push: { members: { $each: data.users } } },
        { new: true }
      );

      return result;
    } catch (err) {
      console.log(err);
      ////next(err);
    }
  }

  async GetDetailGroup(data){
    try{
      const group = GroupModel.findById(data.groupId);
      return group;
    }catch (err){
      console.log(err);
    }
  }

  async DeleteMember(data){
    try{
      const group = GroupModel.findById(data.groupId);
      console.log(group.json());
      // return result;
    }catch (err){
      console.log(err);
    }
  }
}

module.exports = GroupService;
