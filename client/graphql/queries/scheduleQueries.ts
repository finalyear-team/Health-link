import { gql } from '@apollo/client';


export const GET_SCHEDULES = gql`
query GetSchedules($doctorID: String!) {
  Schedules(DoctorID: $doctorID) {
    ScheduleID
    WeekDay
    Date
    StartTime
    EndTime
    Note
    Status
    ScheduleType
  }
}
`;


export const GET_EMERGENCY_SCHEDULES = gql`
query GetEmergencySchedules {
  EmergencySchedules {
    ScheduleID
    WeekDay
    Date
    StartTime
    EndTime
    Note
    Status
    ScheduleType
  }
}`;


export const GET_SCHEDULE_BY_DATE = gql`
query GetScheduleByDate($doctorID: String!, $date: String!) {
  GetScheduleByDate(DoctorID: $doctorID, Date: $date) {
    Schedule{
    ScheduleID
    WeekDay
    Date
    StartTime
    EndTime
    Note
    Status
    ScheduleType},
    BookedTimes{
      StartTime,
      EndTime
    }
  }
}
`;