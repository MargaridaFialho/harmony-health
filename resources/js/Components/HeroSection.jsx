import medicalCare from '../../images/medical-care.png';
import medical from '../../images/medical.png';
import heart from '../../images/health-care-1.png';

function HeroSection() {
    return (
        <div className="bg-hero-pattern bg-cover bg-center h-screen flex flex-col justify-center items-center text-white">
            <h1 className="text-5xl font-bold mb-4">Bem-vindos à Harmony & Health</h1>
            <p className="text-xl mb-8">A sua clínica de eleição para um bem-estar geral.</p>
            <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Start Now
            </a>
            <div className="flex items-center mt-8 space-x-4 justify-center">
                <div className="bg-transparent text-white p-4 rounded flex flex-col items-center w-1/4 text-center">
                    <img src={medicalCare} alt="Row 1 Image" className="w-16 h-16 mb-4 mx-auto"/>
                    <span>Saúde e bem-estar sempre de mãos dadas.</span>
                </div>
                <div className="text-white w-1/4 text-center">➡️</div>
                <div className="bg-transparent text-white p-4 rounded flex flex-col items-center w-1/4 text-center">
                    <img src={medical} alt="Row 2 Image" className="w-16 h-16 mb-4 mx-auto"/>
                    <span>Somos a sua escolha para uma saúde plena.</span>
                </div>
                <div className="text-white w-1/4 text-center">➡️</div>
                <div className="bg-transparent text-white p-4 rounded flex flex-col items-center w-1/4 text-center">
                    <img src={heart} alt="Row 3 Image" className="w-16 h-16 mb-4 mx-auto"/>
                    <span>Focados no seu conforto.</span>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;

