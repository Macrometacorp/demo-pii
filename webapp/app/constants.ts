export enum Session {
  Jwt = "jwt",
  Tenant = "tenant",
}

export enum SessionStorage {
  IsPrivateRegion = "isPrivateRegion",
  Region = "region",
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
  ShowDecryptedModal = "#decrypted-modal",
}

export enum ToastTypes {
  Success = "Success",
  Error = "Error",
  Info = "Info",
}

export const HEADINGS = [
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

export const TRUNCATE_LENGTH = 30;

export const CONTACTS_PER_PAGE = 10;

export const SHAREABLE_CURL_COMMAND_MESSAGE =
  "Loading Shareable Curl Command...";

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

export enum ActionButtons {
  Edit = "EDIT",
  Remove = "REMOVE",
  Share = "SHARE",
  Show = "SHOW",
}

export enum HttpMethods {
  Get = "get",
  Post = "post",
  Put = "put",
  Delete = "delete",
}

export enum FormButtonActions {
  Name = "_perform",
  Create = "create",
  Update = "update",
  Delete = "delete",
}
