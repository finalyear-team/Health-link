import { gql } from '@apollo/client';

export const CREATE_FORUM_POST = gql`
mutation CreateForumPost($createForumPostInput: CreateForumInput!) { CreateForumPost(createForumInput: $createForumPostInput) {
          ForumPostID,
                 
}
}
`;
export const CREATE_FORUM_ANSWER = gql`
mutation CreateForumAnswer($input: CreateForumAnswerInput!) {
  CreateForumAnswer(createForumAnswerInput: $input) {
ForumPostID
  Answer
  UserID

  }
}
`;


export const CREATE_EMERGENCY_APPOINTMENT = gql`
mutation CreateEmergencyAppointment($input: EmergencyAppointmentInput!) {
  CreateEmergencyAppointment(emergencyAppointmentInput: $input) {
  AppointmentID
  DoctorID
  PatientID
  ScheduleID
  AppointmentDate
  AppointmentTime
  VideoChatRoomID
  Duration
  Status
  AppointmentType
    Note  
  }
}
`;
export const ACCEPT_APPOINTMENT = gql`
mutation AcceptAppointment($AppointmentID:String!,$DoctorID: String!,$Duration:Int!) {
    AcceptAppointment(DoctorID: $DoctorID,AppointmentID:$AppointmentID,Duration:$Duration) {
    AppointmentID
    DoctorID
    PatientID
    ScheduleID
    AppointmentDate
    AppointmentTime
    VideoChatRoomID
    Duration
    Status
    AppointmentType
    Note  

   
  }
}
`;

export const REMOVE_APPOINTMENT = gql`
mutation RemoveAppointment($Id: Int!) {
  RemoveAppointment(Id: $Id) {
  AppointmentID
  DoctorID
  PatientID
  ScheduleID
  AppointmentDate
  AppointmentTime
  VideoChatRoomID
  Duration
  Status
  AppointmentType
  Note  
  }
}
`;