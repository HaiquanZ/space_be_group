const GroupService = require("../services/groupService");
const PostService = require('../services/postService');

module.exports = (app) => {
  const groupSrv = new GroupService();
  const postSrv = new PostService();

  app.post("/create", async (req, res, next) => {
    try {
      const { name, img, describe } = req.body;

      const user = {
        avt: req.body.user.avatar,
        name: req.body.user.name,
        id: req.body.user.id,
      };
      const result = await groupSrv.CreateGroup({ name, img, describe, user });
      return res.status(201).json({
        status: "success",
        data: {
          message: "Group created successfully!",
          group: result,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.delete("/", async (req, res, next) => {
    try {
        const result = await groupSrv.DeleteGroup({ groupId: req.query.groupId});

        if (result.deletedCount) {
          return res.status(200).json({
            status: "success",
            data: {
              message: "Delete group successfully!"
            },
          });
        }else{
          return res.status(404).json({
            status: "fail",
            data: {
              message: "Delete group failed or group is not existed!"
            },
          });
        }

    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.post("/add-member", async (req, res, next) => {
    try {
      //console.log(req.body.userId[0]);
      let users = [];
      users = req.body.users;

      const result = await groupSrv.AddMember({
        groupId: req.body.groupId,
        users,
      });
      if (result) {
        return res.status(201).json({
          status: "success",
          data: {
            message: "Add member successfully!",
          },
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.get('/member', async (req, res, next) => {
    try{
      const group = await groupSrv.GetDetailGroup({groupId: req.body.groupId});
      const { size, page} = req.body;
      //handle paging
      let members = [];
      if(size*(page - 1) <= group.members.length && group.members.length != 0){
        for(let i = size*(page - 1); i < size*page; i++){
          if(i < group.members.length){
            members.push(group.members[i]);
          }
        }
      }

      return res.status(200).json({
        status: "success",
        data: {
          totalRecord: group.members.length,
          totalPage: Math.ceil((group.members.length) / size),
          page: page,
          members
        }
      });
    }catch (err) {
      console.log(err);
      next(err);
    }
  })

  app.delete('/member', async (req, res, next) => {
    try{
      const group = await groupSrv.GetDetailGroup(req.query);
      let indexToRemove = -1;
      for(let i=0; i < group.members.length; i++){
        if(group.members[i].id == req.query.userId){
          indexToRemove = i;
          break;
        }
      }

      if(indexToRemove == undefined) {
        return res.status(404).json({
          status: 'fail',
          data: {
            message: "This user is not exist in group."
          }
        })
      }else{
        group.members.splice(indexToRemove, 1);
        const result = await groupSrv.UpdateGroup(group, req.query.groupId);
        // console.log('result: ', result);

        return res.status(200).json({
          staus: 'success',
          data: {
            result
          }
        })
      }
    }catch (err) {
      console.log(err);
      next(err);
    }
  })

  app.get('/', async (req, res, next) => {
    try{
      const groups = await groupSrv.GetListGroup({
        id: req.query.id
      });
      const { size, page} = req.query;
      //handle paging
      let members = [];
      if(size*(page - 1) <= groups.length && groups.length != 0){
        for(let i = size*(page - 1); i < size*page; i++){
          if(i < groups.length){
            members.push(groups[i]);
          }
        }
      }

      return res.status(200).json({
        status: "success",
        data: {
          totalRecord: groups.length,
          totalPage: Math.ceil((groups.length) / size),
          page: page,
          groups: members
        }
      });
    }catch (err) {
      console.log(err);
      next(err);
    }
  })

  app.get('/detail', async(req, res, next) => {
    try{
      const result = await groupSrv.GetDetailGroup({groupId: req.query.groupId});
      return res.status(200).json({
        status: "success",
        data: {
          group: result
        }
      })
    }catch(err){
      console.log(err);
      next(err);
    }
  })

  app.get('/members-post', async(req, res, next) => {
    try{
      const tmp = await postSrv.GetDetailPost({ postId: req.query.postId});
      const result = await groupSrv.GetDetailGroup({ groupId: tmp.idGroup});
      return res.status(200).json({
        status: "success",
        data: {
          members: result.members
        }
      });
    }catch(err){
      console.log(err);
      next(err);
    }
  })
};
