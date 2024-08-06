import { User } from "@/models/User";
import Image from "next/image";

type UserProfileImageProps = {
  user: User;
};

const UserProfileImage: React.FC<UserProfileImageProps> = ({ user }) => {
  return (
    <Image
      src={`https://api.dicebear.com/6.x/adventurer/png?seed=${user.name}`}
      alt={user.name}
      width={48}
      height={48}
      className="w-12 h-12 rounded-full"
    />
  );
};

export default UserProfileImage;
