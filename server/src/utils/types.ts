export enum UserType {
    doctor,
    patient,
    admin,
    moderator,
    organization
  }
  
  export enum UserStatus{
    active,
    inactive  , 
    suspended,
    blocked,
    deleted,  
  }
  
  export enum ItemType {
    post,
    forum
  }
  
  export enum AttachmentType {
    image,
    video,
    file
  }
  
  export enum GroupChatRole {
    member,
    admin,
    owner
  }
  
  export enum MessageType {
    one_to_one,
    group
  }
  
  export enum Gender {
    Male,
    Female
  }
  
  export enum AppointmentStatus {
    Scheduled,
    Completed,
    Cancelled
  }
  
  export enum ConsultancyType {
    InitialConsultation,
    FollowUp,
    Emergency
  }
  
  export enum ScheduleStatus {
    Active,
    Inactive,
    TemporarilyUnavailable
  }
  
  export enum ConsultancyStatus {
    Scheduled,
    Completed,
    Cancelled
  }
  
  export enum Role {
    member,
    moderator,
    admin,
    guest,
    banned
  }
  
  export enum LikeType {
    forumAnswer,
    post
  }
  
  export enum CommentableType {
    forumAnswer,
    post
  }
  export enum FeedbackType {
    GeneralFeedback,
    ProductReview,
    ServiceReview
  }