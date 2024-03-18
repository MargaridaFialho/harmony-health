import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificação do Email" />

            <div className="mb-4 text-sm text-gray-600">
                Obrigado pela sua inscrição! Antes de começar, poderia verificar o seu endereço de email clicando no
                link que acabámos de enviar para si? Se não recebeu o email, teremos todo o gosto em enviar-lhe outro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Um novo link de verificação foi enviado para o endereço de email que forneceu durante o registo.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>REenviar Email de Verificação</PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Logout
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
