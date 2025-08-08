// AI automation system type definitions
export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum LearningStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing'
}

export enum AIFeatureType {
  CODE_ANALYSIS = 'code_analysis',
  LEARNING_PERSONALIZATION = 'learning_personalization',
  CONTENT_GENERATION = 'content_generation',
  PREDICTIVE_ANALYTICS = 'predictive_analytics',
  ASSESSMENT = 'assessment',
  AUTOMATION = 'automation'
}

export enum AssessmentType {
  ADAPTIVE = 'adaptive',
  TIMED = 'timed',
  PRACTICE = 'practice',
  CERTIFICATION = 'certification'
}

export enum ContentType {
  EXERCISE = 'exercise',
  PROJECT = 'project',
  TUTORIAL = 'tutorial',
  DOCUMENTATION = 'documentation',
  TEST_CASE = 'test_case'
}

export enum AnalysisType {
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  QUALITY = 'quality',
  BEST_PRACTICES = 'best_practices'
}

export enum AutomationLevel {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  FULL = 'full'
}

export enum PredictionType {
  LEARNING_OUTCOME = 'learning_outcome',
  SKILL_MASTERY = 'skill_mastery',
  CAREER_PATH = 'career_path',
  PERFORMANCE_TREND = 'performance_trend'
}

export enum NotificationType {
  LEARNING_REMINDER = 'learning_reminder',
  ACHIEVEMENT = 'achievement',
  RECOMMENDATION = 'recommendation',
  SYSTEM_UPDATE = 'system_update'
}

export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  ERROR = 'error'
}

// Props types (data passed to components)
export interface AICodeReviewerProps {
  code: string;
  language: string;
  analysisTypes: AnalysisType[];
  realTime?: boolean;
  onAnalysisComplete: (results: CodeAnalysisResult) => void;
}

export interface AdaptiveLearningProps {
  userId: string;
  currentSkillLevel: SkillLevel;
  learningStyle?: LearningStyle;
  goals: string[];
  onPathUpdate: (path: LearningPath) => void;
}

export interface ContentGeneratorProps {
  topic: string;
  difficulty: SkillLevel;
  contentType: ContentType;
  language?: string;
  onContentGenerated: (content: GeneratedContent) => void;
}

export interface PredictiveAnalyticsProps {
  userId: string;
  timeframe: number;
  predictionTypes: PredictionType[];
  onPredictionsReady: (predictions: PredictionResults) => void;
}

export interface SmartAssessmentProps {
  topic: string;
  assessmentType: AssessmentType;
  adaptiveDifficulty: boolean;
  onAssessmentComplete: (results: AssessmentResults) => void;
}

// Store types (global state data)
export interface AISystemStore {
  features: Record<AIFeatureType, AIFeatureConfig>;
  userProfile: UserLearningProfile;
  automationSettings: AutomationSettings;
  integrationStatus: Record<string, IntegrationStatus>;
  analytics: AnalyticsData;
}

export interface UserLearningProfile {
  userId: string;
  skillLevel: SkillLevel;
  learningStyle: LearningStyle;
  preferredLanguages: string[];
  weakAreas: string[];
  strongAreas: string[];
  learningGoals: string[];
  studyTime: StudyTimePreferences;
  performance: PerformanceMetrics;
}

export interface AutomationSettings {
  smartScheduling: SmartSchedulingConfig;
  progressReports: ProgressReportConfig;
  notifications: NotificationConfig;
  aiAssistance: AIAssistanceConfig;
}

// Query types (API response data)
export interface CodeAnalysisResult {
  score: number;
  issues: CodeIssue[];
  suggestions: string[];
  metrics: CodeMetrics;
  securityScore: number;
  performanceScore: number;
}

export interface LearningPath {
  id: string;
  topics: LearningTopic[];
  estimatedDuration: number;
  difficulty: SkillLevel;
  prerequisites: string[];
  milestones: Milestone[];
}

export interface GeneratedContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  content: string;
  difficulty: SkillLevel;
  estimatedTime: number;
  skills: string[];
}

export interface PredictionResults {
  skillMastery: Record<string, SkillPrediction>;
  careerPath: CareerPathPrediction;
  learningOutcome: LearningOutcomePrediction;
  confidence: number;
}

export interface AssessmentResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  skillsAssessed: string[];
  recommendations: string[];
  nextLevel: SkillLevel;
}

// Supporting interfaces
export interface CodeIssue {
  type: AnalysisType;
  severity: 'low' | 'medium' | 'high';
  line: number;
  message: string;
  suggestion?: string;
}

export interface CodeMetrics {
  complexity: number;
  maintainability: number;
  testCoverage: number;
  performance: number;
}

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  difficulty: SkillLevel;
  estimatedTime: number;
  prerequisites: string[];
  resources: Resource[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  criteria: string[];
  reward?: string;
}

export interface SkillPrediction {
  current: number;
  predicted: number;
  timeframe: number;
  confidence: number;
}

export interface CareerPathPrediction {
  currentRole: string;
  suggestedRoles: string[];
  skillGaps: string[];
  timeToTransition: number;
}

export interface LearningOutcomePrediction {
  nextQuizScore: number;
  confidence: number;
  recommendedDifficulty: SkillLevel;
  optimalStudyDuration: number;
}

export interface AIFeatureConfig {
  enabled: boolean;
  settings: Record<string, any>;
}

export interface StudyTimePreferences {
  daily: number;
  optimal: string;
  timezone: string;
}

export interface PerformanceMetrics {
  averageScore: number;
  completionRate: number;
  streakDays: number;
  totalHours: number;
}

export interface SmartSchedulingConfig {
  enabled: boolean;
  adaptToPerformance: boolean;
  breakReminders: boolean;
  optimalSessionLength: number;
}

export interface ProgressReportConfig {
  frequency: 'daily' | 'weekly' | 'monthly';
  includeAnalytics: boolean;
  includePredictions: boolean;
  autoEmail: boolean;
}

export interface NotificationConfig {
  learningReminders: boolean;
  achievements: boolean;
  recommendations: boolean;
  systemUpdates: boolean;
}

export interface AIAssistanceConfig {
  codeCompletion: boolean;
  errorExplanation: boolean;
  optimizationSuggestions: boolean;
  realTimeHelp: boolean;
}

export interface AnalyticsData {
  totalUsers: number;
  activeFeatures: number;
  systemPerformance: number;
  userSatisfaction: number;
}

export interface Resource {
  type: string;
  title: string;
  url: string;
  duration: string;
}