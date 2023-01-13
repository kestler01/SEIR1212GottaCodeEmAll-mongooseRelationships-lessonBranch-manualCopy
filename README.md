[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Mongoose Relationships

## Prerequisites

- [MongoDB](https://github.com/SEIR-Boston/mongodb)
- [Mongoose](https://github.com/SEIR-Boston/mongoose)

## Objectives

By the end of this talk, developers should be able to:

- Add nested schema and use subdocuments in Mongoose.
- Add references and use populate in Mongoose.

## Instructions

You do not have the necessary rights to update this repository. Therefore, you must make a personal copy, or fork, make changes to your fork, and then send a pull request to the owners of this repository. When working with github classroom , github creates this fork exclusively through using the link provided by the instructional team. To successfully complete the assignment:

1. Accept the github classroom invitation
1. Clone this repository
1. Change into the new directory
1. Checkout to a training branch
1. Run npm install
1. When you have fulfilled the requirements below, make a pull request on this repository to turn in your work.

If you do not complete the assignment in the allotted time, submit any and all work so we can evaluate your participation.

---

### Relationships
Throughout the week we may have heard the term "non-relational" in regards to MongoDB. Indeed, MongoDB doesn't have a built-in notion of
relationship between resources in the same way that SQL databases do. Introducing the concept of these relationships to the abstract collections of MongoDB is one of the core strengths of Mongoose. By leveraging relationships we can begin to define the connections between our database resources. The two main approaches to implementing relationships are [subdocuments](http://mongoosejs.com/docs/subdocs.html) and [references](http://mongoosejs.com/docs/populate.html).

---

## Subdocuments

> Subdocuments are documents embedded in other documents. In Mongoose, this means you can nest schemas in other schemas. Mongoose has two distinct notions of subdocuments: arrays of subdocuments and single nested subdocuments, both are demonstrated below.
>
> [mongodb subdocument docs](http://mongoosejs.com/docs/subdocs.html)

```js
const contactSchema = new Schema({
  phone: String,
  email: String
})

const postSchema = new Schema({
  title: String,
  body: String
})

const userSchema = new Schema({
  username: String,
  // a single nested contact subdocument
  contact: contactSchema, 
  // an array of posts subdocuments
  posts: [postSchema] 
})
```

In the example above we added two different kinds of relationships.
A [**one-to-one**](https://en.wikipedia.org/wiki/One-to-one_(data_model)) relationship and a [**one-to-many**](https://en.wikipedia.org/wiki/One-to-many_(data_model)) relationship.

The userSchema has a **one-to-one** relationship with contact, because each user
has one contact. Conversely, this means each contact also has one user.

![one-to-one relationship between user and contact](https://media.git.generalassemb.ly/user/16320/files/7a9c4c00-b168-11ea-85fa-997edd6cb9eb)

The userSchema has a **one-to-many** relationship with posts, because each user
can have many posts. While each post only has one user.

![one-to-one relationship between user and posts](https://media.git.generalassemb.ly/user/16320/files/87b93b00-b168-11ea-95bb-fc2e24e2206e)

### Code Along: One-to-Many Add Equipment to character

Together we will create our first **one-to-many** relationship. For this relationship,
we'll say that **one** character has **many** equipment implemented as **subdocuments**.

1. (C)reate equipment for a Character
2. (R)ead All equipment of a Character by Reading a character
3. (R)ead an equipment for a Character

### Lab: One-to-Many Update & Delete Equipment 

>Things break! maybe we lose them, _with the *hand*?_ 

Now it's your turn. `(u)pdate` and `(d)elete` will build on reading an equipment for character

##### Update equipment

Updating a subdocument can be done the same as a normal document. Review the documentation for [updating a document using save](https://mongoosejs.com/docs/documents.html#updating-using-save).

1. Accept a new `name`, `isBroken`, and `description` for a specific equipment. These will come from the user's input.
2. Find the specific equipment you want to update like in `show`.
3. Update the equipment's attributes with the new values. Make sure the changes are _saved_.
4. Test it! Try updating an equipment from the terminal. 

##### Destroy Comment

Subdocuments are deleted differently than normal documents. Review the [documentation for removing subdocuments](https://mongoosejs.com/docs/subdocs.html#removing-subdocs).

1. Find the specific equipment you want to remove like in `show`.
2. Remove the specific equipment from the character's `equipment` subdocument array. Make sure the changes are saved.
3. Test it! Try destroying the lightsaber equipment from the terminal.

---
## References

> Mongoose has an alternative called `populate()`, which lets you reference
> documents in other collections.  Population is the process of automatically
> replacing the specified paths in the document with document(s) from other
> collection(s). We may populate a single document, multiple documents,
> plain object, multiple plain objects, or all objects returned from a query.
>
> [mongodb populate docs](http://mongoosejs.com/docs/populate.html)


```js
const userSchema = Schema({
  username: String,
  required: true
})

const contactSchema = Schema({
  user: {
    // References use the type ObjectId
    type: Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  },
  phone: String,
  email: String
})

const Contact = mongoose.model('Contact', contactSchema)
const User = mongoose.model('User', userSchema)
```

In the example above we added a **one-to-many** relationship with a **reference**.

The userSchema has a **one-to-many** relationship with contact, where one user has
many contacts.

We can determine this is a **one-to-many** relationship because each contact has
a single user reference.  If we created multiple contacts with the same user,
then that user would have many contacts.

![one-to-many relationship between user and contacts](https://media.git.generalassemb.ly/user/16320/files/59dbf280-b178-11ea-95af-ee550ac34d58)

### Code Along: One-to-Many Add Character to Starship as Owner

Lets create our first one-to-many relationship using references.
**one** character can have **many** starships.

The reference should be called `owner`. It will be used to keep track of who currently owns the starship. 

>Note: after updating the model we should drop the collection that already exist since they _do not_ have those changes. 

>In the galaxy far far away star ships are frequently changing hands, so we also want to implement update and delete here. In our future projects we will use owner to help authorize actions for authenticated users, and will specifically prevent updating or removing an owner.

1. (C)reate a Starship include `owner` : Lando originally owns the 'Falcon
2. (R)ead All Starships populating the `owner`
3. (R)ead a Starship populating the `owner`
4. (U)date `owner` : Han wins the 'Falcon "_fair and square_"
5. (D)elete `owner` : _SOMEHOW_ the falcon gets left behind on Jakku at some point

### Lab: One-to-Many Add Character to Starship as Crew

Now its your turn to practice creating a one-to-many relationship! Create a
one-to-many relationship where **one** starship can have **many** crew.

The reference should be called `crew`. It will be used to keep track of the
characters on the spaceship.
>Note: after updating the model we should drop the collection that already exist since they _do not_ have those changes. 
1. (C)reate a Spaceship include `crew` : Han, Leia, and Luke crew the 'Falcon
2. (R)ead a Spaceship populating the `crew`
3. (U)pdate  `crew` : add yourself or any other character to the crew of the 'falcon 
4. (D)elete `crew` : remove luke from the 'Falcons crew, he's going to pilot Red-5

<!-- > Hint: To populate the `owner` inside of the `comments` subdocument array, you
> will need to provide the full path to the `owner`. [Review this example](https://stackoverflow.com/a/13031171/3500171)
> showing how to populate a subdocument's `created_by` property. -->

## Additional Resources
- [Schema rules of thumb and relationships](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)
- [SOF Embedded document vs Reference](https://stackoverflow.com/questions/21302279/embedded-document-vs-reference-in-mongoose-design-model)
- [Mongoose 101: Working with subdocuments](https://zellwk.com/blog/mongoose-subdocuments/)
- [Mongoose Reference Docs](http://mongoosejs.com/docs/populate.html)
  - [Mongoose Docs](http://mongoosejs.com/docs/populate.html)
  - [Code Barbarian blog post](http://thecodebarbarian.com/mongoose-virtual-populate)
- [Mongoose Subdocuments Docs](http://mongoosejs.com/docs/subdocs.html)


## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
2. All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.
