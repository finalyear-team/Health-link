import { gql } from '@apollo/client';


export const GET_USER_APPOINTMENTS = gql`
query GetUserAppointments($userID: String!) {
  UserAppointments(UserID: $userID) {
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



export const FILTER_APPOINTMENTS = gql`
query FilterAppointments($filterQuery: String) {
  FilterAppoinments(FilterQuery: $filterQuery) {
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



export const GET_APPOINTMENT_BY_ID = gql`
query GetAppointmentByID($id: String!) {
  GetAppointmentByID(Id: $id) {
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