## Технологии

- Postgres
- Node.js
- NestJS
- Swagger
- Git
- NPM
- TypeScript
- Redis

## Описание проекта

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

## Системные требования

### Node.js

- Linux: https://nodejs.org/en/download/package-manager/
- Windows: https://nodejs.org/en/download/

### Docker

https://docs.docker.com/engine/install/

### Docker Compose

https://docs.docker.com/compose/install/

### Git

https://github.com/git-guides/install-git

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
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=bank
DB_SYNCHRONIZE=true
JWT_SECRET_KEY=fs3nbk23jas0l
JWT_TOKEN_TTL=3600000
WHITELIST_DOMAINS=["http://localhost:3000","allowed-domain.com"]
DAILY_ACCOUNT_READING_LIMIT=5
