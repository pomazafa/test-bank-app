## Краткое описание проекта

Необходимо реализовать модули для системы управления пользователями.
Реализовать REST API для операций по осуществлению банковский транзацкий.

## Требования к проекту

1. Создание аккаунта
2. Пополнение счета
3. Получение текущего баланса
4. Снятие со счета
5. Блокировка аккаунта
6. История транзакций
7. Ограничение по количеству запросов на получение текущего счета в день(без дополнительных таблиц)
8. Проверка, откуда приходят запросы и запрет, если запрос из неизвестного источника

## Технологии

- Postgres
- Node.js
- NestJS
- Swagger
- Git
- NPM
- TypeScript
- Redis

## Системные требования

### Node.js

- Linux: https://nodejs.org/en/download/package-manager/
- Windows: https://nodejs.org/en/download/

Минимальная версия v18.7.0

### Npm

Минимальная версия 8.18.0

### Docker

https://docs.docker.com/engine/install/

Минимальная версия 20.10.22

### Docker Compose

https://docs.docker.com/compose/install/

Минимальная версия 1.29.2

### Git

https://github.com/git-guides/install-git

Минимальная версия 2.37.2

## Установка

1. `git clone ssh://git@gitlab.intexsoft.by:222/intexsoft/intexsoft-food/intexsoft-food-server.git`
1. `cd test-bank-app`
1. `cp .env.dev .env`
1. `npm install`

## Запуск приложения

Выполните последовательно следующие команды:

1. `cd docker`
1. `docker-compose --env-file .env.dev up -d`
1. `cd ..`
1. `npm run start:dev`

Приложение теперь запущено на <a href="http://localhost:3000">http://localhost:3000</a>

## Swagger

Вы можете посмотреть Swagger документацию к проекту по <a href="http://localhost:3000/swagger">ссылке</a>, если приложение запущено

## Переменные окружения

- DB_HOST - хост базы данных
- DB_PORT - порт базы данных
- DB_USERNAME - имя пользователя базы данных
- DB_PASSWORD - пароль пользователя базы данных
- DB_NAME - имя базы данных
- DB_SYNCHRONIZE - включена ли синхронизация базы данных
- JWT_SECRET_KEY - секретный ключ для JWT токена
- JWT_TOKEN_TTL - время жизни JWT токена
- WHITELIST_DOMAINS - список доменов, откуда разрешены запросы к API
- DAILY_ACCOUNT_READING_LIMIT - лимит на чтение баланса в день

Значения по умолчанию:

- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=postgres
- DB_PASSWORD=postgres
- DB_NAME=bank
- DB_SYNCHRONIZE=true
- JWT_SECRET_KEY=fs3nbk23jas0l
- JWT_TOKEN_TTL=3600000
- WHITELIST_DOMAINS=["http://localhost:3000","allowed-domain.com"]
- DAILY_ACCOUNT_READING_LIMIT=5

## Описание работы проекта

Пользователь создаёт свой аккаунт по запросу `POST /clients`

Чтобы взаимодействовать с аккаунтами и транзакциями, необходимо пройти аутентификацию. Аутентификация нужна для идентификации пользователя. Получить JWT токен пользователь может вызвав эндпоинт `POST /auth/login`

Для создания аккаунта используется эндпоинт `POST /accounts`
Для получения информации о текущем балансе необходимо вызвать эндпоинт `GET /accounts/{id}/balance`. Данный эндпоинт имеет ограничение по вызовам для одного аккаунта, которое регулируется переменной окружения `DAILY_ACCOUNT_READING_LIMIT`

Чтобы создать транзакцию, необходимо вызвать эндпоинт `POST /accounts/{accountId}/transactions`. Данный эндпоинт имеет обязательный параметр `value`, который может принимать как положительные, так и отрицательные значения. При положительном `value` транзакция будет считаться пополнением счёта, при отрицательном - снятие денег со счёта.
Посмотреть список всех транзакций счёта можно вызвав `GET /accounts/{accountId}/transactions`

Обратите внимание, что API принимает запросы только с хостов, заданных переменной окружения `WHITELIST_DOMAINS`
