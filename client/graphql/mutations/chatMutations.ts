import { gql } from '@apollo/client';

export const DELETE_CHAT = gql`
mutation deleteChat($ChatID: String!) {
    deleteChat(ChatID: $ChatID) {
        ChannelID,    
        ChatID,
        Content,
        SenderID,
        MediaUrl,
        SentAt,
        IsSeen,
        sender{
          UserID
        },
  }
}
`

