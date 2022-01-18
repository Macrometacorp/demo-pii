export enum Session {
  Jwt = "jwt",
  Tenant = "tenant",
}

export enum AppPaths {
  Root = "/",
  Login = "/login",
  Region = "/region",
  UserManagement = "/user-management",
}

export const HEADINGS = [
  "token",
  "name",
  "email",
  "phone",
  "state",
  "country",
  "zipcode",
  "job title",
  "actions",
];
