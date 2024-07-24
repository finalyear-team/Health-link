import { UserStatus, UserType } from '@/types/types';
import { gql } from '@apollo/client';

export const CREATE_APPOINTMENT = gql`
mutation CreateAppointment($createAppointmentInput: CreateAppointmentInput!) {
  CreateAppointment(createAppointmentInput: $createAppointmentInput) {
  AppointmentID
  DoctorID
  PatientID
  ScheduleID
  AppointmentDate
  AppointmentTime
  DoctorName
  DoctorPhoto
  Duration
  Status
  AppointmentType
  Note  
}
}
`;
export const UPDATE_APPOINTMENT = gql`
mutation UpdateAppointment($updateAppointmentInput: UpdateAppointmentInput!) {
  UpdateAppointment(updateAppointmentInput: $updateAppointmentInput) {
  AppointmentID
  DoctorID
  PatientID
  ScheduleID
  AppointmentDate
  AppointmentTime
  Duration
  Status
  AppointmentType
  Note  
  
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
mutation AcceptAppointment($AppointmentID:String!,$DoctorID: String!,$Duration:Int!,$Status:AppointmentStatus!) {
    AcceptAppointment(DoctorID: $DoctorID,AppointmentID:$AppointmentID,Duration:$Duration,Status:$Status) {
    AppointmentID
    DoctorID
    PatientID
    ScheduleID
    AppointmentDate
    AppointmentTime
    Duration
    Status
    AppointmentType
    Note     
  }
}
`;

export const DECLINE_APPOINTMENT = gql`
  mutation DeclineAppointment($CancelledBy:String!,$AppointmentID:String!,$CancelledReason:String){
    DeclineAppointment(CancelledBy:$CancelledBy,AppointmentID:$AppointmentID,CancelledReason:$CancelledReason){
      AppointmentID
        DoctorID
        PatientID
        ScheduleID
        AppointmentDate
        AppointmentTime
        Duration
        Status
        AppointmentType
        Note   

    }
  }
`

export const REMOVE_APPOINTMENT = gql`
mutation RemoveAppointment($Id: String!) {
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