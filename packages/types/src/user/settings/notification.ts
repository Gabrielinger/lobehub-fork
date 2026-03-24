export interface NotificationChannelSettings {
  enabled?: boolean;
  types?: Record<string, boolean>;
}

export interface NotificationSettings {
  email?: NotificationChannelSettings;
  inbox?: NotificationChannelSettings;
}
