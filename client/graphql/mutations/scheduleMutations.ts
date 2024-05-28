import { UserStatus, UserType } from '@/types/types';
import { gql } from '@apollo/client';

export  const CREATE_SCHEDULE = gql`
mutation CreateSchedule($input: CreateScheduleInput!) {
  CreateSchedule(createScheduleInput: $input) {
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
export const UPDATE_SCHEDULE = gql`
mutation UpdateSchedule($input: UpdateScheduleInput!) {
  UpdateSchedule(updateScheduleInput: $input) {
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


export const CREATE_EMERGENCY_SCHEDULE = gql`
mutation CreateEmergencySchedule($input: EmergencyScheduleInput!) {
  CreateEmergencySchedule(emergencyScheduleInput: $input) {
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

export const REMOVE_SCHEDULE = gql`
mutation RemoveSchedule($id: Int!) {
  RemoveSchedule(id: $id) {
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