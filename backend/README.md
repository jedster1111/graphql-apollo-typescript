# GraphQL - Apollo - Typescript Backend

Using [type-graphql](https://github.com/19majkel94/type-graphql), [typeorm](https://github.com/typeorm/typeorm), [typeorm-typedi-extensions](https://github.com/typeorm/typeorm-typedi-extensions), [apollo-server](https://github.com/apollographql/apollo-server), [typedi](https://github.com/typestack/typedi). This way I only have to update definitions in one location and I get the benefits of typesafety.

See [this type-graphql with typeorm example](https://github.com/19majkel94/type-graphql/tree/master/examples/typeorm-basic-usage) for a kind of confusing but helpful guide.

## Setup

Need to have a postgresql db running on localhost.  
Copy the `.template.env` file and enter whatever password you used to set up your PostgreSQL. Your file should look like below:

```env
DB_PASS = EnterYourDBPasswordHere
```

Then run:

```sh
# Install dependencies
yarn
```

## Run

```sh
# Start tsc in watch mode.
# Compiles ts files to js into /dist folder
yarn build -w

# In another terminal
# Start a GraphQL server on port 4000
yarn start
```

Visit localhost:4000 to play with queries or use a tool like [Insomnia](https://insomnia.rest).