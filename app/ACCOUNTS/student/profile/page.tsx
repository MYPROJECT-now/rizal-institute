import { ProfilePage } from "@/components/accounts/students/profile/profile";



const Profile = () => {
    return (
        <div className="h-full flex flex-col  rounded-t-lg  lg:px-5 px-0 ">
            <section className="w-full h-full bg-white self-center lg:mt-2 mt-0">
                <header className="  rounded-t-lg bg-lGreen font-bold font-merriweather  tracking-[2px]   text-white sm:pl-5 pl-2 sm:py-5 py-4 text-sm sm:text-lg lg:text-xl lg:border-0 border-x-2 border-t-2 border-white">
                   Student Info
                </header>
                <ProfilePage />
            </section>
        </div>
    );
};

export default Profile;