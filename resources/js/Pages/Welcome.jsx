import { Link, Head } from '@inertiajs/react';
import HeroSection from '../Components/HeroSection';
import ImageTextSection from '../Components/ImageTextSection';
import Footer from '../Components/Footer';
import ApplicationLogo from '@/Components/ApplicationLogo';
import medicos from '../../images/medicos.png';
import heart from '../../images/heart.png';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex justify-between items-center p-2 bg-gray-800">
                <div className="p-3">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                    </Link>
                </div>
                <div className="text-end p-3">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Início
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Login
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Registar
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <HeroSection />
            <ImageTextSection 
                imageRight={false} 
                imagePath={medicos}
                heading="A nossa Visão" 
                text="Na nossa clínica, comprometemo-nos a proporcionar cuidados de saúde personalizados, centrados no paciente, com uma equipa dedicada que valoriza a empatia e a atenção individual." 
            />
            <ImageTextSection 
                imageRight={true} 
                imagePath={heart}
                heading="Os nossos valores" 
                text="Na Harmony & Health, combinamos inovação médica com um toque humano, proporcionando tratamentos avançados e personalizados para promover o seu bem-estar global. Confie na nossa excelência em saúde." 
            />
            <Footer />

        </>
    );
}
