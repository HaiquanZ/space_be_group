const GroupService = require("../services/groupService");

module.exports = (app) => {
  const groupSrv = new GroupService();

  app.post("/create", async (req, res, next) => {
    try {
      const { name, img, describe } = req.body;

      const user = {
        avt: req.body.user.avatar,
        name: req.body.user.name,
        id: req.body.user.id,
      };
      const result = await groupSrv.CreateGroup({ name, img, describe, user });
      return res.json({
        status: 'success',
        data: {
            message: 'Group created successfully!',
            group: result
        }
      });
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
};
