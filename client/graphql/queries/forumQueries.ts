import { gql } from "@apollo/client";

export const GET_FORUM_POSTS = gql`
   query GetForumPosts($Query:String){
    GetForumPosts(Query:$Query){
    ForumPostID,
    ForumPostID
    Title
    Question
    CreatedAt
    UpdatedAt
    Author{
        UserID,
        Username, 
        FirstName,
        LastName,
        ProfilePicture,
        Role
    }
    }
       
   }

`


export const GET_FORUM_POST = gql`
   query GetForumPost($ForumPostID:String!){
    GetForumPost(ForumPostID:$ForumPostID){
    ForumPostID
    Title
    Question
    CreatedAt
    UpdatedAt
    Author{
        UserID,
        Username, 
        FirstName,
        LastName,
        ProfilePicture,
        Role
    },
    }       
   }
`

export const GET_FORUM_ANSWER = gql`
   query GetForumAnswers($ForumPostID:String!){
    GetForumAnswers(ForumPostID:$ForumPostID){     
ForumPostID
  ForumAnswerID
  Answer
  UserID
  CreatedAt
  Comments{
    CommentID
  }
  CommentsCount
  Author{
        UserID
        Username
        FirstName
        LastName
        ProfilePicture
        Role
    }
  Likes

    }
   }

`