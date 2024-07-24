import { gql } from "@apollo/client";

export const GET_USER_NOTIFICATION = gql`
      query UserNotification($UserID:String!){
        UserNotification(UserID:$UserID){
            NotificationID
            UserID
            Message
            CreatedAt
            ReadAt
            Status
            NotificationType
            UpdatedAt
        }
      }
`