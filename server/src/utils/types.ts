export enum UserType {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
}

export enum SuspendType {
  SUSPEND = 'suspend',
  UNSUSPEND = 'unsuspend',
}

export enum ItemType {
  POST = 'post',
  FORUM = 'forum',
}

export enum AttachmentType {
  IMAGE = 'image',
  VIDEO = 'video',
  FILE = 'file',
}

export enum GroupChatRole {
  MEMBER = 'member',
  ADMIN = 'admin',
  OWNER = 'owner',
}

export enum MessageType {
  ONE_TO_ONE = 'one_to_one',
  GROUP = 'group',
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum AppointmentStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum ConsultancyType {
  INITIAL_CONSULTATION = 'InitialConsultation',
  FOLLOW_UP = 'FollowUp',
  EMERGENCY = 'Emergency',
}

export enum ScheduleStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  TEMPORARILY_UNAVAILABLE = 'TemporarilyUnavailable',
}

export enum ConsultancyStatus {
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum Role {
  MEMBER = 'member',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  GUEST = 'guest',
}

export enum LikeType {
  FORUM_ANSWER = 'forumAnswer',
  POST = 'post',
}

export enum CommentableType {
  FORUM_ANSWER = 'forumAnswer',
  POST = 'post',
}

export enum FeedbackType {
  GENERAL_FEEDBACK = 'GeneralFeedback',
  PRODUCT_REVIEW = 'ProductReview',
  SERVICE_REVIEW = 'ServiceReview',
}
