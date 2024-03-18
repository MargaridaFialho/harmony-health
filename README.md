# Harmony & Health

######

> Este projeto consiste na criação de um website para um Hospital “Harmony&Health”. Proporcionamos uma plataforma intuitiva e eficiente para médicos, pacientes e administradores.

> Para os médicos, oferecemos uma área privada onde podem visualizar o seu horário de consultas marcadas, consultas e prescrições, verificar os seus pacientes e ver informações sobre os fármacos.

> Para os pacientes, disponibilizamos uma funcionalidade de marcação de consultas online. Basta escolher o médico desejado, selecionar a data e hora disponíveis e confirmar a marcação.

> Para os administradores, fornecemos todas as ferramentas necessárias para gerir eficazmente o sistema, desde a gestão de utilizadores até à gestão de fármacos. Além disso, também tem a possibilidade de marcar consultas para os pacientes. Este projeto foi realizado no ambito do meu curso fullstack para o projeto de Backend.

## Opções Técnicas

> O website será desenvolvido utilizando Laravel com Inertia para podermos utilizar React no frontend e para autenticação utilizei o Breeze.

## Identificação das Entidades:

-   Usuários (users)
-   Funções (roles)
-   Relacionamento entre usuários e funções (user_roles)
-   Médicos (doctors)
-   Pacientes (patients)
-   Consultas (appointments)
-   Medicamentos (drugs)
-   Prescrições (prescriptions)

## Desenho da base de dados

![This is an alt text.](/harmony-health/public/desenhobasedados.png "Desenho da base de dados")

## Ferramentas Utilizadas

-   Tailwind CSS, para os layouts;
-   Inertia;
-   Breeze;
-   React-calendar;
-   React-toastify

## Desenho da API REST

![This is an alt text.](/harmony-health/public/desenhoapi.png "Desenho da API")

## Links

-   [Documentação Inertia](https://inertiajs.com/).
-   [Documentação Laravel React JS CRUD Application Tutorial](https://www.itsolutionstuff.com/post/laravel-react-js-crud-application-tutorialexample.html#google_vignette?utm_content=cmp-true).
-   [Documentação Tailwind CSS](https://tailwindcss.com/).
-   [Documentação Laravel](https://laravel.com/docs/10.x/starter-kits).

## Melhorias Futuras

> Inserção no frontend da especialidade; adicionar as disponibilidades do médico; melhoramentos vários de experiência de utilizador.

## Installation e Correr no terminal

```
npm install;
npm run dev;
php artisan serve.
```
