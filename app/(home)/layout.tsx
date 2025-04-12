import FooterHome from "@/components/home/footer/FooterHome";
import HomeHeader from "@/components/home/header/HomeHeader";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col'>
            <HomeHeader />
            <div className="min-h-screen">
                {children}
            </div>
            <FooterHome />
        </div>
    )
}