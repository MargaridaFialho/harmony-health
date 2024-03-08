import logo from '../../images/world.png';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-6 flex justify-between items-center">
            <img src={logo} alt="Logo" className="h-12" />
            <p>© 2024 Clínica Harmony Health. Todos os direitos reservados..</p>
        </footer>
    );
}

export default Footer;

