export enum Session {
  Jwt = "jwt",
  Tenant = "tenant",
}

export enum SessionStorage {
  IsPrivateRegion = "isPrivateregion",
  Region = "region",
}

export enum AppPaths {
  Root = "/",
  Login = "/login",
  Region = "/region",
  UserManagement = "/user-management",
  Logout = "/logout",
  AddContact = "/add-contact",
}

export enum ModalPaths {
  EditModal = "#edit-modal",
  RemoveModal = "#remove-modal",
  ShareModal = "#share-modal",
  AddContactModal = "#contact-modal",
  ShowDecryptedModal = "#decrypted-modal",
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

export const MM_TOKEN_PREFIX = "mm_";

export const Queries = {
  GetUsers: `FOR doc IN ${Collections.Users} RETURN doc`,
  GetLocations: `FOR doc in ${Collections.UserLocations} RETURN doc`,
  UpsertUser: `UPSERT { _key: @token }
  INSERT { _key: @token, token: @token, name: @name, email: @email, phone: @phone }
  UPDATE { name: @name, email: @email, phone: @phone } IN ${Collections.Users}`,
  UpsertLocation: `UPSERT { _key: @token }
  INSERT { _key: @token, token: @token, state: @state, country: @country, zipcode: @zipcode, job_title: @job_title }
  UPDATE { state: @state, country: @country, zipcode: @zipcode, job_title: @job_title } IN ${Collections.UserLocations}`,
  SearchUserByEmail: `FOR user IN ${Collections.Users} FILTER user.email == @email RETURN user`,
  SearchUserByToken: `FOR user IN ${Collections.Users} FILTER user._key == @token RETURN user`,
  SearchLocationByToken: `FOR location IN ${Collections.UserLocations} FILTER location.token == @token RETURN location`,
};
