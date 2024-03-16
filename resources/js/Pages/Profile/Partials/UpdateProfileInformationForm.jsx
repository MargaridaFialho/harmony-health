import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { auth } = usePage().props;
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        postal_code: user.postal_code || '',
        city: user.city || '',
        nif: user.nif || '',
        employee_number: user.employee_number || '',
        specialty: user.specialty || '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), data);
    };

    const isDoctor = user?.roles?.some(role => role.name === 'doctor') || false;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informação do perfil</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Atualize as informações do perfil e o endereço de email da sua conta.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nome" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Contacto" />
                    <TextInput
                        id="phone"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="phone"
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Morada" />
                    <TextInput
                        id="address"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        autoComplete="address-line1"
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="postal_code" value="Código Postal" />
                    <TextInput
                        id="postal_code"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.postal_code}
                        onChange={(e) => setData('postal_code', e.target.value)}
                        autoComplete="postal-code"
                    />
                    <InputError className="mt-2" message={errors.postal_code} />
                </div>

                <div>
                    <InputLabel htmlFor="city" value="Cidade" />
                    <TextInput
                        id="city"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                        autoComplete="address-level2"
                    />
                    <InputError className="mt-2" message={errors.city} />
                </div>

                <div>
                    <InputLabel htmlFor="nif" value="NIF" />
                    <TextInput
                        id="nif"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.nif}
                        onChange={(e) => setData('nif', e.target.value)}
                        autoComplete="off"
                    />
                    <InputError className="mt-2" message={errors.nif} />
                </div>
                {isDoctor && (
                <>
                    <div>
                        <InputLabel htmlFor="employee_number" value="Número de Empregado" />
                        <TextInput
                            id="employee_number"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.employee_number}
                            onChange={(e) => setData('employee_number', e.target.value)}
                            autoComplete="off"
                        />
                        <InputError className="mt-2" message={errors.employee_number} />
                    </div>

                    <div>
                        <InputLabel htmlFor="specialty" value="Especialidade" />
                        <TextInput
                            id="specialty"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.specialty}
                            onChange={(e) => setData('specialty', e.target.value)}
                            autoComplete="off"
                        />
                        <InputError className="mt-2" message={errors.specialty} />
                    </div>
                </>
            )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            O seu endereço de email não está verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Clique aqui para reenviar o email de verificação.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                Um novo link de verificação foi enviado para o seu endereço de email.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
