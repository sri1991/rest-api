# Rest-api

Getting Started with MongoDB, Node.js and Restify
With the multitudes of JavaScript frameworks available these days, there are countless options for building APIs. Many users can become overwhelmed and lose sight of the most important factors when it comes to building a REST API — speed, ease of use, and overall presence of the framework in the Javascript community. In this repo, we’ll be covering how to set up a simple API with full CRUD operations using the ever-popular Restify framework backed by a MongoDB database. For sake of simplicity, we’ll create a basic “to-do” style API.

# Prerequisites:
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
From there, we’ll need to create a “group” to hold our free cluster. Feel free to name your group whatever you’d like. In this example, we’ll work with a group called datafi.

Once your group is configured, you’ll be prompted to set up your first cluster. Simply follow the steps and choose the “M0” instance size for the free tier. Once you deploy your instance, it should be available within about five minutes.

# Whitelist your IP Address
Because security is top of mind with MongoDB Atlas, we will need to whitelist our IP address in order to connect to the cluster. MongoDB Atlas makes this super simple by providing a button that says “Add Current IP Address” just above where you previously copied your connection string from.

# Verifying our API Functionality with Postman
 In the root directory where your index.js file lives, simply type the following command:
 node index.js

This will kickoff the Node.js process and start your server on port 3000 (as defined in our config.js file) on localhost (http://localhost:3000). If all goes well, you should see the following output in your console:

To ensure that our API properly accepts the request, we’ll need to confirm that the Content-Type header is set to application/json.

Now that we have that set, let’s go ahead and create a document in our MongoDB “todos” collection in the “api” database by hitting the /todos endpoint with a POST request and a JSON body from Postman.

{
    "name": "sri",
    "task": "To do one",
    "status": "pending"
}

Choose the “raw” body type and “JSON (application/json)” from the dropdown menu. By doing so, you’ll be able to construct your JSON much easier within Postman.
Copy the following snippet and paste it into the “raw” section to be passed along as your JSON payload:


If you inspect the payload, you’ll notice that the MongoDB driver automatically inserted an ObjectID (_id). More the MongoDB ObjectID can be found here. Additionally, our created and updated dates were automatically added to the document by the code we wrote.
Next, we can GET all of the documents via the /todos endpoint. If you looked at the GET function, you probably noticed logic for querying and limiting results. This works well because Restify automatically converts query parameters to JSON, allowing us to simply pass in the object as our MongoDB query. The payload response will contain the following:

Let’s go ahead and update our task from “Pending” to “Complete” using the PUT HTTP method. This is similar to our HTTP POST, however, this time we’ll be using a different method and modified payload. We will also be passing the MongoDB ObjectID as a URL parameter:

Note: Your body should consist of the following to ensure that the status is modified:
{
    "status": "complete"
}
