import { gql } from '@apollo/client';

export const GET_CHANNELS = gql`
query UserChannel($userID: String!) {
    userChannel(UserID: $userID) {
        ChannelID
        ChannelName
        Image
        Description
        Disease
        ChannelType 
        CreatedAt 
        UpdatedAt
        Members{
            UserID,
            Username,
            FirstName,
            LastName,
            ProfilePicture
            Role,
        }
  }
}
`


export const GET_CHATS = gql`
query getChats($userID: String!,$ChannelID:String!) {
    getChats(UserID: $userID,ChannelID:$ChannelID) {
        ChannelID 
        ChatID
        Content
        SenderID
        MediaUrl
        SentAt 
        IsSeen
    
  }
}
`
