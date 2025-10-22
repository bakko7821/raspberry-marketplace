# commit 1.1.1

Был создан проект. Используемый Stack: ```Vite + TS + Express.js```

# commit 1.2.1

```В проект добавлен пре-процессор SASS```

- Созданы **HomePage.tsx**, **CartPage.tsx**, **UserPage.tsx** в папке /pages
- Созданы компоненты **Header.tsx**, в папке /auth созданы **Login.tsx**, **Register.tsx**
- Компоненты и страницы добавленны в index.tsx

- Создана папка styles в ней созданы файлы

``` 
_normalize.scss - обнуление стилей
_variables.scss - объявление всех переменных
index.scss - подключение шрифтов и базовые стили 
```

# commit 2.2.1

- Установлен sequelize
```
npm install sequelize pg pg-hstore
npm install --save-dev typescript ts-node @types/node @types/validator
npm install --save-dev @types/bluebird
npm install --save-dev @types/pg
npm install --save-dev @types/sequelize
```
- Обновлён файл **.env**
- Установленны библиотеки bcrypt и jsonwebtoken
```
npm install bcrypt jsonwebtoken
npm install --save-dev @types/bcrypt @types/jsonwebtoken
```
- Создана модель **/models/Card.ts**