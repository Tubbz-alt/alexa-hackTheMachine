var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
const orderTable = "orders";
const userTable = "user";

var dbHelper = function () { };
var docClient = new AWS.DynamoDB.DocumentClient();

dbHelper.prototype.addUser = (userID, username) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: userTable,
            Item: {
              'userId': userID,
              'username': username
            }
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.log("Unable to insert =>", JSON.stringify(err))
                return reject("Unable to insert");
            }
            console.log("Saved Data, ", JSON.stringify(data));
            resolve(data);
        });
    });
}

dbHelper.prototype.getUser = (userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: userTable,
            KeyConditionExpression: "#userID = :user_id",
            ExpressionAttributeNames: {
                "#userID": "userId"
            },
            ExpressionAttributeValues: {
                ":user_id": userID
            }
        }
        docClient.query(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            } 
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            resolve(data.Items)
            
        })
    });
}

dbHelper.prototype.addItemToOrders = (orderID, userID, qty, address, phn) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: orderTable,
            Item: {
                'orderId': orderID,
                'userId': userID,
                'qty': qty,
                'address': address,
                'phn': phn
            }
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.log("Unable to insert =>", JSON.stringify(err))
                return reject("Unable to insert");
            }
            console.log("Saved Data, ", JSON.stringify(data));
            resolve(data);
        });
    });
}

dbHelper.prototype.getOrders = (userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: orderTable,
            KeyConditionExpression: "#userID = :user_id",
            ExpressionAttributeNames: {
                "#userID": "userId"
            },
            ExpressionAttributeValues: {
                ":user_id": userID
            }
        }
        docClient.query(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            } 
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            resolve(data.Items)
            
        })
    });
}

dbHelper.prototype.getOrderByOrderID = (orderID, userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: orderTable,
            Key: {
                "orderId": Math.floor(orderID)
            }
        }
        docClient.get(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            } 
            console.log("GetOrder succeeded:", JSON.stringify(data, null, 2));
            resolve(data.Items)
        })
    });
}

dbHelper.prototype.removeOrder = (orderID, userID) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: orderTable,
            Key: {
                "orderId": Math.floor(orderID)
            },
            ConditionExpression: "attribute_exists(userId)"
        }
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            }
            console.log(JSON.stringify(err));
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            resolve(data)
        })
    });

    dbHelper.prototype.modifyAddress = (orderID, address) => {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: orderTable,
                Key:{
                    "orderId": Math.floor(orderID)
                },
                UpdateExpression: "set orders.address = :add",    
                ExpressionAttributeValues:{
                    ":add": address
                },
                ReturnValues:"UPDATED_NEW"
            }
            docClient.update(params, (err, data) => {
                if (err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    return reject(JSON.stringify(err, null, 2))
                } 
                console.log("Address update succeeded:", JSON.stringify(data, null, 2));
                resolve(data)
                
            })
        });
    }

    dbHelper.prototype.modifyQuantity = (orderID, quantity) => {
        return new Promise((resolve, reject) => {
            const params = {
                TableName: orderTable,
                Key:{
                    "orderId": Math.floor(orderID)
                },
                UpdateExpression: "set orders.quantity=:q", //'orderId': orderID,    
                ExpressionAttributeValues:{
                    ":q": quantity
                },
                ReturnValues:"UPDATED_NEW"
            }
            docClient.update(params, (err, data) => {
                if (err) {
                    console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                    return reject(JSON.stringify(err, null, 2))
                } 
                console.log("Quantity update succeeded:", JSON.stringify(data, null, 2));
                resolve(data)
                
            })
        });
    }
}

module.exports = new dbHelper();