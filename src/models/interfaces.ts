export interface IUser {
  Name: string;
  Email: string;
  StartDate: Date;
  Description?: string;
  Contact?: string;
  Status: "Inactive" | "Active";
  Password: string;
  IMG?: string;
}

export interface IRoom {
  RoomID: number;
  RoomName: "Deluxe A-" | "Deluxe B-" | "Deluxe C-" | "Deluxe D-";
  Status: "Available" | "Unavailable";
  Offer?: number;
}

export interface IContact {
  OrderID: string;
  Date: Date;
  Customer: string;
  Mail: string;
  Telephone?: string;
  Comment?: string;
  Action: "Archive" | "Publish";
  IMG?: string;
}

export interface IBooking {
  BookingID: number;
  RoomID: number;
  CheckInDate: Date;
  CheckOutDate: Date;
  OrderDate: Date;
  SpecialRequest?: string;
  Status: "Check In" | "Progress" | "Check Out";
}
