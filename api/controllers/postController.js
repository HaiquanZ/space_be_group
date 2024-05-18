const PostService = require("../services/postService");

module.exports = (app) => {
  const postSrv = new PostService();

  app.post("/post/create", async (req, res, next) => {
    try {
      const auth = {
        avt: req.body.user.avatar,
        name: req.body.user.name,
        id: req.body.user.id,
      };

      const result = await postSrv.CreatePost({
        auth: auth,
        content: req.body.content,
        groupId: req.body.groupId,
        isAssignment: req.body.isAssignment
      });

      return res.status(201).json({
        status: "success",
        data: {
          message: "Post created successfully!",
          group: result,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.delete('/post', async(req, res, next) => {
    try{
      const result = await postSrv.DeletePost({postId: req.body.postId});

      if (result.deletedCount) {
        return res.status(200).json({
          status: "success",
          data: {
            message: "Delete post successfully!"
          },
        });
      }else{
        return res.status(404).json({
          status: "fail",
          data: {
            message: "Delete post failed or post is not existed!"
          },
        });
      }
    }catch (err) {
      console.log(err);
      next(err);
    }
  })

  app.get('/post', async(req, res, next) => {
    try{
      const posts = await postSrv.GetPostByGroup({ groupId: req.query.groupId});
      const { size, page } = req.query;
      let data = [];
      if(size*(page - 1) <= posts.length && posts.length != 0){
        for(let i = size*(page - 1); i < size*page; i++){
          if(i < posts.length){
            data.push(posts[i]);
          }
        }
      }

      return res.status(200).json({
        status: "success",
        data: {
          totalRecord: posts.length,
          totalPage: Math.ceil((posts.length)/size),
          posts: data
        }
      });
    }catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.get('/post/detail', async(req, res, next) => {
    try{
      const result = await postSrv.GetDetailPost({postId: req.query.postId});
      return res.status(200).json({
        status: 'success',
        data: {
          post: result
        }
      })
    }catch (err) {
      console.log(err);
      next(err);
    }
  })

  app.post('/post/react', async(req, res, next) => {
    try{
      const result = await postSrv.ReactPost({
        isChecked: req.body.isChecked,
        postId: req.body.postId,
        user: {
          avt: req.body.user.avatar,
          id: req.body.user.id,
          name: req.body.user.name
        }
      });

      return res.status(200).json({
        status: "success",
        data: {
          message: result
        }
      });
    }catch (err) {
      console.log(err);
      next(err);
    }
  })

  app.post('/post/comment', async (req, res, next) => {
    try{
      const result = await postSrv.CreateComment({
        postId: req.body.postId,
        isReply: req.body.isReply,
        commentId: req.body.commentId ? req.body.commentId : null,
        comment: {
          content: req.body.content,
          auth: {
            avt: req.body.user.avatar,
            id: req.body.user.id,
            name: req.body.user.name
          }
        }
      });

      return res.status(201).json({
        status: "success",
        data: {
          message: 'Comment successfully!'
        }
      });
    }catch (err) {
      console.log(err);
      next(err);
    }
  });

  app.delete('/post/comment', async (req, res, next) => {
    try{
      const result = await postSrv.DeleteComment({
        postId: req.body.postId,
        isReply: req.body.isReply,
        commentId: req.body.commentId,
        replyId: req.body.replyId ? req.body.replyId : null
      })

      return res.status(200).json({
        status: 'success',
        data: {
          result
        }
      })
    }catch(err){
      console.log(err);
      next(err);
    }
  })

};
