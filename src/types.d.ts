export type Permission = {
  createdAt: string;
  deletedAt?: string;
  group: string;
  id: number;
  name: string;
  updatedAt: string;
};

export type PermissionPreset = {
  accessLevels: Permission[];
  createdAt: string;
  deletedAt?: string;
  id: string;
  name: string;
  updatedAt: string;
};
