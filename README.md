# rest-api

Getting Started with MongoDB, Node.js and Restify
With the multitudes of JavaScript frameworks available these days, there are countless options for building APIs. Many users can become overwhelmed and lose sight of the most important factors when it comes to building a REST API — speed, ease of use, and overall presence of the framework in the Javascript community. In this post, we’ll be covering how to set up a simple API with full CRUD operations using the ever-popular Restify framework backed by a MongoDB database. For sake of simplicity, we’ll create a basic “to-do” style API.
# Installing Node.js
Let’s get started by installing Node.js (if you already have Node.js installed, feel free to skip to the next section of this post). If you are on a Mac, the easiest way to install Node.js is via Homebrew, a package manager for macOS.
To do so, simply run the following command in your terminal and you’ll be ready to go:

If you already have Node.js installed, make sure you’re running the latest version by running:

Once installed, you can run the following command to verify that node has been installed (please note that I’m currently running v7.10.0):

The output will display the latest version installed, which will be v7.10.0 or above:

Note: If you’re on Windows or Linux, please read the installation instructions on the official Node.js website.
# Getting Started with MongoDB Atlas
The easiest way to get start using MongoDB is with MongoDB Atlas, a managed service from MongoDB that facilitates seamless scaling and operations of your deployments in the cloud. It is super simple to set up and operate, and, best of all, there’s a free tier for small deployments — no credit card required.
To get started, head on over to https://www.mongodb.com/cloud/atlas and click the “Start Free” button.
From there, we’ll need to create a “group” to hold our free cluster. Feel free to name your group whatever you’d like. In this example, we’ll work with a group called young-sea-3503.

Once your group is configured, you’ll be prompted to set up your first cluster. Simply follow the steps and choose the “M0” instance size for the free tier. Once you deploy your instance, it should be available within about five minutes.

# Create Our Application Directory
Let’s create a directory for our application. We will call it “rest-api”. To do so, simply run the following command in your terminal:

Pro Tip: The application directory location does not technically matter. I chose your root simply because it’s easy to find. Feel free to specify a different directory path if you’d like.
# NPM Package Management
Now that Node.js is set up and we have a database to connect to, we’ll need to install the npm packages Restify and MongoDB (the official MongoDB driver for Node.js). When you installed Node.js, you also installed npm, which makes it super simple to install the necessary dependencies.
The best way to manage locally installed npm packages is to create a package.json file. A package.json file affords you a number of capabilities:
It documents which packages your project depends on.
It allows you to specify the versions of a package that your project can use, using semantic versioning rules.
It makes your build reproducible, which makes it way easier to share with other developers.
# Installing the Necessary NPM Packages
Now that you understand the need for a package.json file, let’s run an npm command in your terminal to generate the file:

You should see the following output (the contents of your package.json file):

Pro Tip: Running the init command attempts to make reasonable guesses about how you want your options set, and then writes a package.json file with the properties you select when prompted. If you invoke it with -f, — force, -y, or — yes, it will use only defaults and not prompt you for any options.
Now that we have the package.json file created, open up a terminal, navigate to the directory that contains your Node.js application and run the following command:

The command above will automatically install the MongoDB and Restify node modules from the npm registry.
# Create a Configuration File
To keep things clean, I generally like to abstract important and/or reusable information into a configuration file. With that said, let’s create a file called config.js with the following command:

The contents of the file should look something like this:

With our config.js file in place, grab the connection string so we can add it to your configuration file. To do so, head back over to the MongoDB Atlas console and click on the “connect” button. Once clicked, you will be presented with the following screen, containing your connection string to your MongoDB Atlas cluster:

Click “copy” and replace “YOUR_MONGODB_CONNECTION_STRING” in your config.js file with your provided connection string.
Here’s an example of our config.js file with our MongoDB Atlas connection string specifying the API database using our username and password:

Note: You will need to manually drop in the password you created when you initially built your cluster. For security purposes the password is not visible in the console. Additionally, it’s best to also specify a user with read, write, or read and write access (depending on your needs). For the purpose of this tutorial, we have named the database “api”.
# Whitelist your IP Address
Because security is top of mind with MongoDB Atlas, we will need to whitelist our IP address in order to connect to the cluster. MongoDB Atlas makes this super simple by providing a button that says “Add Current IP Address” just above where you previously copied your connection string from.

# Create the index.js File
The index.js file will server as the main entrypoint to your Node.js API. To get started, let’s go ahead and create the file using the following command:

Next, let’s drop in some boilerplate code so that your application will kickoff the Restify server process:

# Setting Up Routes
Next, let’s create our routes for CRUD operations. With a fully fledged application, you would generally have dozens of route files; however, for our case, we’ll keep it simple and only have one route file called routes.js.
Let’s create our file by running the following command from your terminal:

Now that you’ve successfully created your routes file, let’s start populating the file with your actual endpoints!
Below is boilerplate code to drop into your routes.js file (all of which is commented and should be self-explanatory):

# Verifying our API Functionality with Postman
At it’s core, Postman is a powerful GUI platform built to make your API development faster and easier — from building API requests to testing, documenting and sharing with teammates. It’s one of my favorite tools (and should be yours, too).
Start the server. In the root directory where your index.js file lives, simply type the following command:

This will kickoff the Node.js process and start your server on port 3000 (as defined in our config.js file) on localhost (http://localhost:3000). If all goes well, you should see the following output in your console:

To ensure that our API properly accepts the request, we’ll need to confirm that the Content-Type header is set to application/json.
Now that we have that set, let’s go ahead and create a document in our MongoDB “todos” collection in the “api” database by hitting the /todos endpoint with a POST request and a JSON body from Postman.
Choose the “raw” body type and “JSON (application/json)” from the dropdown menu. By doing so, you’ll be able to construct your JSON much easier within Postman.
Copy the following snippet and paste it into the “raw” section to be passed along as your JSON payload:


If you inspect the payload, you’ll notice that the MongoDB driver automatically inserted an ObjectID (_id). More the MongoDB ObjectID can be found here. Additionally, our created and updated dates were automatically added to the document by the code we wrote.
Next, we can GET all of the documents via the /todos endpoint. If you looked at the GET function, you probably noticed logic for querying and limiting results. This works well because Restify automatically converts query parameters to JSON, allowing us to simply pass in the object as our MongoDB query. The payload response will contain the following:

Let’s go ahead and update our task from “Pending” to “Complete” using the PUT HTTP method. This is similar to our HTTP POST, however, this time we’ll be using a different method and modified payload. We will also be passing the MongoDB ObjectID as a URL parameter:

Note: Your body should consist of the following to ensure that the status is modified:

Finally, let’s delete our document with the DELETE HTTP method (you’ll need to pass the auto-generated ObjectId from your initial call in the URL):

You now have four functional API endpoints to power a todo list in which you can run full CRUD operations. While we covered just the tip of the iceberg, you are well along your way to adding additional functionality using the API/structural patterns provided in this tutorial.