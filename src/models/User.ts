export interface TypeUser {
  id: number;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  createdAt?: Date;
  updatedAt?: Date;
}
