import { gql } from '@apollo/client';

export const UPDATE_NOTIFICATION_MUTATION = gql`
  mutation UpdateNotification($updateNotificationInput: UpdateNotificationInput!) {
    updateNotification(updateNotificationInput: $updateNotificationInput) {
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
`;
