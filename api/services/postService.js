const { PostModel } = require("../models");

class PostService{
    async CreatePost(data){
        try{
            const post = new PostModel({
                content: data.content,
                idGroup: data.groupId,
                auth: data.auth,
                isAssignment: false,
                comments: [],
                reacts: []
            })

            const result = post.save();
            return result;
        }catch(e){
            console.log(e);
        }
    }

    async DeletePost(data){
        try{
            const result = await PostModel.deleteOne(
                { _id: data.postId }
            )
            return result;
        }catch(e){
            console.log(e);
        }
    }

    async GetPostByGroup(data){
        try{
            const posts = await PostModel.find({ idGroup: data.groupId});
            return posts;
        }catch(e){
            console.log(e);
        }
    }
    
    async ReactPost(data){
        try{
            if(data.isChecked){
                //handle react
                const post = await PostModel.find({ _id: data.postId });
                // console.log(post);
                for(let i=0; i < post[0].reacts.length;i++){
                    if(post[0].reacts[i].id == data.user.id){
                        return 'This person had reacted to this post.'
                    }
                }
                await PostModel.findOneAndUpdate(
                    { _id: data.postId },
                    { $push: { reacts: data.user}},
                    { new: true}
                )
                return 'Reacted to the post.';
            }else{
                //handle unreact
                await PostModel.updateOne(
                    { _id: data.postId },
                    { $pull: { reacts: data.user }}
                )
                return 'Unreacted to the post.';
            }
        }catch(e){  
            console.log(e);
        }
    }

    async CreateComment(data){
        try{
            if(data.isReply){
                const post = await PostModel.findOne({ _id: data.postId});
                if(!post){
                    return Error('Can not find post.');
                }
                //handle add reply
                for(let i=0; i<post.comments.length;i++){
                    if(data.commentId == post.comments[i]._id){
                        post.comments[i].replys.push(data.comment);
                        break;
                    }
                }
                // console.log(post);
                post.save();
                return post;
            }else{
                const result = await PostModel.findOneAndUpdate(
                    { _id: data.postId},
                    { $push: { comments: data.comment}},
                    { new: true }
                )
                return result;
            }
        }catch(e){
            console.log(e);
        }
    }
}
module.exports = PostService;