export interface StoredUsers {
  [key: string]: StoredUser;
}

export interface StoredUser {
  id: string;
  name: string;
}

const users: StoredUsers = { 1: { id: "1", name: "Jed" } };

export default users;
