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


export enum BlogCategory {
  GeneralHealthAndWellness = 'GeneralHealthAndWellness',
  MedicalConditions = 'MedicalConditions',
  DiseaseManagement = 'DiseaseManagement',
  MentalHealth = 'MentalHealth',
  NutritionAndDiet = 'NutritionAndDiet',
  FitnessAndExercise = 'FitnessAndExercise',
  MedicationAndTreatment = 'MedicationAndTreatment',
  PatientStoriesAndTestimonials = 'PatientStoriesAndTestimonials',
  MedicalResearchAndBreakthroughs = 'MedicalResearchAndBreakthroughs',
  MedicalEducation = 'MedicalEducation',
  HealthTechnology = 'HealthTechnology',
  HealthcarePolicyAndAdvocacy = 'HealthcarePolicyAndAdvocacy',
  WomensHealth = 'WomensHealth',
  MensHealth = 'MensHealth',
  PediatricsAndChildHealth = 'PediatricsAndChildHealth',
  ElderlyCareAndAging = 'ElderlyCareAndAging',
  AlternativeMedicine = 'AlternativeMedicine',
  GlobalHealth = 'GlobalHealth',
  MedicalEthicsAndLegalIssues = 'MedicalEthicsAndLegalIssues',
  CancerAwarenessAndSupport = 'CancerAwarenessAndSupport',
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
  MALE = 'male',
  FEMALE = 'female',
}



export enum AppointmentType {
  INITIAL_CONSULTATION = 'initialConsultation',
  FOLLOW_UP = 'followUp',
  EMERGENCY = 'emergency',
}

export enum ScheduleStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

export enum AppointmentStatus {
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



export enum ContentType {
  FORUM_ANSWER = 'forumAnswer',
  POST = 'post',
  COMMENT="comment"
}

export enum FeedbackType {
  GENERAL_FEEDBACK = 'generalFeedBack',
  PRODUCT_REVIEW = 'productReview',
  SERVICE_REVIEW = 'serviceReview',
}
export enum WeekDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = "thursday",
  FIRDAY = "firday",
  SATURDAY = "saturday",
  SUNDAY = "sunday"
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',

}
export enum MediaType{
  VIDEO="video",
 IMAGE= "image"
}

export enum LikeType{
  LIKE="like",
 DISLIKE= "dislike"
}