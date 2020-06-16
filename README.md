[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Mongoose Relationships

## Prerequisites

- [MongoDB](https://git.generalassemb.ly/ga-wdi-boston/mongodb-crud)
- [Mongoose Study](https://git.generalassemb.ly/ga-wdi-boston/mongoose-study)
- [Mongoose ](https://git.generalassemb.ly/ga-wdi-boston/mongoose)


## Objectives

By the end of this talk, developers should be able to:

- Add nested schema and use subdocuments in Mongoose.
- Add references and use populate in Mongoose.

## Preparation

1. [Fork and clone](https://git.generalassemb.ly/ga-wdi-boston/meta/wiki/ForkAndClone)
   this repository
1. Create a new branch, `training`, for your work.
1. Checkout to the `training` branch.
1. Install dependencies with `npm install`.

As the term "non-relational" implies, MongoDB doesn't have a built-in notion of
relationship between resources in the same way that SQL does. The two main approaches are
[subdocuments](http://mongoosejs.com/docs/subdocs.html) and
[references](http://mongoosejs.com/docs/populate.html).

## Subdocuments

>Subdocuments are documents embedded in other documents. In Mongoose, this means you can nest schemas in other schemas. Mongoose has two distinct notions of subdocuments: arrays of subdocuments and single nested subdocuments. [mongodb](http://mongoosejs.com/docs/subdocs.html)

![subdocs](https://docs.mongodb.com/manual/_images/data-model-denormalized.bakedsvg.svg)

```js
const contactSchema = new Schema({
  phone: String,
  email: String
});

const postSchema = new Schema({
  title: String,
  body: String
});

const userSchema = new Schema({
  username: String
  contact: contactSchema,
  posts: [postSchema]
});
```

### Code Along: Add Comments to Places

1. (C)reate Comment for Place
2. (R)ead All Comments for Place
3. (R)ead a Comment for Place
4. (U)date Comment for Place
5. (D)elete Comment for Place

## Reference

>Mongoose has an alternative called `populate()`, which lets you reference documents in other collections.  Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple documents, plain object, multiple plain objects, or all objects returned from a query. [mongodb](http://mongoosejs.com/docs/populate.html)

![reference](https://docs.mongodb.com/manual/_images/data-model-normalized.bakedsvg.svg)

```js
const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  username: String
});

const contactSchema = Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  phone: String,
  email: String
});

const Contact = mongoose.model('Contact', contactSchema);
const User = mongoose.model('User', userSchema);
```

### Lab: Add Person to Comment as Owner

1. (C)reate a Comment include Owner
2. (R)ead All Comments include Owner
3. (R)ead a Comment include Owner
4. (U)date Owner? No. Why not?
5. (D)elete Owner? No. Why not?

## Additional Resources

- [Embedded document vs Reference](https://stackoverflow.com/questions/21302279/embedded-document-vs-reference-in-mongoose-design-model)
- [Mongoose 101: Working with subdocuments](https://zellwk.com/blog/mongoose-subdocuments/)
- Mongoose Reference
  - [Mongoose Docs](http://mongoosejs.com/docs/populate.html)
  - [Code Barbarian blog post](http://thecodebarbarian.com/mongoose-virtual-populate)
- Mongoose Subdocuments
  - [Mongoose Docs](http://mongoosejs.com/docs/subdocs.html)
  - [Coderwall blog post](https://coderwall.com/p/6v5rcw/querying-sub-documents-and-sub-sub-documents-in-mongoose)

## Tasks

Developers should run these often!

- `grunt nag`: runs code quality analysis tools on your code
    and complains.
- `grunt test`: runs any automated tests; may depend on `grunt build`.
- `grunt`: runs both `nag` and then `test`
- `grunt make-standard`: reformats all your code in the standard style.

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
