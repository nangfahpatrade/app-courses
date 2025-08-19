import HomeUser from "../components/user/homeUser"
import { redirect } from 'next/navigation';

const UserPage: React.FC = () => {
    redirect(`/user/shopcourse`);
}

export default UserPage