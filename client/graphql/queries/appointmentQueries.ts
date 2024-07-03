import { gql } from '@apollo/client';


export const GET_USER_APPOINTMENTS = gql`
query GetUserAppointments($userID: String!) {
  UserAppointments(UserID: $userID) {
    upcomingAppointments{
      AppointmentID
      DoctorID
      PatientID
      ScheduleID
      AppointmentDate
      AppointmentTime
      PatientName
      PatientPhoto
      PatientGender
      DoctorGender
      DoctorName
      DoctorPhoto
      Duration
      Status
      AppointmentType
      Note
    },
    pastAppointments{
      AppointmentID
      DoctorID
      PatientID
      ScheduleID
      AppointmentDate
      AppointmentTime
      Duration
      DoctorName
      DoctorPhoto
      Status
      AppointmentType
      Note
    }
    
  }
}
`;

// export const GET_DOCTOR_APPOINTMENTS = gql`
//    query  GetDoctorAppointments($DoctorID:String!){
//        DoctorsAppointments(DoctorID:$DoctorID){
//         AppointmentID
//         DoctorID
//         PatientID
//         ScheduleID
//         AppointmentDate
//         AppointmentTime
//         Duration
//         Status
//         AppointmentType
//         Note
//        }
//    }
// `



export const FILTER_APPOINTMENTS = gql`
query FilterAppointments($filterQuery: String) {
  FilterAppoinments(Query: $filterQuery) {
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

export const FILTER_USER_APPOINTMENTS = gql`
query FilterAppointments($UserID:String!,$filterQuery: String) {
  FilterAppoinments(UserID:$UserID,Query: $filterQuery) {
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
export const FILTER_DOCTOR_APPOINTMENTS = gql`
query FilterAppointments($DoctorID:String!,$filterQuery: String) {
  FilterAppoinments(DoctorID:$DoctorID,Query: $filterQuery) {
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