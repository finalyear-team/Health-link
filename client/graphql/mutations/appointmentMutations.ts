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
  VideoChatRoomID
  Duration
  Status
  AppointmentType
  Note  
}
}
`;
export const UPDATE_APPOINTMENT = gql`
mutation UpdateAppointment($input: UpdateAppointmentInput!) {
  UpdateSchedule(updateAppointmentInput: $input) {
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
mutation AcceptAppointment($DoctorID: String!) {
    AcceptAppointment(DoctorID: $DoctorID) {
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