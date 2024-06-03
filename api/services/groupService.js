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
    //check if Member is already exists
    const group = await GroupModel.findOne({_id: data.groupId}).lean();
    const check = group.members.find(item => item.id == data.users[0].id);
    if(check){
      throw new Error('User already exists in group');
    }
    //add member
    const result = GroupModel.findOneAndUpdate(
      { _id: data.groupId },
      { $push: { members: { $each: data.users } } },
      { new: true }
    );

    return result;
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
      // console.log(group.json());
      // return result;
    }catch (err){
      console.log(err);
    }
  }

  async GetListGroup(data){
    try{
      const groups = GroupModel.find({'members.id': data.id});
      return groups;
    }catch (err){
      console.log(err);
    }
  }
}

module.exports = GroupService;
