export enum Session {
  Jwt = "jwt",
  Tenant = "tenant",
}

export enum AppPaths {
  Root = "/",
  Login = "/login",
  Region = "/region",
  UserManagement = "/user-management",
  Logout = "/logout",
}

export enum ModalPaths {
  EditModal = "#edit-modal",
  RemoveModal = "#remove-modal",
  ShareModal = "#share-modal",
  AddContactModal = "#contact-modal",
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

export enum Fabrics {
  Global = "pii_global",
  Eu = "pii_eu",
}

export enum Collections {
  Users = "users",
  UserLocations = "user_locations",
}

export const Queries = {
  GetUsers: `FOR doc IN ${Collections.Users} RETURN doc`,
  GetLocations: `FOR doc in ${Collections.UserLocations} RETURN doc`,
};
