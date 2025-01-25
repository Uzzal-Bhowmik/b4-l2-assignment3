import { TUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const admin: TUser = {
  name: "Admin",
  email: "admin@mail.com",
  password: "Admin123@",
  role: "admin",
  isDeleted: false,
};

const createAdmin = async () => {
  const isAdminExist = await User.find({ role: "admin" });

  if (isAdminExist.length > 0) {
    return;
  }

  // Create an Admin
  await User.create(admin);
};

export default createAdmin;
