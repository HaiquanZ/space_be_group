const GroupService = require("../services/groupService")

module.exports = (app) => {
    const groupSrv = new GroupService();

    app.post('/create', async(req, res, next) =>{
        try{
            const {name, img, describe} = req.body;

            const user = {
                avt: req.body.user.avatar,
                name: req.body.user.name,
                id: req.body.user.id
            }
            const result = await groupSrv.CreateGroup({name, img, describe, user});
            return res.json(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    })
}